const h0 = "01101010000010011110011001100111";
const h1 = "10111011011001111010111010000101";
const h2 = "00111100011011101111001101110010";
const h3 = "10100101010011111111010100111010";
const h4 = "01010001000011100101001001111111";
const h5 = "10011011000001010110100010001100";
const h6 = "00011111100000111101100110101011";
const h7 = "01011011111000001100110100011001";

const k = require("./roundConstant");

const hash = (str) => {
  // convert the text to binary
  let binary = toBinary(str);
  let n = binary.length * 8;

  //   pad zeroes and add 64-bit big endian
  binary = padZeroes(binary);
  binary = addBigEndian(binary, n);

  // create message schedule and compress
  let w = createMessageSchedule(binary);
  let c = compressMessageSchedule(w);

  return c;
};

const toBinary = (str) => {
  const binary = [];

  for (let i = 0; i < str.length; i++) {
    let bin = str[i].charCodeAt(0).toString(2);
    while (bin.length < 8) bin = "0" + bin;
    binary.push(bin);
  }

  return binary;
};

const padZeroes = (binary) => {
  binary.push("10000000");
  while (binary.length < 56) binary.push("00000000");
  return binary;
};

const addBigEndian = (binary, n) => {
  let temp = n.toString(2);
  let chunkSize = 8;

  while (temp.length < 64) temp = "0" + temp;

  // divide into chunks of 8-bit binary strings
  while (temp) {
    if (temp.length < chunkSize) {
      binary.push(temp);
      break;
    } else {
      binary.push(temp.substr(0, chunkSize));
      temp = temp.substr(chunkSize);
    }
  }

  return binary;
};

const createMessageSchedule = (arr) => {
  const w = [];

  for (let i = 0; i < arr.length; i += 4)
    w.push(arr[i] + arr[i + 1] + arr[i + 2] + arr[i + 3]);

  while (w.length < 64) w.push("00000000000000000000000000000000");

  for (let i = 16; i < 64; i++) {
    let r1 = rightRotate(w[i - 15], 7);
    let r2 = rightRotate(w[i - 15], 18);
    let r3 = rightShift(w[i - 15], 3);

    let s0 = xorString(r1, r2, r3);

    r1 = rightRotate(w[i - 2], 17);
    r2 = rightRotate(w[i - 2], 19);
    r3 = rightShift(w[i - 2], 10);

    let s1 = xorString(r1, r2, r3);

    w[i] = addBinaryString(w[i - 16], s0, w[i - 7], s1);
  }

  return w;
};

const compressMessageSchedule = (w) => {
  let a = h0,
    b = h1,
    c = h2,
    d = h3,
    e = h4,
    f = h5,
    g = h6,
    h = h7;

  for (let i = 0; i < 64; i++) {
    let s1 = xorString(
      rightRotate(e, 6),
      rightRotate(e, 11),
      rightRotate(e, 25)
    );
    let ch = xorString(andString(e, f), andString(notString(e), g));
    let temp1 = addBinaryString(h, s1, ch, w[i], k[i]);

    let s0 = xorString(
      rightRotate(a, 2),
      rightRotate(a, 13),
      rightRotate(a, 22)
    );
    let maj = xorString(andString(a, b), andString(a, c), andString(b, c));
    let temp2 = addBinaryString(s0, maj);

    h = g;
    g = f;
    f = e;
    e = addBinaryString(d, temp1);
    d = c;
    c = b;
    b = a;
    a = addBinaryString(temp1, temp2);
  }

  a = addBinaryString(h0, a);
  b = addBinaryString(h1, b);
  c = addBinaryString(h2, c);
  d = addBinaryString(h3, d);
  e = addBinaryString(h4, e);
  f = addBinaryString(h5, f);
  g = addBinaryString(h6, g);
  h = addBinaryString(h7, h);

  let res = getFinalHash(a, b, c, d, e, f, g, h);

  return res;
};

const rightRotate = (str, d) => {
  let res =
    str.substring(str.length - d, str.length) +
    str.substring(0, str.length - d);
  return res;
};

const rightShift = (str, d) => {
  let res = str.substring(0, str.length - d);
  while (res.length < 32) res = "0" + res;
  return res;
};

const xorString = (...args) => {
  let res = args[0];

  for (let i = 1; i < args.length; i++) {
    let temp = "";
    for (let j = 0; j < 32; j++) {
      if (res[j] === args[i][j]) temp += "0";
      else temp += "1";
    }
    res = temp;
  }

  return res;
};

const addBinaryString = (...args) => {
  let res = 0;

  args.forEach((bin) => {
    res += Number(parseInt(bin, 2));
  });

  res = res % Math.pow(2, 32);
  res = res.toString(2);

  while (res.length < 32) res = "0" + res;

  return res;
};

const andString = (...args) => {
  let res = args[0];

  for (let i = 1; i < args.length; i++) {
    let temp = "";
    for (let j = 0; j < 32; j++) {
      if (res[j] === "1" && args[i][j] === "1") temp += "1";
      else temp += "0";
    }
    res = temp;
  }

  return res;
};

const notString = (str) => {
  let res = "";
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "1") res += "0";
    else res += 1;
  }
  return res;
};

const getFinalHash = (...args) => {
  let res = "";

  args.forEach((bin) => {
    let temp = parseInt(bin, 2).toString(16);
    res += temp;
  });

  return res;
};

module.exports = hash;

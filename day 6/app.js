const fs = require("fs");

const [, , operation, fileName, message] = process.argv;

const createFile = (name, msg = "") => {
  const isExisting = fs.existsSync(name);

  if (isExisting) return console.log("File Already Exists!");

  fs.writeFile(name, msg, (err) => {
    if (err) return console.log(err);
    console.log("File Created!");
  });
};

const readFile = (name) => {
  fs.readFile(name, "utf-8", (err, data) => {
    if (err) return console.log(err);
    console.log(data);
  });
};

const updateFile = (name, msg) => {
  if (!msg) return console.log("Please provide a message!");

  fs.appendFile(name, msg, (err) => {
    if (err) return console.log(err);
    console.log("File Updated!");
  });
};

const deleteFile = (name) => {
  fs.unlink(name, (err) => {
    if (err && err.code === "ENOENT") return console.log("File not Found!");
    console.log("File Deleted!");
  });
};

switch (operation) {
  case "cr-file":
    createFile(fileName, message);
    break;
  case "rd-file":
    readFile(fileName);
    break;
  case "up-file":
    updateFile(fileName, message);
    break;
  case "del-file":
    deleteFile(fileName);
    break;
  default:
    console.log("Invalid operation!");
}

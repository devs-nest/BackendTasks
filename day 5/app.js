const fs = require("fs");

const [, , operation, fileName, message] = process.argv;

const createFile = (name, msg) => {
  fs.writeFileSync(name, msg);
  console.log("New File Created!");
};

const readFile = (name) => {
  try {
    const isExistingFile = fs.existsSync(name);

    if (!isExistingFile) throw new Error("File not Found!");

    const data = fs.readFileSync(name).toString();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};

const updateFile = (name, msg) => {
  if (!msg) return console.log("Please Provide a Message!");

  fs.appendFileSync(name, msg);
  console.log("File Updated!");
};

const deleteFile = (name) => {
  try {
    fs.unlinkSync(name);
    console.log("File Deleted!");
  } catch (err) {
    console.log("File Not Found!");
  }
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

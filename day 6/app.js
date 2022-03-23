const fs = require("fs").promises;

const [, , operation, fileName, message] = process.argv;

const createFile = async (name, msg = "") => {
  try {
    await fs.writeFile(name, msg);
    console.log("File Created!");
  } catch (err) {
    console.log(err);
  }
};

const readFile = async (name) => {
  try {
    const data = await fs.readFile(name, "utf-8");
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};

const updateFile = async (name, msg) => {
  if (!msg) return console.log("Please provide a message!");

  try {
    await fs.appendFile(name, msg);
    console.log("File Updated!");
  } catch (err) {
    console.log(err);
  }
};

const deleteFile = async (name) => {
  try {
    await fs.unlink(name);
    console.log("File Deleted!");
  } catch (err) {
    console.log(err);
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

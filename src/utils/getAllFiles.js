// takes a directory and returns an array of all files/folders in that directory.

const fs = require("fs");
const path = require("path");

module.exports = (directory, foldersOnly = false) => {
  // define fileNames as an array
  let fileNames = [];

  // get all files/folders in directory
  const files = fs.readdirSync(directory, { withFileTypes: true });

  // loop through all files/folders
  for (const file of files) {
    // get file/folder path
    const filePath = path.join(directory, file.name);

    // if foldersOnly is true, only push folders to fileNames
    if (foldersOnly) {
      if (file.isDirectory()) {
        fileNames.push(filePath);
      }
    }
    // if foldersOnly is false, push both files and folders to fileNames
    else {
      if (file.isFile()) {
        fileNames.push(filePath);
      }
    }
  }

  return fileNames;
};
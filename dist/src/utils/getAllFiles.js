"use strict";
// takes a directory and returns an array of all files/folders in that directory.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
function default_1(directory, foldersOnly = false) {
    // define fileNames as an array
    let fileNames = [];
    // get all files/folders in directory
    const files = fs_1.default.readdirSync(directory, { withFileTypes: true });
    // loop through all files/folders
    for (const file of files) {
        // get file/folder path
        const filePath = path_1.default.join(directory, file.name);
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
}

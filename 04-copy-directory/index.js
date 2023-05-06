
const fs = require('node:fs/promises');
const path = require('path');
const pathFolder = path.join(__dirname);

async function createFolder(){
    try {
        const createDir = await fs.mkdir(path.join(pathFolder, 'files-copy'), { recursive: true });
        console.log('Directory created successfully!');
        returnFiles();
    } catch (err) {
        console.error(err.message);
    }
}

createFolder();

async function copyF(fileName) {
    try {
        await fs.copyFile(path.join(pathFolder, 'files', fileName ), path.join(pathFolder, 'files-copy', fileName));
        console.log(`${fileName} was copied from files to files-copy`);
      } catch(err) {
        console.error(err);
      }
}

async function returnFiles(){
    try {
        const files = await fs.readdir(path.join(pathFolder, 'files'), {withFileTypes: true});
        for (const file of files) {
            if (file.isFile()) {
                copyF(file.name);      
            }
        } 
    } catch (err) {
        console.error(err);
    }
}

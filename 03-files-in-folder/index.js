const fs = require('node:fs/promises');
const path = require('path');
const pathFolder = path.join(__dirname, 'secret-folder');

async function returnFiles(){
    try {
        const files = await fs.readdir(pathFolder, {withFileTypes: true});
        for (const file of files) {
            if (file.isFile()) {
                const pathFile = require('path').join(pathFolder, file.name);
                const ext = path.extname(pathFile);
                const name = path.basename(pathFile, ext);
                const size = (await fs.stat(pathFile)).size;
                console.log(`${name} - ${ext.slice(1)} - ${size}kb`);              
            }
        } 
    } catch (err) {
        console.error(err);
    }
}

returnFiles();

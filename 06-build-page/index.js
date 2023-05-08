const fs = require('node:fs/promises');
const path = require('path');

async function createProjectDist(pathFolder, folderName){
    try {
        const createDir = await fs.mkdir(path.join(pathFolder, folderName), { recursive: true });
        createFile(folderName ,'index.html');
        createFile(folderName ,'style.css');
        copyFolders(path.join(__dirname, "assets"), path.join(__dirname, "project-dist", "assets"));
        mergeStyles();
        mergeHtml();
    } catch (err) {
        console.error(err.message);
    }
}

createProjectDist(__dirname, 'project-dist');

function createFile(folderName, fileName) {
    fs.writeFile(path.join(__dirname, folderName, fileName), '', (err) => {
        if (err) throw err;
    });
}

async function createFolder(pathFolder, folderName){
    try {
        const createDir = await fs.mkdir(path.join(pathFolder, folderName), { recursive: true });
    } catch (err) {
        console.error(err.message);
    }
}

async function copyF(pathNameFrom, pathNameTo) {
    try {
        await fs.copyFile(pathNameFrom, pathNameTo);
      } catch(err) {
        console.error(err);
      }
}

async function copyFolders(pathNameFrom, pathNameTo){
    try {
        const files = await fs.readdir(pathNameFrom, {withFileTypes: true});
        for (const file of files) {
           if (file.isDirectory()) {
                await createFolder(pathNameTo, file.name);
                await copyFolders(path.join(pathNameFrom, file.name), path.join(pathNameTo, file.name));
           }
            if (file.isFile()) {
                copyF(path.join(pathNameFrom, file.name), path.join(pathNameTo, file.name));
            }
        } 
    } catch (err) {
        console.error(err);
    }
}

async function mergeStyles(){
    try {
        let data = '';
        const files = await fs.readdir(path.join(__dirname, 'styles'), {withFileTypes: true});
        for (const file of files) {
            if (file.isFile() && path.extname(file.name) === '.css') {
                readStyle(file.name);
            }
        } 
    } catch (err) {
        console.error(err);
    }
}

function readStyle(fileName) {
    const fs = require('fs');
    let data = '';
    const stream = fs.createReadStream(path.join(__dirname, 'styles', fileName), 'utf-8');
    stream.on('data', chunk => data += chunk);
    stream.on('end', () => {
        data += '\n';
        addStyle(data);
    });
}

function addStyle(data){
    fs.appendFile(path.join(__dirname,  'project-dist', 'style.css'), data, (err) => {
        if(err) throw err;
    });
}

async function mergeHtml(){
    try {
        const files = await fs.readdir(path.join(__dirname, 'components'), {withFileTypes: true});
        let template = (await fs.readFile(path.join(__dirname, 'template.html'))).toString();
        for (const file of files) {
            if (file.isFile() && path.extname(file.name) === '.html') {
                const tagHtml = (await fs.readFile(path.join(__dirname, 'components', file.name))).toString();
                const tag = `{{${path.basename(file.name, path.extname(file.name))}}}`;
                const tagLength = tag.length;
                const tagIndex = template.indexOf(tag);
                template = template.slice(0, tagIndex).concat(tagHtml, template.slice(tagIndex + tagLength));
            }
        } 
        addHtml(template);
    } catch (err) {
        console.error(err);
    }
}

function addHtml(data){
    fs.appendFile(path.join(__dirname,  'project-dist', 'index.html'), data, (err) => {
        if(err) throw err;
    });
}

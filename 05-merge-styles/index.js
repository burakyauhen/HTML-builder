const fs = require('node:fs/promises');
const path = require('path');

function createFile() {
    fs.writeFile(path.join(__dirname,  'project-dist', 'bundle.css'), '', (err) => {
        if (err) throw err;
    });
}

createFile();

function addFile(data){
    fs.appendFile(path.join(__dirname,  'project-dist', 'bundle.css'), data, (err) => {
        if(err) throw err;
        console.log('Data has been added!');
    });
}

async function returnFiles(){
    try {
        const files = await fs.readdir(path.join(__dirname, 'styles'), {withFileTypes: true});
        for (const file of files) {
            if (file.isFile() && path.extname(file.name) === '.css') {
                console.log(file.name);
                mergeStreams(file.name);
            }
        } 
    } catch (err) {
        console.error(err);
    }
}

returnFiles();

function mergeStreams(file) {
    const fs = require('fs');
    let data = '';
    const stream = fs.createReadStream(path.join(__dirname, 'styles', file), 'utf-8');
    stream.on('data', chunk => data += chunk);
    stream.on('end', () => {
        addFile(data);
    });
}

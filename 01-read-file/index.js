const { stdout, exit } = process;
const path = require('path').join(__dirname, 'text.txt');
const fs = require('fs');
let data = '';
const stream = fs.createReadStream(path, 'utf-8');
stream.on('data', chunk => data += chunk);
stream.on('end', () => {
    stdout.write(data);
    exit();
});


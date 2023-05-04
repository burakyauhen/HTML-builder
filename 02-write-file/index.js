const { stdout, stdin, exit } = process;
const fs = require('fs');
const path = require('path').join(__dirname, 'mynotes.txt');

stdout.write("Write what you want, as many time you want\n");

fs.writeFile(path, '', (err) => {
        if (err) throw err;
    }
);

stdin.on('data', data => {
    if (data.toString().trim() === 'exit') {
        finishTyping();
    }
    fs.appendFile(path, data.toString(), (err) => {
        if (err) throw err;
    });
});


function finishTyping() {
    stdout.write('good luck');
    process.exit(); 
}

process.on('SIGINT', () => {
   finishTyping();
});


   








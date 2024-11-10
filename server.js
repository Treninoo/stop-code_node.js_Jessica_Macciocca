const { createServer } = require('node:http');
const fs = require('node:fs');
const chalk = require("chalk"); 

const hostname = '127.0.0.1';
const port = 3000;
const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});
server.listen(port, hostname, () => {
  let initPath = './';
  let separatore = "|--"
  leggiDirectory(initPath, separatore);
});

function leggiDirectory(path, separatore){
  fs.readdirSync(path).forEach((nomeFile) => {
    if(nomeFile != "node_modules"){
      if(nomeFile.includes(".")){
        let stats = fs.statSync(path + "/" + nomeFile);
        let dataFile = new Date(stats.ctime);
        let minuti = (Math.floor((new Date() - dataFile) / (1000 * 60)))
        if(minuti < 5){
          console.log(separatore + ' ' + nomeFile + chalk.green(" (" + minuti + " minuti fa)"))
        } else if(minuti > 5 && minuti < 30){
          console.log(separatore + ' ' + nomeFile + chalk.yellow(" (" + minuti + " minuti fa)"))
        } else {
          console.log(separatore + ' ' + nomeFile + chalk.magenta(" (" + minuti + " minuti fa)"))
        }
      } else {
        console.log(chalk.blue(separatore + ' ' +nomeFile))
        leggiDirectory(path + '/'+ nomeFile, "|  " + separatore);
      }
    }
  })
}
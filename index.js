// TO COUNT THE NUMBER OF WORDS IN A FILE
// Method 1

// const fs=require('fs');

// function main(fileName){
//     fs.readFile(fileName,"utf-8",(err,data)=>{
//         if(err){
//             console.log(err);
//         }else{
//             let total=0;
//             for(let i=0;i<data.length;i++){
//                 if(data[i]===" "){
//                     total++;
//                 }

//             }
//             console.log(`total number of words in the file are ${total+1}`);
            
//         }
//     });
// }

// main(process.argv[2]);//takes the second argument from the written CLI command when indexed from 0.


// Method 2

const fs= require('fs');
const {Command} = require('commander');
const program= new Command();

program
    .name('counter')
    .description('CLI to do file based task')
    .version('0.0.0');

program.command('count_word')
    .description('counts the number of words')
    .arguments('<file>','file to count the number of words')
    .action((file)=>{
        fs.readFile(file,'utf8',(err,data)=>{
            if(err){
                console.log(err);
                
            }
            else{
                const words=data.split(' ').length;
                console.log(`there are ${words} words in the file`);
                
            }
        });
    });
    program.parse(process.argv);
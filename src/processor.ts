import * as fs from 'fs'
import * as path from 'path'
import { once } from 'node:events';
import { exit } from 'process';


import { errorLogs, generatedComment } from './logger';
import { colorLogs } from './utility/colorLogs';
import { createInterface } from 'node:readline/promises';
import { subschemasPath } from './prismaUnify';

const matchString='^( )*//(/)*'
const regExp=new RegExp(matchString);


/**
 *  allSchemaFolder: path to subschemas from src directory
 *  @DoNotChange mainSchemaPrismaPath : path to main schema.prisma 
 *  prisma accepts schema.prisma from 'src/prisma/schema.prisma' file.
 *  @Change if you know to handle 
*/
export const getAllFiles = function(dirPath: fs.PathLike, arrayOfFiles: string[] ) {

    try {
      const files = fs.readdirSync(dirPath)    
      files.forEach(function(file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
          arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
        } else {
          arrayOfFiles.push(path.join(dirPath.toString(), "/", file))
        }
      })
      return arrayOfFiles
      
    } catch (error) {
        errorLogs(subschemasPath);
        exit(0);
    }
  }

  export async function processSubschemas(result: string | any[],logStream: fs.WriteStream){

    for await(const file of result){
     
     try {
         
         const data = fs.readFileSync(file, 'utf8');
         //console.log('DATA', path.extname(file));
         if(data.search(/\/\/#exclude/g)===-1 && path.extname(file)==".prisma"){
 
             if(data.search(/datasource(\w|\s)*{/g)!=-1&& data.search(/generator(\w|\s)*{/g)!=-1 ){
 
                     fs.writeFileSync(path.join('temp.prisma'),'',{flag:'w+'});
                     await processLineByLine(file,logStream,1);
                     const temp=fs.readFileSync('temp.prisma',{ encoding: 'utf8', flag: 'r' });
                  
                     fs.writeFileSync(file,generatedComment+temp,{flag:'w+'});
                     fs.unlinkSync('temp.prisma');
 
             }            
             else await processLineByLine(file,logStream);
 
         }
       
       }catch (err) {
             console.error(err);
       }
   }
 }
 async function processLineByLine(filePath:fs.PathLike, writeMain: fs.WriteStream, writeCase=0, sourceFilePath:fs.PathLike= '') {
   try {
     const rl = createInterface({
       input: fs.createReadStream(filePath),
       crlfDelay: Infinity,
     });
     
     rl.on('line', async (line) => {
 
        switch(writeCase){
 
         case 0 :
                 if(line.search(/import(\s)*{[\s| \w|,]*}(\s)*from/g)===-1 ){
                       writeMain.write(line);
                       writeMain.write('\n');
                 }
                 break;
         case 1: 
                 if( line!='\n' && line!="" && generatedComment.search(line)!=-1 ){ }
                 else if( regExp.test(line) ){
                  
                     let startInd=0;
                     for(startInd=0; startInd<line.length; startInd++)
                     {
                       if(line.at(startInd)!='/'&& line.at(startInd)!=' ')break;
                     }
                     writeMain.write(line.substring(startInd)+'\n');
                     fs.writeFileSync('temp.prisma',line+'\n', {flag: 'a'});
                   
                 }
                 else{
                   writeMain.write(line+'\n');
                   fs.writeFileSync('temp.prisma', '//'+line+'\n',{flag: 'a'});
                 }
                 break;
 
       }
     });
 
     await once(rl, 'close');
 
   } catch (err) {
     console.error(err);
   }
 }; 
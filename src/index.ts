/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */

/**
   * @author | joydip007x
   * @desc This is an Utility script that will generate  schema.prisma in '/prisma '
   * @command : npx prisma-unify007x 007x
   * @Test_The_Result : npx prisma studio
   * @structure allSchemaFolder must be a subFolder of Prisma.
    There should not be any '*.prisma' files in '/prisma/' folder except 'schema.prisma'
*/
import * as fs from 'fs'
import * as path from 'path'
import {colorLogs} from './utility/colorLogs'
import lineReader, { createInterface } from "readline";
import { once } from 'node:events';


/**
 *  allSchemaFolder: path to subschemas from src directory
 *  @DoNotChange mainSchemaPrismaPath : path to main schema.prisma 
 *  prisma accepts schema.prisma from 'src/prisma/schema.prisma' file.
 *  @Change if you know to handle 
*/

function getAppRootDir () {

  return process.cwd();
 
}

export async function prismaUnifier( test_mocha : number =0 ){
  
    var appRoot=getAppRootDir();
    var allSchemaFolder='/prisma/subschemas';
    var subschemasPath=path.join(appRoot,allSchemaFolder);
    const mainSchemaPrismaPath=path.join( appRoot + '/prisma/schema.prisma');

    if(!test_mocha)
        console.log(colorLogs.Bright,'Main Schema Generation path : ',colorLogs.Reset,mainSchemaPrismaPath,);

    const getAllFiles = function(dirPath: fs.PathLike, arrayOfFiles: string[]) {
      const files = fs.readdirSync(dirPath)
      arrayOfFiles = arrayOfFiles || []
    
      files.forEach(function(file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
          arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
        } else {
          arrayOfFiles.push(path.join(dirPath.toString(), "/", file))
        }
      })
      return arrayOfFiles
    }
    
    const result = getAllFiles(subschemasPath,[]);

    
    if(!test_mocha){

    console.log(colorLogs.Bright,'Total No. of Subschemas found: '+result.length,colorLogs.Reset);
    console.log(colorLogs.Bright,"Sub-Schemas: ",colorLogs.Reset);

    if(result.length<1){
        console.log(colorLogs.BgRed,'No Subschemas found !',colorLogs.Reset);
        console.log("Place all your subschemas here :\n ",colorLogs.Bright,subschemasPath,colorLogs.Reset);
        return "Follow Documentation!";
    }

      for(let i=0; i<result.length;i++){
              console.log(colorLogs.FgGreen, result.at(i)?.slice(result.at(i)?.indexOf("subschemas")),colorLogs.Reset)
      }

    }
    
    
    if (fs.existsSync(mainSchemaPrismaPath)){
          
          !test_mocha &&
          console.log(colorLogs.FgRed,'Deleting Old schema.prisma and Generating New',colorLogs.Reset);
          fs.unlinkSync(mainSchemaPrismaPath);
    }else{
          !test_mocha &&
          console.log(colorLogs.FgCyan,'No Old schema.prisma was present,Generating New',colorLogs.Reset);
    }
    
    
    var logStream = fs.createWriteStream(mainSchemaPrismaPath, {flags: 'wx'});
    
   
    logStream.write('// Show  ❤ & Support : https://github.com/joydip007x/prisma-unify007x.git '+'\n');
    logStream.write('// Ignore " Error validating datasource `db`: You defined more than one datasource. " '+'\n');
    if(!test_mocha)
       logStream.write('// Generated in '+new Date()+'\n');
    
    
    /** 
      @a {flags: 'a'} to append 
      @w {flags: 'w'} to erase and write on Existing file
      @wx {flags: 'wx'} to delete if  file exits, and write on file
    */
      

    for (var i = 0; i <result.length; i++){
    
        try {
                const data = fs.readFileSync(result[i], 'utf8');
                await processLineByLine(result[i],logStream);
          
        }catch (err) {
                console.error(err);
          }
    }

    if(!test_mocha)
      console.log(colorLogs.BgGreen,colorLogs.Bright,'Unified Schema Ready at : ',
                  colorLogs.Reset,
                  colorLogs.FgBlue, mainSchemaPrismaPath,colorLogs.Reset,'\n');
    
    return mainSchemaPrismaPath;
    
}

async function processLineByLine(filePath:fs.PathLike, writeMain: fs.WriteStream) {
  try {
    const rl = createInterface({
      input: fs.createReadStream(filePath),
      crlfDelay: Infinity,
    });
    
    //console.log(colorLogs.Dim,'Processing : ',filePath,colorLogs.Reset);
    rl.on('line', (line) => {
      if(line.search(/import(\s)*{[\s| \w]*}(\s)*from/g)===-1 ){
            writeMain.write(line);
            writeMain.write('\n')
        }
    });

    await once(rl, 'close');
    //console.log('File processed.');

  } catch (err) {
    console.error(err);
  }
}; 

export function TestRun() {
  const message = 'joydip007x\'s first  npm package!';
  return message;
}

export function goodBye() {
  const message = 'Goodbye from my package!';
  return message;
}

export default {
  TestRun,
  goodBye,
  prismaUnifier
};

/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */

/**
   * @author | joydip007x
   * @desc This is an Utility script that will generate  schema.prisma in '/prisma '
   * @command : npm run gen:prisma  (run from /nest, check package.json )     
   * @Test_The_Result : npx prisma studio
   * @structure allSchemaFolder must be a subFolder of Prisma.
    There should not be any '*.prisma' files in '/prisma/' folder except 'schema.prisma'
*/
import * as fs from 'fs'
import * as path from 'path'
import {colorLogs} from './utility/colorLogs'
// var fs= require('fs);
// var path = require('path');



/**
 *  allSchemaFolder: path to subschemas from src directory
 *  @DoNotChange mainSchemaPrismaPath : path to main schema.prisma 
 *  prisma accepts schema.prisma from 'src/prisma/schema.prisma' file.
 *  @Change if you know to handle 
*/

function getAppRootDir () {

  return process.cwd();
  /*let currentDir = __dirname
  while(!fs.existsSync(path.join(currentDir, 'package.json'))) {
    currentDir = path.join(currentDir, '..')
  }
  return currentDir*/
}

export function prismaUnifier(){
  
  var appRoot=getAppRootDir();
  var allSchemaFolder='/prisma/subschemas';
  var subschemasPath=path.join(appRoot,allSchemaFolder);
  const mainSchemaPrismaPath=path.join( appRoot + '/prisma/schema.prisma')

  console.log(colorLogs.Bright,'Main Schema Generation path : ',colorLogs.Reset,mainSchemaPrismaPath,);

  //console.log(colorLogs.BgGray, getAppRootDir(), colorLogs.Reset);
  const getAllFiles = function(dirPath: fs.PathLike, arrayOfFiles: string[]) {
    const files = fs.readdirSync(dirPath)
    arrayOfFiles = arrayOfFiles || []
  
    files.forEach(function(file) {
      if (fs.statSync(dirPath + "/" + file).isDirectory()) {
        arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
      } else {
        arrayOfFiles.push(path.join(/*__dirname,*/ dirPath.toString(), "/", file))
      }
    })
    return arrayOfFiles
  }
  
  const result = getAllFiles(subschemasPath,[]);
  
  console.log(colorLogs.Bright,'Total No. of Subschemas found: '+result.length,colorLogs.Reset);
  console.log(colorLogs.Bright,"Sub-Schemas: ",colorLogs.Reset);
  for(let i=0; i<result.length;i++){
      console.log(colorLogs.FgGreen, result.at(i)?.slice(result.at(i)?.indexOf("prisma")),colorLogs.Reset)
  }
  
  
  
  if (fs.existsSync(mainSchemaPrismaPath)){
        console.log(colorLogs.FgRed,'Deleting Old schema.prisma and Generating New',colorLogs.Reset);
        fs.unlinkSync(mainSchemaPrismaPath
        );
    }
    else{
      console.log(colorLogs.FgGreen,'No Old schema.prisma was present,Generating New',colorLogs.Reset);
  }
  
  
  var logStream = fs.createWriteStream(mainSchemaPrismaPath, {flags: 'wx'});
  
  logStream.write('// Open Source Developement'+'\n');
  logStream.write('// Show  ❤ & Support : https://github.com/joydip007x/prisma-unify007x.git '+'\n');
  logStream.write('// Generated in '+new Date()+'\n');
  logStream.write('// Ignore Error validating datasource `db`: You defined more than one datasource.'+'\n');
  
  
  /** 
    @a {flags: 'a'} to append 
    @w {flags: 'w'} to erase and write on Existing file
    @wx {flags: 'wx'} to delete if  file exits, and write on file
  */
  for (var i = 0; i <result.length; i++){
  
          try {
              const data = fs.readFileSync(result[i], 'utf8');
              logStream.write(data);
              logStream.write('\n\n');
              //console.log("DATA ", data);
          } catch (err) {
              console.error(err);
          }
  }
  console.log(colorLogs.BgGreen,colorLogs.Bright,'Unified Schema Ready at : ',
              colorLogs.Reset,
              colorLogs.FgBlue, mainSchemaPrismaPath,colorLogs.Reset,'\n\n');
  
  /**   @desc IGNORE: TEST RUN @    */

  
}
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

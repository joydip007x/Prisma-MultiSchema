
import * as fs from 'fs'
import * as path from 'path'
import { colorLogs } from './utility/colorLogs';
import { errorLogs } from './logger';
import { exit } from 'node:process';
import { getAllFiles, processSubschemas } from './processor';
import { checkJSON } from './utility/JSON';

function getAppRootDir () { return process.cwd(); }

export var appRoot=getAppRootDir();
export var allSchemaFolder='/prisma/subschemas';
export var subschemasPath=path.join(appRoot,allSchemaFolder);


function genSubschemasPath(){

}
/**
   * @author | joydip007x
   * @desc This is an Utility script that will generate  schema.prisma in '/prisma '
   * @command : npx prisma-unify007x 007x
   * @Test_The_Result : npx prisma studio
   * @structure allSchemaFolder must be a subFolder of Prisma.
    There should not be any '*.prisma' files in '/prisma/' folder except 'schema.prisma'
*/
export async function prismaUnifier( test_mocha : number =0 ){
    
    //checkJSON();
    //genSubschemasPath();

    
    const mainSchemaPrismaPath=path.join( appRoot + '/prisma/schema.prisma');

    if(!test_mocha){
        console.log('⏩',colorLogs.Bright,'MainSchema Generation path : ',colorLogs.Reset,mainSchemaPrismaPath,);
        console.log('⏰',colorLogs.Bright,'Searching Sub-Schema\'s in : ',colorLogs.Reset,subschemasPath);
    }
    const result = getAllFiles(subschemasPath,[]);
    if(!test_mocha){
      if(result.length<1){
        errorLogs(subschemasPath);
        exit(0);
    }
    console.log('✅',colorLogs.Bright,'Total No. of Subschemas found: '+result.length,colorLogs.Reset);
    console.log('👉',colorLogs.Bright,"Sub-Schemas: ",colorLogs.Reset);


      for(let i=0; i<result.length;i++){
              console.log(colorLogs.FgGreen, result.at(i)?.slice(result.at(i)?.indexOf("subschemas")),colorLogs.Reset)
      }

    }
    
    
    if (fs.existsSync(mainSchemaPrismaPath)){
          
          !test_mocha &&
          console.log('ℹ',colorLogs.FgRed,'Deleting Old schema.prisma and Generating New',colorLogs.Reset);
          fs.unlinkSync(mainSchemaPrismaPath);
    }else{
          !test_mocha &&
          console.log('ℹ',colorLogs.FgCyan,'No Old schema.prisma was present,Generating New',colorLogs.Reset);
    }
    
    
    var logStream = fs.createWriteStream(mainSchemaPrismaPath, {flags: 'wx'});

    if(!test_mocha)
       logStream.write('//🧩Don\'t Edit this file.✨Generated in '+new Date()+'✨\n');
    
    await processSubschemas(result,logStream)
    if(!test_mocha)
      console.log('🎯',colorLogs.Bright,'Unified Schema Ready at : ',
                  colorLogs.Reset,
                  colorLogs.FgBlue, mainSchemaPrismaPath,colorLogs.Reset,'\n');
    
    return mainSchemaPrismaPath;
    
}


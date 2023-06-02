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
import { exit } from 'process';


const generatedComment=
`////////////////////////////////////////////////////////////////////////////////////////
///// 𝐀𝐮𝐭𝐨-𝐜𝐨𝐦𝐦𝐞𝐧𝐭𝐞𝐝 𝐨𝐮𝐭 𝐛𝐲 🅿🆁🅸🆂🅼🅰-🅼🆄🅻🆃🅸🆂🅲🅷🅴🅼🅰			                  /////
///// 𝐃𝐞𝐭𝐞𝐜𝐭𝐞𝐝:𝐝𝐚𝐭𝐚𝐬𝐨𝐮𝐫𝐜𝐞 𝐚𝐧𝐝 𝐠𝐞𝐧𝐞𝐫𝐚𝐭𝐨𝐫 𝐜𝐥𝐢𝐞𝐧𝐭.				                               /////
///// 𝐘𝐨𝐮 𝐜𝐚𝐧 𝐜𝐡𝐚𝐧𝐠𝐞 𝐭𝐡𝐢𝐬 𝐟𝐢𝐥𝐞𝐬 𝐜𝐨𝐧𝐭𝐞𝐧𝐭 𝐢𝐧 𝐜𝐨𝐦𝐦𝐞𝐧𝐭𝐞𝐝/𝐮𝐧𝐜𝐨𝐦𝐦𝐞𝐧𝐭𝐞𝐝 𝐬𝐭𝐚𝐠𝐞,𝐁𝐨𝐭𝐡 𝐰𝐚𝐲   /////
///// 𝐈𝐭 𝐰𝐢𝐥𝐥 𝐭𝐚𝐤𝐞 𝐞𝐟𝐟𝐞𝐜𝐭 𝐢𝐟 𝐲𝐨𝐮 𝐫𝐮𝐧 𝐧𝐩𝐱 𝐩𝐫𝐢𝐬𝐦𝐚-𝐦𝐮𝐥𝐭𝐢𝐬𝐜𝐡𝐞𝐦𝐚			                     /////
///// 𝐅𝐞𝐞𝐥 𝐟𝐫𝐞𝐞 𝐭𝐨 𝐜𝐡𝐚𝐧𝐠𝐞 𝐝𝐚𝐭𝐚𝐬𝐨𝐮𝐫𝐜𝐞/𝐝𝐚𝐭𝐚𝐛𝐚𝐬𝐞𝐔𝐑𝐋/𝐩𝐫𝐨𝐯𝐢𝐝𝐞𝐫			                     /////
///// ≡≡≡≡≡≡≡≡≡≡≡≡≡ 𝐃𝐎𝐍𝐓 𝐂𝐇𝐀𝐍𝐆𝐄 𝐀𝐍𝐘𝐓𝐇𝐈𝐍𝐆 𝐈𝐍 𝐓𝐇𝐈𝐒 𝐂𝐎𝐌𝐌𝐄𝐍𝐓 𝐁𝐎𝐗 ≡≡≡≡≡≡≡≡≡≡≡≡≡≡/////
///// ≡≡≡≡≡≡≡≡≡     ▼△▼△ 𝙲𝙷𝙰𝙽𝙶𝙴 𝐎𝐍𝐋𝐘 𝙱𝙴𝙻𝙾𝚆 𝚃𝙷𝙸𝚂 𝙻𝙸𝙽𝙴 ▼△▼△	    ≡≡≡≡≡≡≡≡≡≡≡≡≡≡/////
//////////////////////////////////////////////////////////////////////////////////////
\n`
const matchString='^(\/)*'
const regExp=new RegExp(matchString, 'g');

/**
 *  allSchemaFolder: path to subschemas from src directory
 *  @DoNotChange mainSchemaPrismaPath : path to main schema.prisma 
 *  prisma accepts schema.prisma from 'src/prisma/schema.prisma' file.
 *  @Change if you know to handle 
*/
function getAppRootDir () { return process.cwd(); }

export async function prismaUnifier( test_mocha : number =0 ){
  
    var appRoot=getAppRootDir();
    var allSchemaFolder='/prisma/subschemas';
    var subschemasPath=path.join(appRoot,allSchemaFolder);
    const mainSchemaPrismaPath=path.join( appRoot + '/prisma/schema.prisma');

    if(!test_mocha){
        console.log('⏩',colorLogs.Bright,'MainSchema Generation path : ',colorLogs.Reset,mainSchemaPrismaPath,);
        console.log('⏰',colorLogs.Bright,'Searching Sub-Schema\'s in : ',colorLogs.Reset,subschemasPath);
    }

    const getAllFiles = function(dirPath: fs.PathLike, arrayOfFiles: string[]) {

      try {
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
        
      } catch (error) {
          
          errorLogs(subschemasPath);
          exit(0);
      }
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

   
    logStream.write('// Show  ❤ & Support : https://github.com/joydip007x/Prisma-MultiSchema.git '+'\n');
    if(!test_mocha)
       logStream.write('// Generated in '+new Date()+'\n');
    
    
    /** 
      @a {flags: 'a'} to append 
      @w {flags: 'w'} to erase and write on Existing file
      @wx {flags: 'wx'} to delete if  file exits, and write on file
    */
      
    await processSubschemas(result,logStream)
    
    if(!test_mocha)
      console.log('🎯',colorLogs.Bright,'Unified Schema Ready at : ',
                  colorLogs.Reset,
                  colorLogs.FgBlue, mainSchemaPrismaPath,colorLogs.Reset,'\n');
    
    
    return mainSchemaPrismaPath;
    
}
async function processSubschemas(result: string | any[],logStream: fs.WriteStream){

   for await(const file of result){
    
    try {
        
        const data = fs.readFileSync(file, 'utf8');
        //console.log('DATA', path.extname(file));
        if(data.search(/#exclude/g)===-1 && path.extname(file)==".prisma"){

        
            if(data.search('datasource')!=-1){
              //  logStream.write('\n// IGNORE " Error validating datasource `db`: You defined more than one datasource. " '+'\n');
              //  logStream.write('// Reason: DB is defined in 2Places,  one in subschemas folder , and this is newly generated ');
              //  logStream.write('// This will never cause any error \n');
            }
            if(data.search(/datasource(\w|\s)*{/g)!=-1&& data.search(/generator(\w|\s)*{/g)!=-1 ){

                console.log(colorLogs.BgGreen, 'BASE PRISMA LOGIC ',colorLogs.Reset);

               // console.log(colorLogs.Bright, data, colorLogs.Reset);
                console.log(colorLogs.Bright, file , colorLogs.Reset);

                if(data.search(generatedComment)==-1){
                    console.log(colorLogs.BgRed, 'COMMENT NOT FOUND ! ADDING ' , colorLogs.Reset, typeof data);
                    var writeComment= fs.createWriteStream(file, {flags: 'w'})
                    writeComment.write(generatedComment,()=>{
                      fs.createWriteStream(file, {flags: 'a'}).write(data);;
                    });
                    // writeComment.on('finish',async  () => {
                    //   console.error('Comment are now complete.');
                    //  });
                     
                    // var writeBasePrismaData=fs.createWriteStream(file, {flags: 'a'});
                    // writeBasePrismaData.write(data);
                    // writeBasePrismaData.on('finish', () => {
                    //   console.error('Data are now complete.');
                    //  });
                }
                else{
                    console.log(colorLogs.FgRed, 'COMMENT FOUND  ' ,  data.split(generatedComment).pop(),colorLogs.Reset);
                    fs.writeFileSync(path.join('temp.prisma'),'');
                    console.log('L',fs.readFileSync('temp.prisma', 'utf8').length)
                    await processLineByLine(file,logStream,1);
                }

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
        case 1: ///console.log('comment switch'); 
                const yy=regExp.test(line);
                if( line!='\n' && line!="" && generatedComment.search(line)!=-1 ){
                 ///  console.log('mc ',/*JSON.stringify(line)*/);     
                  //return;              
                }
                else if( yy ){
                    
                    //console.log('aa',line ,regExp.test(line) );
                    console.log('commented db souce',line);
                    let startInd=0;
                    for(startInd=0; startInd<line.length; startInd++)
                    {
                      if(line.at(startInd)!='/')break;
                    }
                    line=line.substring(startInd);
                    writeMain.write(line);
                    writeMain.write('\n');
                   // line.slice(/\/\//)
                }
                else{
                  //console.log('bbb',line , regExp.test(line));
                  console.log('Uncommented DB src',line); 
                  writeMain.write(line);
                  writeMain.write('\n');
                  fs.createWriteStream('temp.prisma', {flags: 'a'}).write(line+'\n');
                }
                break;

      }
    });

    await once(rl, 'close');

  } catch (err) {
    console.error(err);
  }
}; 

function errorLogs(subpath: string){

  console.log('❌',colorLogs.BgRed,'No Subschemas found !',colorLogs.Reset);
  console.log('👉',"Place all your subschemas here :\n ",colorLogs.Bright,subpath, "\\",colorLogs.Reset);
  console.log('❤',"Follow Documentation: ",colorLogs.FgYellow,
                            "https://github.com/joydip007x/Prisma-MultiSchema.git#readme"
                            ,colorLogs.Reset);
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

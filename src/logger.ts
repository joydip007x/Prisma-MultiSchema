

import {colorLogs} from './utility/colorLogs'

export const generatedComment=
`////////////////////////////////////////////////////////////////////////////////////////
///// Auto Commented Out by 🅿🆁🅸🆂🅼🅰-🅼🆄🅻🆃🅸🆂🅲🅷🅴🅼🅰                       ////////     
///// Detected : Datasource and Generator Client                                 ////////
///// You can change this files content is commented or Uncommented Stage.       ////////
///// It will take effect after you run npx prisma-multischema                   ////////
///// Feel free to change Datasource/ Database URL / Provider / Binary Targets   ////////
///// DO NOT EDIT in this comment box                                            ////////                                    
///// CHANGE ONLY BELOW THIS LINE.                                               ////////       
/////////////////////////////////////////////////////////////////////////////////////////                                         
\n`



export function errorLogs(subpath: string){

    console.log('❌',colorLogs.BgRed,'No Subschemas found !',colorLogs.Reset);
    console.log('👉',"Place all your subschemas here :\n ",colorLogs.Bright,subpath, "\\",colorLogs.Reset);
    console.log('❤',"Follow Documentation: ",colorLogs.FgYellow,
                              "https://github.com/joydip007x/Prisma-MultiSchema.git#readme"
                              ,colorLogs.Reset);
}
  

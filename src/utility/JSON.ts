import * as fs from 'fs'
import * as path from 'path'

export const checkJSON = function (){

    const packageJsonPath = path.join(process.cwd(), 'package.json');
    fs.readFile(packageJsonPath, 'utf8', (err, data) => {
        if (err) {console.error('Error reading package.json:', err);return;}
        let packageJson;
        try {
            packageJson = JSON.parse(data);
        } catch (parseError) {
            console.error('Error parsing package.json:', parseError);
            return;
        }
        if (!packageJson['prisma-multischema']) 
            packageJson['prisma-multischema'] = jsonToAdd['prisma-multischema'];
        
        fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8', (writeErr) => {
            if (writeErr) {
                console.error('Error writing package.json:', writeErr);
            } else {
                console.log('package.json updated successfully.');
            }
        });
    });

}

const jsonToAdd = {
    "prisma-multischema": {
      "input": [],
      "output": "/prisma/schema.prisma"
    }
  };
  
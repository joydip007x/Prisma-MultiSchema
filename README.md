[![NPM](https://img.shields.io/npm/v/prisma-multischema)](https://www.npmjs.com/package/prisma-multischema?activeTab=readme) [![NPM](https://badgen.net/npm/license/prisma-multischema)](https://github.com/joydip007x/Prisma-MultiSchema/blob/main/LICENSE)
[![Tests](https://github.com/joydip007x/Prisma-MultiSchema/actions/workflows/tests.yml/badge.svg?branch=main)](https://github.com/joydip007x/Prisma-MultiSchema/actions/workflows/tests.yml)  [![NPM](https://img.shields.io/github/languages/code-size/joydip007x/Prisma-MultiSchema?label=size)](https://github.com/joydip007x/Prisma-MultiSchema)
[![Snyk](https://github.com/joydip007x/Prisma-MultiSchema/actions/workflows/snyk.yml/badge.svg?branch=main)](https://github.com/joydip007x/Prisma-MultiSchema/actions/workflows/snyk.yml) 


<p align="center">
  <img media="(prefers-color-scheme: light)" src="logo/logoDark.gif#gh-dark-mode-only" />
  <img media="(prefers-color-scheme: dark)" src="logo/logoLight.gif#gh-light-mode-only" />
</p>

# Prisma: MultiSchema [![NPM](https://badgen.net/npm/types/prisma-multischema)](https://www.npmjs.com/package/prisma-multischema)

Prisma normally limits your schema to one file, but with <b>prisma-multischema</b>, you can write multiple prisma schema files in an organized manner without any restrictions.

For Multiple files inter-relation you can  import schemas , to manage the relation.

Built using TypeScript to for ES Module and CommonJS (CJS),
to Unify Multiple Structured Schemas of [Prisma-ORM](https://www.prisma.io/)

<details open >
<summary > 
    
### Installation
</summary>
<p align="center">
    
```
npm i prisma-multischema
```
```
yarn add prisma-multischema
```
 > **Note** Using **VS Code** ? Install Recommended VsCode Extensions from [Dependencies (optional)](https://github.com/joydip007x/Prisma-MultiSchema#dependencies-optional)
~~~
𝙻𝚎𝚊𝚟𝚎 𝚊 𝚂𝚝𝚊𝚛⭐ 𝚘𝚗 𝚝𝚑𝚎 𝚁𝚎𝚙𝚘 ,𝚒𝚏 𝚢𝚘𝚞 𝚏𝚘𝚞𝚗𝚍 𝚒𝚝 𝚑𝚎𝚕𝚙𝚏𝚞𝚕.
𝚂𝚞𝚙𝚙𝚘𝚛𝚝𝚜 𝚊𝚗𝚍 𝚏𝚎𝚎𝚍𝚋𝚊𝚌𝚔 𝚖𝚎𝚊𝚗𝚜 𝚊 𝚕𝚘𝚝 𝚊𝚗𝚍 𝚎𝚗𝚌𝚘𝚞𝚛𝚊𝚐𝚎𝚜 𝚖𝚎❤️.
~~~
<a href="https://www.buymeacoffee.com/joydip007x" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="41" width="174" style="border-radius:50px"></a>
</p>
</details>

<details close >
<summary > 
    
### Usage
</summary>
<p align="center">
    
- #### How to Use Tutorial : 📚[MediumBlog](https://medium.com/@joydip007x/how-to-use-multiple-schema-in-prisma-40cc6b6f8d9c)  ||   ✨[YT Link](https://youtu.be/4GOuJLvGVko) 
-  Place all your schemas in  `ProjectRoot/prisma/subschemas` Folder.<br>
Like this :  
    ```st
    project_root 
        ├───node_modules
        ├───prisma 
        │   ├───subschemas <<<-----Place all your Schemas here
        │   │   ├───type 
        │   │   │    └───user.types.prisma
        │   │   │    └───bookmark.types.prisma
        │   │   └───user
        │   │   │    └───userData.prisma
        │   │   │    └───validity.prisma
        │   │   ├───anything-you-want.prisma
        │   │   ├───base.prisma  
        |   |   └───...  
        │   └───schema.prisma   <-- will be Auto-Generated
        ├───src
        │   └───...
        ├───package.json
        │        
        └───.gitignore
    ```
    >For Clearer View : [Image](https://i.ibb.co/JnyRhxT/oie-eg-Dr9-Y4ksb-NU.png)


- Run in Terminal
    ```bash
    npx prisma-multischema
    ```
        
</p>
</details>

<details close >
<summary > 
    
### Project Demonstration
</summary>
<p align="center">

working example is available below -
- <b>JavaScript</b> : [Prisma-MultiSchema-JS-Example](https://github.com/joydip007x/Prisma-MultiSchema-JS-Example)
- <b>TypeScript</b> : [Prisma-MultiSchema-TS-Example](https://github.com/joydip007x/Prisma-MultiSchema-TS-Example)
</p>
</details>
<details close >
<summary > 
    
### Example
</summary>
<p align="center">

Let's go with two schemas <b>User</b> and <b>Bookmark</b> on different files ,where the relation is -
- A User can have many bookmarks
- Each bookmark has an userId field

><b>base.prisma</b> [ root/prisma/subschemas/base.prisma ]
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mongodb"
  url      = env("PRISMA_DATABASE_URL")
}
```
><b>user.prisma</b> [ root/prisma/subschemas/User/user.prisma ]
```Prisma
import { Bookmark } from "..\Bookmark\bookmark"
model User {

    id String @id @default(auto()) @map("_id") @db.ObjectId
    email String @unique

    Bookmark Bookmark[]
}
//MongoDB model IDs in prisma -must have a @map("_id") 
//https://www.prisma.io/docs/concepts/components/prisma-schema
```
><b>bookmark.prisma</b> [ root/prisma/subschemas/Bookmark/bookmark.prisma ]
```Prisma
import {  User } from "..\User\user"
model Bookmark {

    id String     @id  @db.ObjectId @default(auto()) @map("_id") 
    title String
    
    user  User    @relation(fields: [userId], references: [id])
    userId String @db.ObjectId
}
```
>Generated <b>schema.prisma</b> [root/prisma/schema.prisma]</br>
> after Running  `npx prisma-multischema`
```Prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mongodb" 
  url      = env("PRISMA_DATABASE_URL")
}

model User {
  id       String     @id @default(auto()) @map("_id") @db.ObjectId
  email    String     @unique
  Bookmark Bookmark[]
}

model Bookmark {
  id          String  @id @default(auto()) @map("_id") @db.ObjectId 
  title       String
  user        User    @relation(fields: [userId], references: [id])
  userId      String  @db.ObjectId
}
```
>https://www.prisma.io/docs
</p>
</details>

<details  >
<summary > 
    
### Additional
</summary>
<p align="center">

- prisma schema files starting with header `//#exclude` will be excluded in final schema
- Executing `npx prisma-multischema`  will
    - <b>Automatically run</b> :  `npx prisma generate`
    <br>So, You don't need to update `@prisma/client` manually,  each time the schema  updates
    - <b>Automatically run</b> : `npx prisma format`
    <br> because, Everyone likes clean code

- Add `npx prisma-multischema` command as a prefix to your <b>start</b> script in package.json. 
    ```json
    {
    "name": "my-app",
    "version": "1.0.0",
    "scripts": {
        "unify": "npx prisma-multischema",
        "start": "npm run unify && node index.js",
        ...
      }
    }
    ```
    <br>Now it will run & regenerate Main Schema everytime the project starts.
<br></p>
</details>
<details close >
<summary > 
 
### Dependencies (optional)
</summary>
<p align="center">

To use <b>prisma import</b> feature : (<i>if you are using VS code, its better to use these</i>)<br>
<br>
- Install [prisma-import](https://marketplace.visualstudio.com/items?itemName=ajmnz.prisma-import) Extension (for VS code)  

- <b>Disable</b> Official [prisma](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma) Extension (for VS code)

>These are <b>Optional Dependencies</b>, If you can maintain multiple *.prisma schemas  without <b>TYPO</b> ,you can ignore these.
</p>
</details>
<details close >
<summary > 
  
### To-do's
</summary>
<p align="center">

- Add Support for keeping prisma's in different folder and aggregate them ( like `root/src/auth/auth.prisma `)

- Add Command Flags
- ~~Handle/Remove `" Error validating datasource db: "`  Warning~~ Fixed

</p>
</details>

#### Authors - [@joydip007x](https://www.github.com/joydip007x)

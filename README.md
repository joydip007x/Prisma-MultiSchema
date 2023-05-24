[![Tests](https://github.com/joydip007x/Prisma-MultiSchema/actions/workflows/tests.yml/badge.svg?branch=main)](https://github.com/joydip007x/Prisma-MultiSchema/actions/workflows/tests.yml)
[![Snyk Security Check](https://github.com/joydip007x/Prisma-MultiSchema/actions/workflows/snyk.yml/badge.svg?branch=main)](https://github.com/joydip007x/Prisma-MultiSchema/actions/workflows/snyk.yml) 


<p align="center">

<img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTU5NmYyYzI0NGU2NTI4YTUyY2ZjN2IyZjBiY2QzYWIwZmRjMDQ2MCZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/cNWy8aU7WT0V2hwiUy/giphy.gif">

</p>

# Prisma: MultiSchema    <img height="21" src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"> <img height="20.5" src="https://badges.frapsoft.com/typescript/love/typescript.png?v=101)](https://github.com/ellerbrock/typescript-badges">

Prisma normally limits your schema to one file, but with <b>prisma-multischema</b>, you can write multiple schema files in an organized manner without any restrictions.

For Multiple files inter-relation you can  import schemas , to manage the relation.

Built using TypeScript to for ES Module and CommonJS (CJS),
to Unify Multiple Structured Schemas of [Prisma-ORM](https://www.prisma.io/)

# Installation

```
npm i prisma-multischema
```
# Usage

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
        │   │   └───...   
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

# Demonstration
 working example is available below -
- <b>JavaScript</b> : [Prisma-MultiSchema-JS-Example](https://github.com/joydip007x/Prisma-MultiSchema-JS-Example)

- <b>TypeScript</b> : [Prisma-MultiSchema-TS-Example](https://github.com/joydip007x/Prisma-MultiSchema-TS-Example)

# Example

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
>Generated <b>schema.prisma</b> [root/prisma/schema.prisma]
> [ after `npx prisma-multischema` ]
```prisma
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

# Additional
- prisma schema files starting with `#exclude` will be excluded in final schema
- Executing `npx prisma-multischema` 
    - Automatically runs :  `npx prisma generate`
    <br>So, You don't need to update `@prisma/client` manually,  each time the schema  updates
    - Automatically runs : `npx prisma format`
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
# Dependencies (Optional)
To use <b>prisma import</b> feature : (<i>if you are using VS code, its better to use these</i>)<br>
<br>
- Install [prisma-import](https://marketplace.visualstudio.com/items?itemName=ajmnz.prisma-import) Extension (for VS code)  

- <b>Disable</b> Official [prisma](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma) Extension (for VS code)

>These are <b>Optional Dependencies</b>, If you can maintain multiple *.prisma schemas  without <b>TYPO</b> ,you can ignore these.



## Authors

- [@joydip007x](https://www.github.com/joydip007x)

<br><br>
>## To-Do
- Add Support for keeping prisma's in different folder and aggregate them ( like `root/src/auth/auth.prisma `)

- Add Command Flags
- Handle/Remove `" Error validating datasource db: "` Warning

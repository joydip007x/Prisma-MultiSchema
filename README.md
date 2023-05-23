[![Tests](https://github.com/joydip007x/Prisma-MultiSchema/actions/workflows/tests.yml/badge.svg?branch=main)](https://github.com/joydip007x/Prisma-MultiSchema/actions/workflows/tests.yml)
[![Snyk Security Check](https://github.com/joydip007x/Prisma-MultiSchema/actions/workflows/snyk.yml/badge.svg?branch=main)](https://github.com/joydip007x/Prisma-MultiSchema/actions/workflows/snyk.yml)
<!-- [![Release](https://github.com/joydip007x/prisma-unify007x/actions/workflows/release.yml/badge.svg)](https://github.com/joydip007x/prisma-unify007x/actions/workflows/release.yml) -->

# PRISMA: MultiSchema

An npm package  using TypeScript to build for both the ECMAScript Module format (ESM or ES Module) and CommonJS Module format (CJS)
to Unify Multiple Structured Schemas of [Prisma-ORM](https://www.prisma.io/)

# Installation

```
npm i prisma-multischema
```
# Usage

-  Go to `your project root` , create folder `prisma`
-  Inside folder `prisma`  , create sub-folder `subschemas`
-  Now,in `subschemas` , Create any number of prisma    schema,types , keep them in any folder/nested structure,
-  Run in Terminal
    ```
    npx prisma-multischema
    ```

# Dependencies

To use <b>prisma import</b> feature :
<br>


- Install [prisma-import](https://marketplace.visualstudio.com/items?itemName=ajmnz.prisma-import) Extension (for VS code)  

- <b>Disable</b> Official [prisma](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma) Extension

>These are Optional Dependencies, If you can maintain multiple *.prisma schemas and type without <b>TYPO</b> ,you can ignore these.

# Demonstration
 working example is available below -
- JavaScript : [Prisma-MultiSchema-JS-Example](https://github.com/joydip007x/Prisma-MultiSchema-JS-Example)

- TypeScript : [Prisma-MultiSchema-TS-Example](https://github.com/joydip007x/Prisma-MultiSchema-TS-Example)


## Authors

- [@joydip007x](https://www.github.com/joydip007x)
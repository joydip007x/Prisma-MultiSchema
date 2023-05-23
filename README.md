[![Tests](https://github.com/joydip007x/Prisma-MultiSchema/actions/workflows/tests.yml/badge.svg?branch=main)](https://github.com/joydip007x/Prisma-MultiSchema/actions/workflows/tests.yml)
[![Snyk Security Check](https://github.com/joydip007x/Prisma-MultiSchema/actions/workflows/snyk.yml/badge.svg?branch=main)](https://github.com/joydip007x/Prisma-MultiSchema/actions/workflows/snyk.yml)
<!-- [![Release](https://github.com/joydip007x/prisma-unify007x/actions/workflows/release.yml/badge.svg)](https://github.com/joydip007x/prisma-unify007x/actions/workflows/release.yml) -->


<p align="center">

<img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTU5NmYyYzI0NGU2NTI4YTUyY2ZjN2IyZjBiY2QzYWIwZmRjMDQ2MCZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/cNWy8aU7WT0V2hwiUy/giphy.gif">

</p>

# PRISMA: MultiSchema

An npm package  using TypeScript to build for both the ECMAScript Module format (ESM or ES Module) and CommonJS Module format (CJS)
to Unify Multiple Structured Schemas of [Prisma-ORM](https://www.prisma.io/)

# Installation

```
npm i prisma-multischema
```
# Usage

-  Place all your schemas in  `ProjectRoot/prisma/subschemas` Folder.
like this :
<p align="center">

<img src="https://i.ibb.co/JnyRhxT/oie-eg-Dr9-Y4ksb-NU.png">

</p>

- Run in Terminal
    ```
    npx prisma-multischema
    ```

## Extra Features
- prisma schema files with `#exclude` will be excluded in final schema

# Dependencies

To use <b>prisma import</b> feature :
<br>


- Install [prisma-import](https://marketplace.visualstudio.com/items?itemName=ajmnz.prisma-import) Extension (for VS code)  

- <b>Disable</b> Official [prisma](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma) Extension (for VS code)

>These are <b>Optional Dependencies</b>, If you can maintain multiple *.prisma schemas  without <b>TYPO</b> ,you can ignore these.

# Demonstration
 working example is available below -
- JavaScript : [Prisma-MultiSchema-JS-Example](https://github.com/joydip007x/Prisma-MultiSchema-JS-Example)

- TypeScript : [Prisma-MultiSchema-TS-Example](https://github.com/joydip007x/Prisma-MultiSchema-TS-Example)


## Authors

- [@joydip007x](https://www.github.com/joydip007x)
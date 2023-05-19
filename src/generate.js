#!/usr/bin/env node
const { prismaUnifier } = require('prisma-unify007x');
const { exec } = require('node:child_process');

async function commands(){


    console.log('started Prisma-Unify');
    await prismaUnifier();
    console.log('Wait ! Running npx prisma generate');
    const gen= exec('npx prisma generate')
    console.log('ProcessID- ',gen.pid,' Ended');
    console.log('Run `npx prisma studio` to inspect your database');

}
commands();
#!/usr/bin/env node
const { prismaUnifier } = require('prisma-multischema');
const { exec } = require('node:child_process');

async function commands(){

    // console.log('started Prisma-Unify');
    await prismaUnifier();
    console.log("\x1b[33m","Wait ! Running: ","\x1b[1m","npx prisma generate","\x1b[0m");
    const gen= exec('npx prisma generate')

    const p=setTimeout(()=>{
        exec('npx prisma format')
        console.log(' Run:',"\x1b[1m","\x1b[34m","npx prisma studio","\x1b[0m","to inspect your database");
        console.log(" ✔ Generated","\x1b[32m","Prisma Client ","\x1b[0m","Reference: https://pris.ly/d/client ");
        console.log(" Start Using :"," import { PrismaClient } from '@prisma/client'\n",
        "               const prisma = new PrismaClient()");

    },3000);
    
   
}
commands();
import 'mocha';
import { assert } from 'chai';

import * as fs from 'fs';
import * as path from 'path';

import { TestRun, goodBye } from '../src/index';
import { prismaUnifier } from '../src/prismaUnify';

describe('Package Start : HELLO ', () => {
  it('should be a function', () => {
    assert.isFunction(TestRun);
  });

  it('should return primary check', () => {
    const expected = 'joydip007x\'s first  npm package!';
    const actual = TestRun();
    assert.equal(actual, expected);
  });
});

describe('PRISMA UNIFY ', () => {
  it('Demo-Prisma Files should be Equal in Content', () => {
    assert.isFunction(prismaUnifier);
  });

  it('should return Unified Schema', async () => {
    const expected = JSON.stringify(fs.readFileSync(path.join(process.cwd(),'/tests/expectedSchema'), 'utf8'));
    const filePath=await prismaUnifier(1);
    await sleep(1000);
    const actual =JSON.stringify( fs.readFileSync(path.join(filePath), 'utf8'));

    assert.strictEqual(actual, expected);
    
 
  });
});

function sleep(ms: number){
  return new Promise(res=>setTimeout(res,ms));
}


import 'mocha';
import { assert } from 'chai';

import * as fs from 'fs';
import * as path from 'path';

import { TestRun, goodBye,prismaUnifier } from '../src/index';
import npmPackage from '../src/index';

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
    const expected = fs.readFileSync(path.join(process.cwd(),'/tests/expectedSchema'), 'utf8');
    const actual =fs.readFileSync(path.join(await prismaUnifier(1)), 'utf8'); 
    assert.notDeepEqual(actual, expected);
  });
});


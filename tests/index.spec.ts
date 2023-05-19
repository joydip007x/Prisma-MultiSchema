import 'mocha';
import { assert } from 'chai';

import { TestRun, goodBye } from '../src/index';
import npmPackage from '../src/index';

describe('NPM Package', () => {
  it('should be an object', () => {
    assert.isObject(npmPackage);
  });

  it('should have a helloWorld property', () => {
    assert.property(npmPackage, 'TestRun');
  });
});

describe('Package Start : HELLO ', () => {
  it('should be a function', () => {
    assert.isFunction(TestRun);
  });

  it('should return the hello world message', () => {
    const expected = 'joydip007x\'s first  npm package!';
    const actual = TestRun();
    assert.equal(actual, expected);
  });
});

describe('Package END : Goodbye', () => {
  it('should be a function', () => {
    assert.isFunction(goodBye);
  });

  it('should return the goodbye message', () => {
    const expected = 'Goodbye from my package!';
    const actual = goodBye();
    assert.equal(actual, expected);
  });
});

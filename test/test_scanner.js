var assert = require('chai').assert;
var Scanner = require('../src/Scanner.js').Scanner;

describe('Scanner', () => {

  describe('peek()', () => {
    let testTerm = "test";
    let scanner = new Scanner(testTerm);

    it(`Should return the second character of ${testTerm}`, () => {
      scanner.current = 1;
      assert.equal(scanner.peek(), 'e');
    });
    it('Should return \\0 if cursor is at end of the code', () => {
      scanner.current = 4;
      assert.equal(scanner.peek(), '\0');
    });
    it('Should return \\0 if cursor is out of bounds', () => {
      scanner.current = 5;
      assert.equal(scanner.peek(), '\0');
    });
    it.skip('Should throw an OutOfBoundsException if cursor is negative', () => {
      scanner.current = -5;
      // TODO: implement this feature
    });
  });

  describe('peekNext()', () => {
    let testTerm = "test";
    let scanner = new Scanner(testTerm);

    it(`Should return the third character of ${testTerm}`, () => {
      scanner.current = 1;
      assert.equal(scanner.peekNext(), 's');
    });
    it('Should return \\0 if cursor is at end of the code', () => {
      scanner.current = 4;
      assert.equal(scanner.peekNext(), '\0');
    });
    it('Should return \\0 if cursor is out of bounds', () => {
      scanner.current = 5;
      assert.equal(scanner.peekNext(), '\0');
    });
    it.skip('Should throw an OutOfBoundsException if cursor is negative', () => {
      scanner.current = -5;
      // TODO: implement this feature
    });
  });

  describe('isDigit()', () =>  {
    let scanner = new Scanner('');
    
    it('Should return true if argument is a number', () => {
      assert.isTrue(scanner.isDigit(1));
      assert.isTrue(scanner.isDigit('1'));
      assert.isTrue(scanner.isDigit('0'));
    });
    it('Should return false if argument is a not number', () => {
      assert.isFalse(scanner.isDigit('a'));
      assert.isFalse(scanner.isDigit('\\'));
      assert.isFalse(scanner.isDigit('-1'));
    });
  });

  describe('isAlphaNumeric()', () => {
    let scanner = new Scanner('');
    
    it('Should return true if argument is Alpha Numeric', () => {
      assert.isTrue(scanner.isAlphaNumeric('a'));
      assert.isTrue(scanner.isAlphaNumeric('b'));
      assert.isTrue(scanner.isAlphaNumeric('1'));
    });
    it('Should return false if argument is not Alpha Numeric', () => {
      assert.isFalse(scanner.isAlphaNumeric('|'));
      assert.isFalse(scanner.isAlphaNumeric('"'));
      assert.isFalse(scanner.isAlphaNumeric('\\n'));
    });
  });

  describe('scanTokens()', () => {
    it.skip('');
  });
  describe('match()', () => {
    it.skip('');
  });
  describe('number()', () => {
    it.skip('');
  });
  describe('string()', () => {
    it.skip('');
  });
  describe('identifier()', () => {
    it.skip('');
  });
  describe('advance()', () => {
    it.skip('');
  });
  describe('addToken()', () => {
    it.skip('');
  });
  describe('isAtEnd()', () => {
    it.skip('');
  });
  describe('isAlpha()', () => {
    it.skip('');
  });
});
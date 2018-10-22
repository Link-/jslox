var assert = require('chai').assert;
var ASTPrinter = require('../src/ASTPrinter.js').ASTPrinter;
var Expr = require('../src/expressions/Expr.js');
var Token = require('../src/Token.js').Token;
var TokenType = require('../src/TokenType.js');

describe('ASTPrinter', () => {

  describe('print()', () => {
    let astPrinter = new ASTPrinter();

    it(`Should print a flattened expression`, () => {
      let expression = new Expr.Binary(
        new Expr.Unary(
          new Token(TokenType.MINUS, '-', null, 1),
          new Expr.Literal(123)
        ),
        new Token(TokenType.STAR, '*', null, 1),
        new Expr.Grouping(
          new Expr.Literal(45.67)
        )
      );

      assert.equal(astPrinter.print(expression), '(* (- 123) (group 45.67))');
    });
  });
});
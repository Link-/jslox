var assert = require('chai').assert;
var ASTPrinter = require('../src/ASTPrinter.js').ASTPrinter;
var Expr = require('../src/expressions/Expr.js');
var Token = require('../src/Token.js').Token;
var TokenType = require('../src/TokenType.js');

describe('ASTPrinter', () => {

  describe('print()', () => {
    let astPrinter = new ASTPrinter();

    it(`First test case: -123 * (45.67)`, () => {
      /**
       * Expression form:
       * -123 * (45.67)
       */
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

    it(`Second test case: (1 + 2) * (4 - 3)`, () => {
      /**
       * Expression form:
       * (1 + 2) * (4 - 3)
       */
      let expression = new Expr.Binary(
        new Expr.Grouping(
          new Expr.Binary(
            new Expr.Literal(1),
            new Token(TokenType.PLUS, '+', null, 1),
            new Expr.Literal(2)
          )
        ),
        new Token(TokenType.STAR, '*', null, 1),
        new Expr.Grouping(
          new Expr.Binary(
            new Expr.Literal(4),
            new Token(TokenType.MINUS, '-', null, 1),
            new Expr.Literal(3)
          )
        )
      )

      assert.equal(
        astPrinter.print(expression),
        '(* (group (+ 1 2)) (group (- 4 3)))'
      )
    });
  });
});
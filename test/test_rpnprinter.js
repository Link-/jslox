var assert = require('chai').assert;
var RPNPrinter = require('../src/RPNPrinter.js').RPNPrinter;
var Expr = require('../src/expressions/Expr.js');
var Token = require('../src/Token.js').Token;
var TokenType = require('../src/TokenType.js');

describe('RPNPrinter', () => {

  describe('print()', () => {
    let rpnPrinter = new RPNPrinter();

    it(`First test case: (15 + 20) * (4 - 3)`, () => {
      let expression = new Expr.Binary(
        new Expr.Grouping(
          new Expr.Binary(
            new Expr.Unary(
              new Token(TokenType.MINUS, '-', null, 1),
              new Expr.Literal(15)
            ),
            new Token(TokenType.PLUS, '+', null, 1),
            new Expr.Literal(20)
          ),
        ),
        new Token(TokenType.STAR, '*', null, 1),
        new Expr.Grouping(
          new Expr.Binary(
            new Expr.Literal(4),
            new Token(TokenType.MINUS, '-', null, 1),
            new Expr.Literal(3)
          ),
        )
      );

      assert.equal(
        rpnPrinter.print(expression),
        '15 - 20 + 4 3 - *'
      );
    });

    it(`Second more complicated case: ((15 / (7 − (1 + 1))) × 3) − (2 + (1 + 1))`, () => {
      let expression = new Expr.Binary(
        new Expr.Grouping(
          new Expr.Binary(
            new Expr.Grouping(
              new Expr.Binary(
                new Expr.Literal(15),
                new Token(TokenType.SLASH, '/', null, 1),
                new Expr.Grouping(
                  new Expr.Binary(
                    new Expr.Literal(7),
                    new Token(TokenType.MINUS, '-', null, 1),
                    new Expr.Grouping(
                      new Expr.Binary(
                        new Expr.Literal(1),
                        new Token(TokenType.PLUS, '+', null, 1),
                        new Expr.Literal(1)
                      )
                    )
                  )
                )
              )
            ),
            new Token(TokenType.STAR, '*', null, 1),
            new Expr.Literal(3)
          )
        ),
        new Token(TokenType.MINUS, '-', null, 1),
        new Expr.Grouping(
          new Expr.Binary(
            new Expr.Literal(2),
            new Token(TokenType.PLUS, '+', null, 1),
            new Expr.Grouping(
              new Expr.Binary(
                new Expr.Literal(1),
                new Token(TokenType.PLUS, '+', null, 1),
                new Expr.Literal(1)
              )
            )
          )
        )
      );

      assert.equal(
        rpnPrinter.print(expression),
        '15 7 1 1 + - / 3 * 2 1 1 + + -'
      );
    });
  });
});
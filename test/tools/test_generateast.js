var assert = require('chai').assert;
var GenerateAST = require('../../src/tools/GenerateAST.js').GenerateAST;

describe('GenerateAST', () => {

  describe('defineAST()', () => {
    it.skip('should write the passed arguments to a file', () => {
      const ASTtypes = {
        'Binary'    : ['left', 'operator', 'right'],
        'Grouping'  : ['expression'],
        'Literal'   : ['value'],
        'Unary'     : ['operator', 'right'],
      }

      GenerateAST.defineAST(
        '/Users/bassemd/projects/research/languages/jslox/src/expressions',
        'Expr',
        ASTtypes
      );
    });
  });

});
const Expr = require('./Expr.js').Expr;

class Grouping extends Expr {
  constructor(expression) {
    this.expression = expression;
  }
  accept(visitor) {
    return visitor.visitGroupingExpr(this);
  }
}

module.exports = { Grouping };

const Expr = require('./Expr.js').Expr;

class Unary extends Expr {
  constructor(operator,right) {
    this.operator = operator;
    this.right = right;
  }
  accept(visitor) {
    return visitor.visitUnaryExpr(this);
  }
}

module.exports = { Unary };

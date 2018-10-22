const Expr = require('./Expr.js').Expr;

class Binary extends Expr {
  constructor(left,operator,right) {
    this.left = left;
    this.operator = operator;
    this.right = right;
  }
  accept(visitor) {
    return visitor.visitBinaryExpr(this);
  }
}

module.exports = { Binary };

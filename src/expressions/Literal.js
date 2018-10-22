const Expr = require('./Expr.js').Expr;

class Literal extends Expr {
  constructor(value) {
    this.value = value;
  }
  accept(visitor) {
    return visitor.visitLiteralExpr(this);
  }
}

module.exports = { Literal };

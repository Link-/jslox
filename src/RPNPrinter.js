const Expr = require('./expressions/Expr.js');

class RPNPrinter {

  print(expr) {
    return expr.accept(this);
  }

  visitBinaryExpr(expr) {
    return this.rpn(expr.operator.lexeme, expr.left, expr.right);
  }

  visitGroupingExpr(expr) {
    return this.rpn("", expr.expression);
  }

  visitLiteralExpr(expr) {
    if (expr.value == null) {
      return "nil";
    }

    return expr.value.toString();
  }

  visitUnaryExpr(expr) {
    return this.rpn(expr.operator.lexeme, expr.right);
  }

  rpn(name, ...exprs) {
    let result = ``;

    exprs.forEach((value) => {
      result += `${value.accept(this)} `;
    });

    result += `${name}`;

    return result.trim();
  }
}

module.exports = { RPNPrinter }
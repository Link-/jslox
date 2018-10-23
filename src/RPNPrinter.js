const Expr = require('./expressions/Expr.js');

class RPNPrinter {

  /**
   * 
   * @param {*} expr 
   */
  print(expr) {
    return expr.accept(this);
  }

  /**
   * 
   * @param {*} expr 
   */
  visitBinaryExpr(expr) {
    return this.rpn(expr.operator.lexeme, expr.left, expr.right);
  }

  /**
   * 
   * @param {*} expr 
   */
  visitGroupingExpr(expr) {
    return this.rpn("", expr.expression);
  }

  /**
   * 
   * @param {*} expr 
   */
  visitLiteralExpr(expr) {
    if (expr.value == null) {
      return "nil";
    }

    return expr.value.toString();
  }

  /**
   * 
   * @param {*} expr 
   */
  visitUnaryExpr(expr) {
    return this.rpn(expr.operator.lexeme, expr.right);
  }

  /**
   * 
   * @param {*} name 
   * @param  {...any} exprs 
   */
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
const Expr = require('./expressions/Expr.js');

class ASTPrinter {
  /**
   * 
   * @param {*} expr 
   */
  print(expr) {
    return expr.accept(this);
  }

  /**
   * 
   * @param {Binary} expr 
   */
  visitBinaryExpr(expr) {
    return this.parenthesize(expr.operator.lexeme, expr.left, expr.right);
  }

  /**
   * 
   * @param {Grouping} expr 
   */
  visitGroupingExpr(expr) {
    return this.parenthesize("group", expr.expression);
  }

  /**
   * 
   * @param {Literal} expr 
   */
  visitLiteralExpr(expr) {
    if (expr.value == null) {
      return "nil";
    }

    return expr.value.toString();
  }

  /**
   * 
   * @param {Unary} expr 
   */
  visitUnaryExpr(expr) {
    return this.parenthesize(expr.operator.lexeme, expr.right);
  }

  /**
   * 
   * @param {*} name 
   * @param  {...Expr} exprs 
   */
  parenthesize(name, ...exprs) {
    let result = `(${name}`;

    exprs.forEach((value) => {
      result += ' ';
      result += value.accept(this);
    });

    result += ')';
    return result;
  }
}

module.exports = { ASTPrinter };

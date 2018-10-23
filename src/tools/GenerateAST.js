const fs = require('fs');
const readline = require('readline');

const ASTtypes = {
  'Binary'    : ['left', 'operator', 'right'],
  'Grouping'  : ['expression'],
  'Literal'   : ['value'],
  'Unary'     : ['operator', 'right'],
}

/**
 * Standalone script that generates the different AST classes
 *
 * Run:
 * node GenerateAST.js <output directory | without a trailing />
 */
class GenerateAST {

  /**
   *
   */
  static init() {
    // process.argv is an array containing the command line arguments.
    // The first element will be 'node', the second element will be
    // the name of the JavaScript file so we remove both with slice()
    const args = process.argv.slice(2);
    if (args.length != 1) {
      process.stderr.write("Usage: node GenerateAST.js [output directory]");
      return;
    }
    this.outputDir = args[0];
    // Generate the files
    GenerateAST.defineAST(this.outputDir, 'Expr', ASTtypes);
  }

  /**
   * 
   * @param {*} outputDir
   * @param {*} baseName
   * @param {*} types
   */
  static defineAST(outputDir, baseName, types) {
    // Write the Base Class file first
    let definition = GenerateAST.defineBaseClass(baseName);
    let path = `${outputDir}/${baseName}.js`;

    // Write the Type Class files
    for (let item in types) {
      let className = item;
      let fields = types[item];
      definition += GenerateAST.defineType(baseName, className, fields);
    }
    let modules = Object.keys(types).join(', ') + `, ${baseName}`;
    // Add module exports to make classes available
    definition += `\n\nmodule.exports = { ${modules} };\n`;
    return fs.writeFileSync(path, definition);
  }

  /**
   *
   * @param {*} baseName
   */
  static defineBaseClass(baseName) {
    let classDefinition    = `class ${baseName} {}\n\n`;
    return classDefinition;
  }

  /**
   * This is one ugly ass method.
   *
   * @param {*} baseName
   * @param {*} className
   * @param {*} fields
   */
  static defineType(baseName, className, fields) {
    // Class START
    let classDefinition	   = `class ${className} extends ${baseName} {\n`;

    // Constructor START
    classDefinition       += `  constructor(${fields}) {\n`;
    classDefinition       += `    super();`;
    fields.forEach((value) => {
      classDefinition     += `\n    this.${value} = ${value};`
    });
    classDefinition       += `\n  }\n`;
    // Constructor END

    // accept(visitor) START
    classDefinition	      += `  accept(visitor) {\n`;
    classDefinition	      += `    return visitor.visit${className}${baseName}(this);\n`;
    classDefinition	      += `  }\n`;
    // accept(visitor) END

    classDefinition	      += `}\n\n`;
    // Class END

    return classDefinition;
  }
}

// Run The Generator
GenerateAST.init();

module.exports = { GenerateAST };

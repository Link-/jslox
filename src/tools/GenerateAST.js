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

    fs.writeFileSync(path, definition);

    // Write the Type Class files
    for (let item in types) {
      let className = item;
      let fields = types[item];
      path = `${outputDir}/${className}.js`;
      definition = GenerateAST.defineType(baseName, className, fields);

      fs.writeFileSync(path, definition);
    }
  }

  /**
   *
   * @param {*} baseName
   */
  static defineBaseClass(baseName) {
    let classDefinition    = `class ${baseName} {}\n\n`;
    classDefinition	      += `module.exports = { ${baseName} };\n`

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
    let classDefinition    = `const ${baseName} = require('./${baseName}.js').${baseName};\n\n`;

    // Class START
    classDefinition	      += `class ${className} extends ${baseName} {\n`;

    // Constructor START
    classDefinition       += `  constructor(${fields}) {`;
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

    classDefinition	      += `module.exports = { ${className} };\n`;

    return classDefinition;
  }
}

// Run The Generator
GenerateAST.init();

module.exports = { GenerateAST };

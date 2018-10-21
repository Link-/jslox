const fs = require('fs');
const readline = require('readline');

const ASTtypes = {
  'Binary'    : ['left', 'operator', 'right'],
  'Grouping'  : ['expression'],
  'Literal'   : ['value'],
  'Unary'     : ['operator', 'right'],
}

class GenerateAST {
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
    let classDefinition = `class ${baseName} {}

module.exports = { ${baseName} };
`

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
    let classDefinition = `const ${baseName} = require('./${baseName}.js').${baseName};

class ${className} extends ${baseName} {

  constructor(${fields}) {`;

    fields.forEach((value) => {
      classDefinition += `\n    this.${value} = ${value};`
    });

    classDefinition += `
  }
}

module.exports = { ${className} };
`;

    return classDefinition;
  }
}

// Run The Generator
GenerateAST.init();

module.exports = { GenerateAST };

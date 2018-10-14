const fs = require('fs');
const readline = require('readline');
const Token = require('./Token.js');

/**
 * TODO:
 * - Rename this class "Shell" and move jsLox to the root directory
 */
class jsLox {

  static init() {
    // Error flag -- will terminate execution if error is raised
    jsLox.hadError = false;
    // process.argv is an array containing the command line arguments. 
    // The first element will be 'node', the second element will be 
    // the name of the JavaScript file so we remove both with slice()
    const args = process.argv.slice(2);

    if (args.length > 1) {
      console.log("Usage: jsLox [script]");
    } else if (args.length == 1) {
      jsLox.runFile(args[0])
    } else {
      jsLox.runPrompt();
    }
  }

  /**
   * TODO: 
   * - Refactor to handle more encodings
   * @param {*} path 
   */
  static runFile(path) {
    console.log(`Running: ${path}`);

    const lineReader = readline.createInterface({
      input: fs.createReadStream(path)
    });

    lineReader.on('line', (line) => {
      jsLox.run(line);

      if (jsLox.hadError) {
        process.exit(65);
      }
    });
  }

  /**
   * TODO:
   * - Refactor so that the Readable stream is not declared and initialized here
   */
  static runPrompt() {
    console.log("Prompt running");
    const rlInterface = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: '> ',
    });

    rlInterface.prompt();

    rlInterface.on('line', (line) => {
      jsLox.run(line);
      rlInterface.prompt();
      jsLox.hadError = false;
    });
  }

  /**
   * Execute source code
   * @param {*} source 
   */
  static run(source) {
    console.log(`EXEC: ${source}`);
  }

  /**
   * 
   * @param {*} line 
   * @param {*} message 
   */
  static error(line, message) {
    report(line, "", message);
  }

  /**
   * 
   * @param {*} line 
   * @param {*} location 
   * @param {*} message 
   */
  static report(line, location, message) {
    process.stderr.write(`[line ${line}] Error ${location} : ${message}`);
  }
}

/**
 *  TODO: 
 * - Move this elsewhere
 */
jsLox.init();
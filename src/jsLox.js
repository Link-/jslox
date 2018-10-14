class jsLox {

  static run() {
    // process.argv is an array containing the command line arguments. 
    // The first element will be 'node', the second element will be 
    // the name of the JavaScript file so we remove both with slice()
    const args = process.argv.slice(2)

    if (args.length > 1) {
      console.log("Usage: jsLox [script]")
    } else if (args.length == 1) {
      jsLox.runFile(args[0])
    } else {
      jsLox.runPrompt()
    }
  }

  static runFile(path) {
    console.log(`Running: ${path}`)
  }

  static runPrompt() {
    console.log("Prompt running")
  }
}

jsLox.run()
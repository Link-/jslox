const Shell = require('./Shell.js').Shell;
const Token = require('./Token.js').Token;
const TokenType = require('./TokenType.js');
const Keywords = require('./Keywords.js');

class Scanner {

  constructor(source) {
    this.source = source;
    this.tokens = [];
    this.start = 0;
    this.current = 0;
    this.line = 1;
  }

  /**
   *
   */
  scanTokens() {
    while (!this.isAtEnd()) {
      this.start = this.current;
      this.scanToken();
    }
    this.tokens.push(new Token(TokenType.EOF, "", null, this.line));
    return this.tokens;
  }

  /**
   *
   */
  scanToken() {
    const char = this.advance();
    switch(char) {
      case '(': this.addToken(TokenType.LEFT_PAREN); break;
      case ')': this.addToken(TokenType.RIGHT_PAREN); break;
      case '{': this.addToken(TokenType.LEFT_BRACE); break;
      case '}': this.addToken(TokenType.RIGHT_BRACE); break;
      case ',': this.addToken(TokenType.COMMA); break;
      case '.': this.addToken(TokenType.DOT); break;
      case '-': this.addToken(TokenType.MINUS); break;
      case '+': this.addToken(TokenType.PLUS); break;
      case ';': this.addToken(TokenType.SEMICOLON); break;
      case '*': this.addToken(TokenType.STAR); break;
      case '!': this.addToken(this.match('=') ? TokenType.BANG_EQUAL : TokenType.BANG); break;
      case '=': this.addToken(this.match('=') ? TokenType.EQUAL_EQUAL : TokenType.EQUAL); break;
      case '<': this.addToken(this.match('=') ? TokenType.LESS_EQUAL : TokenType.LESS); break;
      case '>': this.addToken(this.match('=') ? TokenType.GREATER_EQUAL : TokenType.GREATER); break;
      case '/':
        if (this.match('*')) {
          /**
           * C-Style block comments. Very naive implementation
           * TODO:
           * - Implement a better version of this
           */
          while (!this.peek() != '/' && !this.isAtEnd()) {
            if (this.match('*') && this.match('/')) {
              this.advance();
              break;
            }
            this.advance();
          }
        } else if (this.match('/')) {
            // A comment goes until the end of line
            while (this.peek() != '\n' && !this.isAtEnd()) {
              this.advance();
            }
        } else {
            this.addToken(TokenType.SLASH);
        }
        break;
      case ' ':
      case '\r':
      case '\t':
        // Skip meaningless characters
        break;
      case '\n':
        this.line++;
        break;
      case '"':
        this.string();
        break;
      case 'o':
        if (this.peek() == 'r') {
          this.addToken(TokenType.OR);
        }
        break;
      default:
        // Handle digits
        if (this.isDigit(char)) {
          this.number();
        } else if (this.isAlpha(char)) {
          this.identifier();
        } else {
          Shell.error(this.line, "Unexpected character.");
        }
        break;
    }
  }

  /**
   * 
   */
  identifier() {
    while (this.isAlphaNumeric(this.peek())) {
      this.advance();
    }
    // Check if the identifier is a reserved word
    let text = this.source.substr(this.start, this.current);
    let type = Keywords[text];
    if (type == 'undefined') {
      type = TokenType.IDENTIFIER;
    }
    this.addToken(type);
  }

  /**
   *
   * @param {*} char
   */
  isAlphaNumeric(char) {
    return this.isAlpha(char) || this.isDigit(char);
  }

  /**
   *
   * @param {*} char
   */
  isAlpha(char) {
    return (char >= 'a' && char <= 'z') ||
      (char >= 'A' && char <= 'Z') ||
      char == '_';
  }

  /**
   *
   * @param {*} char
   */
  isDigit(char) {
    return char >= 0 && char <= 9;
  }

  /**
   * TODO:
   * - Refactor into a recursive method
   */
  number() {
    while (this.isDigit(this.peek())) {
      this.advance();
    }

    if (this.peek() == '.' && this.isDigit(this.peekNext())) {
      // Consume the .
      this.advance();
      // Look for further digits
      while (this.isDigit(this.peek())) {
        this.advance();
      }
    }

    this.addToken(
      TokenType.NUMBER,
      parseFloat(
        this.source.substr(this.start, this.current)
      )
    );
  }

  /**
   * Handle String Literals
   */
  string() {
    while (this.peek() != '"' && !this.isAtEnd()) {
      if (this.peek() == '\n') {
        this.line++;
      }
      this.advance();
    }

    // Unterminated string
    if (this.isAtEnd()) {
      Shell.error(this.line, "Unterminated string");
      return;
    }

    this.advance();
    const value = this.source.substr(this.start + 1, this.current - 1);
    this.addToken(TokenType.STRING, value);
  }

  /**
   * Lookahead method
   * TODO:
   * - Implement an index out of bounds exception if cursor has a negative value
   */
  peek() {
    if (this.isAtEnd()) {
      return '\0';
    }
    return this.source.charAt(this.current);
  }

  /**
   *
   */
  peekNext() {
    if (this.current + 1 >= this.source.length) {
      return '\0';
    }
    return this.source.charAt(this.current + 1);
  }

  /**
   * Consumes the next character while  checking for an expected value
   * @param {*} expected
   */
  match(expected) {
    if (this.isAtEnd() || this.source.charAt(this.current) != expected) {
      return false;
    }
    this.current++;
    return true;
  }

  /**
   * Consumes the next character
   */
  advance() {
    this.current++;
    return this.source.charAt(this.current - 1);
  }

  /**
   *
   * @param {*} type
   * @param {*} literal
   */
  addToken(type, literal = null) {
    const chunk = this.source.substr(this.start, this.current);
    this.tokens.push(new Token(type, chunk, literal, this.line));
  }

  /**
   * Helper method to test EOF
   */
  isAtEnd() {
    return this.current >= this.source.length;
  }
}

module.exports = { Scanner }
import GU from "./GeneralUtils";

export default class ExpenseParsingMethods {
  /**
   * @constant {regex}
   */
  mainRegexPattern = /(\$*(\b([,.\d]+)\b)+ \w+ (\b[^,]\w*)+)|(\b([^,]\w*)+ \w+ \$*(\b([,.\d]+)\b)+)/g;
  // mainRegexPattern3 = /((\b([\d.,]+)\b)+ \w+ [\w\s'"?\!\\/|^%$()*@#&]+)|[\w\s'"?\!\\/|^%$()*@#&]+ \w+ ((\b([\d.,]+)\b)+)/g; // regex for format [number] [anyword] [any word or words]
  // mainRegexPattern2 = /(\w+ \w+ [\w\s]+)/g; //regex for format [anyword] [anyword] [anyword]

  /**
   * @constant {array}
   */
  excludeWordsPattern = [
    "for",
    "in",
    "dollars",
    "bucks",
    "cost",
    "bought",
    "buy",
    "sold",
    "purchased",
    "purchase",
    "sell",
    "$"
  ];

  /**
   * Parses the string argument to extract all sentences that matches the regular expression pattern provided
   * @param {String} expense The expense string to parse
   * @param {RegExp} regexPattern The regular expression pattern to use
   * @returns {Array}
   */
  parseExpense = (expense, regexPattern = null) => {
    var re;
    regexPattern === null ? (re = this.mainRegexPattern) : (re = regexPattern);
    var validExpenses = expense.match(re);
    return validExpenses;
  };

  /**
   * Extracts and returns the expense item and amount from the expense string
   * @param {String} expense The expense string
   * @returns {Object}
   */
  extractExpenseInformation = expense => {
    const r3 = /\b\s*(\$*([\d.,]+))\s*\b/g;
    var expenseTokens = expense.split(" ");
    var amount;
    var item = "";
    expenseTokens.map((token, index) => {
      if (r3.test(token) && amount === undefined) {
        amount = token.match(/\b[\d.,]+\b/g)[0];
      } else {
        if (!this.excludeWordsPattern.includes(token)) {
          item += token + " ";
        }
      }
    });
    if (new GU().isAFloat(amount)) {
      return { item: item, amount: amount };
    } else {
      return false;
    }
  };
}

export default class ExpenseParsingMethods {
  /**
   * @constant {regex}
   */
  mainRegexPattern = /((\b([\d.,]+)\b)+ \w+ [\w\s'"?\!\\/|^%$()*@#&]+)|[\w\s'"?\!\\/|^%$()*@#&]+ \w+ ((\b([\d.,]+)\b)+)/g; // regex for format [number] [anyword] [any word or words]
  mainRegexPattern2 = /(\w+ \w+ [\w\s]+)/g; //regex for format [anyword] [anyword] [anyword]

  /**
   * Parses the string argument to extract all sentences that matches the regular expression pattern provided
   * @param {String} expense The expense string to parse
   * @param {RegExp} regexPattern The regular expression pattern to use
   * @returns {Array}
   */
  parseExpense = (expense, regexPattern = null) => {
    var re;
    if (regexPattern === null) {
      re = this.mainRegexPattern;
    } else {
      re = regexPattern;
    }
    var validExpenses = expense.match(re);
    return validExpenses;
  };

  /**
   * Extracts and returns the expense item and amount from the expense string
   * @param {String} expense The expense string
   * @returns {Object}
   */
  extractExpenseInformation = expense => {
    var oldamount = expense.match(/\b([\d.,]+)\b/g)[0];
    var amount = oldamount.replace(/,/g, "");
    expense = expense.replace(oldamount, amount);
    var words = expense.split(" ").filter(element => element != amount);
    var item = "";
    var excludeWordsPattern = ["for", "in", "dollars", "bucks"];
    words.forEach(element => {
      if (!excludeWordsPattern.includes(element)) {
        item += element + " ";
      }
    });
    item = item.trim();
    //console.log(item, amount);
    return { item, amount };
  };
}

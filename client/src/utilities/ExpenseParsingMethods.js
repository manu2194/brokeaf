export default class ExpenseParsingMethods {
  /**
   * Parse the string to extract the item name and the amount
   */

  mainRegexPattern = /([(\d)\.]+ \w+ [\w\s]+)/g; // regex for format [number] [anyword] [any word or words]
  mainRegexPattern2 = /(\w+ \w+ [\w\s]+)/g; //regex for format [anyword] [anyword] [anyword]
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

  extractExpenseInformation = expense => {
    var amount = expense.match(/\d+/g)[0];

    var words = expense.match(/[A-Za-z'"\?!@%\$\+\-\=]+/g);
    var item = "";
    var excludeWordsPattern = ["for", "in"];
    words.forEach(element => {
      if (!excludeWordsPattern.includes(element)) {
        item += element + " ";
      }
    });
    item = item.trim();
    console.log(item, amount);
    return { item, amount };
  };
}
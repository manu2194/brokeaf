export default class ExpenseSortingMethods {
  /**
   * Function to sort objects in an array by their 'date' property.
   * @param {Array} Array expenses
   * @returns {Array} Array of sorted objects
   */
  sortByDate = expenses => {
    expenses.sort((a, b) => {
      var dateA = new Date(a.date);
      var dateB = new Date(b.date);
      return dateB - dateA;
    });
    return expenses;
  };
  /**
   * @param {xs} Array
   * @param {f} Element
   */
  groupBy = (xs, f) => {
    return xs.reduce(
      (r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r),
      {}
    );
  };

  /**
   * Group expenses by their date property.
   * @param {Array}
   */
  groupByDate = expenses => {
    var grouped = this.groupBy(expenses, expense =>
      new Date(expense.date).toLocaleDateString()
    );
    return grouped;
  };
}

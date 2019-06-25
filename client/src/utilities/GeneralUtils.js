/**
 * Class to access general utility functions
 */
export default class GeneralUtils {
  /**
   * Returns the argument number in a pretty 'thousand-seperated' format
   * @param {number|string} number Number can be string or a number with/without commas and decimal points
   * @callback (err,result) : Returns error(if any) and result in a callback function
   * @example prettyNumber('45000') = '45,000'.
   * @example prettyNumber(900000) = '900,000'.
   */
  prettyNumber = number => {
    if (typeof number === "string") {
      number = number.replace(/,/g, "");
      var floatString = parseFloat(number);
      if (isNaN(floatString)) {
        return "NaN";
      }
      return floatString.toLocaleString(undefined, {
        minimumFractionDigits: 2
      });
    } else if (typeof number === "number") {
      return number.toLocaleString(undefined, { minimumFractionDigits: 2 });
    } else {
      throw new Error("Argument is not a number or a string");
    }
  };
  snackBar = () => {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");

    // Add the "show" class to DIV
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function() {
      x.className = x.className.replace("show", "");
    }, 2000);
  };
  /**
   * Checks whether the number is a float value or not.
   * @param {any} string
   * @returns {boolean}
   */
  isAFloat = string => {
    if (typeof string === "number") {
      return true;
    }
    var firstTest = parseFloat(string);
    if (isNaN(firstTest)) {
      return false;
    } else {
      return true;
    }
  };
  /**
   * Returns greeting based on current time.
   */
  getGreeting = () => {
    var today = new Date();
    var curHr = today.getHours();

    if (curHr < 12) {
      return "Good Morning";
    } else if (curHr < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };
  /**
   * Returns month string from given date number
   * @param {number} number Indexing starts from 0. Therefore, number=0 returns "January"
   */
  monthString = number => {
    switch (number) {
      case 0:
        return "January";

      case 1:
        return "February";

      case 2:
        return "March";

      case 3:
        return "April";

      case 4:
        return "May";

      case 5:
        return "June";

      case 6:
        return "July";

      case 7:
        return "August";

      case 8:
        return "September";

      case 9:
        return "October";

      case 10:
        return "November";

      case 11:
        return "December";
    }
  };
}

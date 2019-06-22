import { type } from "os";
import { parse } from "path";

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
  prettyNumber = (number, callback) => {
    if (typeof number === "string") {
      number = number.replace(/,/g, "");
      var floatString = parseFloat(number);
      if (isNaN(floatString)) {
        callback(
          new Error("Argument is a string but contains non-number values")
        );
      }
      return floatString.toLocaleString(undefined, {
        minimumFractionDigits: 2
      });
    } else if (typeof number === "number") {
      return number.toLocaleString(undefined, { minimumFractionDigits: 2 });
    } else {
      callback(new Error("Argument is not a number or a string"));
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
        break;
      case 1:
        return "February";
        break;
      case 2:
        return "March";
        break;
      case 3:
        return "April";
        break;
      case 4:
        return "May";
        break;
      case 5:
        return "June";
        break;
      case 6:
        return "July";
        break;
      case 7:
        return "August";
        break;
      case 8:
        return "September";
        break;
      case 9:
        return "October";
        break;
      case 10:
        return "November";
        break;
      case 11:
        return "December";
        break;
    }
  };
}

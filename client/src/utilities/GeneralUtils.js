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
}

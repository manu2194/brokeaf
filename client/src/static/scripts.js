/**
 * Perform real-time CSS style editing of the input text. Changes invalid inputs into red color, and valid inputs as white
 * @param {*} event
 */
export var realTimeEditing = event => {
  var target = event.target;
  var id = target.id;
  var value = target.value;
  const re = /(\d+ \w+ \w+)+/;
  var isMatch = regExpMatch(re, value);
  var expenseField = document.getElementById(id);
  if (!isMatch) {
    expenseField.classList.remove("text-light", "font-weight-bold");
    expenseField.classList.add("text-danger");
  } else {
    expenseField.classList.remove("text-danger");
    expenseField.classList.add("text-light", "font-weight-bold");
  }
};

/**
 *Check if each of the elements of the array formed by splitting the given value by a comma matches with the given regular expression
 * @param {Object} regExp
 * @param {string} value
 */
var regExpMatch = (regExp, value) => {
  var valueArray = value.split(",");

  valueArray.map((element, index) => {
    valueArray[index] = element.trim();
  });

  var tof = true;
  valueArray.forEach(element => {
    tof = tof && regExp.test(element);
  });
  return tof;
};

/**
 * Snackbar timeout function
 */
export function snackBar() {
  // Get the snackbar DIV
  var x = document.getElementById("snackbar");

  // Add the "show" class to DIV
  x.className = "show";

  // After 3 seconds, remove the show class from DIV
  setTimeout(function() {
    x.className = x.className.replace("show", "");
  }, 2000);
}

export function getGreeting() {
  var today = new Date();
  var curHr = today.getHours();

  if (curHr < 12) {
    return "Good Morning";
  } else if (curHr < 18) {
    return "Good Afternoon";
  } else {
    return "Good Evening";
  }
}

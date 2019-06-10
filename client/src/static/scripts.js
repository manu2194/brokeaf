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

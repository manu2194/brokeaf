import React, { Component } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Collapse,
  ListGroup,
  ListGroupItem,
  Badge
} from "reactstrap";
import ExpenseSortingMethods from "../utilities/ExpenseSortingMethods";
import GeneralUtils from "../utilities/GeneralUtils";

/**
 * Remove button component.
 * @param {*Object} Object should have key id.
 * @param {*Object} Object of the class that calls this function
 */
function removeButton(expense, object) {
  return (
    <Button
      id={`delete-expense-${expense._id}`}
      type="button"
      className="rounded-circle border-0"
      color="outline-danger"
      size="md"
      onClick={() => object.removeExpenseHandler(expense._id)}
    >
      &times;
    </Button>
  );
}

class ExpenseTable extends Component {
  state = {
    expenses: [],
    groupedExpenses: [],
    collapse: [],
    
  };
  GU = new GeneralUtils();
  /**
   *Initializes the Collapse array in the Component state with the first element as true, and rest false
   * @param {number} length
   */
  initializeTogglerArray(length) {
    let collapse = new Array(length).fill(false);
    if (collapse.length > 0) {
      collapse[0] = true;
      this.setState({ collapse });
    }
  }
  /**
   * Toggles the collapse array in the Component State at that index which is equal to the id of the target of the event
   * @param {event} event
   */
  toggle = event => {
    event.preventDefault();
    var index = parseInt(event.target.id);
    let collapse = [...this.state.collapse];
    collapse[index] = !this.state.collapse[index];
    this.setState({ collapse });
  };
  /**
   *Groups expenses by their dates. Returns object with keys as dates, and values as arrays with expenses.
   * @param {array} expenses
   * @returns {object}
   */
  sortExpenses(expenses) {
    const ESM = new ExpenseSortingMethods();
    var groupedExpenses = ESM.groupByDate(expenses);

    return groupedExpenses;
  }

  componentDidMount() {
    var propsExpenses = this.props.expenses;
    propsExpenses.sort(function(a, b) {
      var dateA = new Date(a.date);
      var dateB = new Date(b.date);
      return dateB - dateA;
    });
    var groupedExpenses = this.sortExpenses(propsExpenses);
    this.setState({ expenses: propsExpenses });
    this.setState({ groupedExpenses });

    var len = Object.keys(groupedExpenses).length;
    this.initializeTogglerArray(len);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.expenses !== this.props.expenses) {
      this.componentDidMount();
    }
  }
  /**
   * Handler method to call the parent Component's removeExpense function to ultimately remove the component with the given id
   * @param {number} id
   */
  removeExpenseHandler = id => {
    this.setState({
      expenses: this.state.expenses.filter(expense => expense._id !== id)
    });
    this.props.removeExpense(id);
  };

  render() {
    const GU = new GeneralUtils();

    return (
      <Card className={this.props.className}>
        <CardHeader className="shadow">
          <Badge
            color={this.totalExpenseBadgeColor(this.props.expenses)}
            className="p-2 shadow-sm"
            pill
          >
            {this.GU.monthString(new Date().getMonth())}'s Expenses:{" "}
            <span>
              $
              {this.GU.prettyNumber(
                this.calculateThisMonthExpenses(this.props.expenses)
              )}
            </span>
          </Badge>
        </CardHeader>
        <CardBody
          style={{ height: this.props.height }}
          className="p-0 m-0 pre-scrollable"
        >
          <div id="expense-table">
            {Object.keys(this.state.groupedExpenses).map((date, index) => (
              <React.Fragment key={date}>
                <div color="border-0" className="m-2">
                  <div className="bg-none pt-2 pb-2 ml-2">
                    <h3
                      id={index}
                      className="text-custom"
                      size="lg"
                      style={{ cursor: "pointer" }}
                      onClick={this.toggle}
                    >
                      {new Date(date).toDateString()}
                    </h3>
                  </div>

                  <Collapse isOpen={this.state.collapse[index]}>
                    <ListGroup className="mb-2 ml-4" flush>
                      {this.state.groupedExpenses[date].map(expense => (
                        <ListGroupItem
                          key={expense._id}
                          id={"expense-item-" + expense._id}
                          className="expense-list-item flex-column align-items-start"
                        >
                          <div className="d-flex w-100 justify-content-between">
                            <small
                              className="p-0 m-0"
                              style={{
                                fontSize: "12px",
                                textTransform: "capitalize"
                              }}
                            >
                              {expense.item}
                            </small>

                            {removeButton(expense, this)}
                          </div>

                          <h4 className="expense-amount mb-1">
                            ${GU.prettyNumber(expense.amount)}
                          </h4>
                        </ListGroupItem>
                      ))}
                    </ListGroup>
                  </Collapse>
                </div>
                <hr style={{ border: "1px dotted rgba(0,0,0,0.2)" }} />
              </React.Fragment>
            ))}
          </div>
        </CardBody>
      </Card>
    );
  }
  /**
   * Method to change the background color of the badge displaying the current month's expenses.
   * @param {array} expenseArray
   */
  totalExpenseBadgeColor = expenseArray => {
    if (expenseArray.length === 0) {
      return "warning";
    } else {
      return "dark";
    }
  };
  /**
   * Calculates and returns the total expenses made in the current month
   * @param {array} expenseArray An array with expenses, with each element being an object that has the date property
   */
  calculateThisMonthExpenses = expenseArray => {
    var currentMonth = new Date(Date.now()).getMonth();
    var thisMonthExpenes = expenseArray.filter(
      expense => new Date(expense.date).getMonth() === currentMonth
    );
    var sum = 0;
    thisMonthExpenes.map(element => {
      sum = sum + parseFloat(element.amount);
    });
    return sum;
  };
}
export default ExpenseTable;

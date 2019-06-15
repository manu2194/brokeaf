import React, { Component } from "react";
import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Button,
  UncontrolledTooltip,
  Table
} from "reactstrap";
/**
 * Function Component for Tooltip. Add it to the parent class of the component for which you need a tooltip.
 * @param {*Object} Object of the class that calls this function
 */
function removeExpenseToolTip(expense) {
  return (
    <UncontrolledTooltip
      size="sm"
      placement="bottom"
      target={`delete-expense-${expense._id}`}
    >
      Delete {expense.item}
    </UncontrolledTooltip>
  );
}

/**
 * Remove button component.
 * @param {*Object} Object should have key id.
 * @param {*Object} Object of the class that calls this function
 */
function removeButton(expense, object) {
  return (
    <Button
      id={`delete-expense-${expense._id}`}
      className="rounded-circle"
      color="outline-danger"
      type="button"
      size="sm"
      onClick={() => object.props.removeExpense(expense._id)}
    >
      &times;
    </Button>
  );
}

/**
 * Expense Table Component. Displays expenses in a <table> format.
 */
class ExpenseTable extends Component {
  state = {
    isEmpty: this.props.state.expenses.length === 0
  };

  dateFormat = date => new Date(date).toLocaleString();
  render() {
    const { expenses } = this.props.state;
    return (
      <Table dark responsive>
        <thead className="border-0 shadow-lg bg-warning text-dark">
          <tr>
            <th style={{ width: "10%" }}> </th>
            <th style={{ width: "30%" }}>Expense</th>
            <th style={{ width: "30%" }}>Amount</th>
            <th style={{ width: "30%" }}>Date</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(expense => (
            <tr key={expense.id}>
              <th scope="row">
                {removeButton(expense, this)}
                {removeExpenseToolTip(expense)}
              </th>
              <td>{expense.item}</td>
              <td>{expense.amount}</td>
              <td>{this.dateFormat(expense.date)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}

export default ExpenseTable;

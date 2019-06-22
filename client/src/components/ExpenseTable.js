import React, { Component } from "react";
import {
  Button,
  Card,
  UncontrolledCollapse,
  ListGroup,
  ListGroupItem
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
function dateFormat(date) {
  return new Date(date).toLocaleString();
}

function dateSort(expenses) {
  console.log(expenses);
  expenses.sort(function(a, b) {
    return a.date > b.date;
  });
  console.log(expenses);
  return expenses;
}

class ExpenseTable extends Component {
  state = {
    expenses: [],
    groupedExpenses: []
  };

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
    this.setState({ expenses: propsExpenses });
    this.setState({ groupedExpenses: this.sortExpenses(propsExpenses) });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.expenses !== this.props.expenses) {
      this.componentDidMount();
    }
  }

  removeExpenseHandler = id => {
    this.setState({
      expenses: this.state.expenses.filter(expense => expense._id != id)
    });
    this.props.removeExpense(id);
  };

  render() {
    const GU = new GeneralUtils();
    const { expenses } = this.state;
    return (
      <div id="expense-table">
        {Object.keys(this.state.groupedExpenses).map((date, index) => (
          <React.Fragment key={date}>
            <div color="border-0" className="m-2">
              <div className="bg-none pt-2 pb-2 ml-2">
                <a
                  style={{ cursor: "pointer", fontSize: "22px" }}
                  className="text-dark"
                  id={"toggler-" + index}
                  size="lg"
                >
                  {new Date(date).toDateString()}
                </a>
              </div>
              {/* <UncontrolledCollapse
                id={index + "-toggler"}
                toggler={"#toggler-" + index}
                clas
              > */}
              <ListGroup className="mb-2 ml-4" flush>
                {this.state.groupedExpenses[date].map(expense => (
                  <ListGroupItem
                    key={expense._id}
                    id={"expense-item-" + expense._id}
                    className="expense-list-item flex-column align-items-start"
                  >
                    <div className="d-flex w-100 justify-content-between">
                      <small style={{ textTransform: "capitalize" }}>
                        {expense.item}
                      </small>
                      <small>{removeButton(expense, this)}</small>
                    </div>

                    <h3 className="expense-amount mb-1">
                      ${GU.prettyNumber(expense.amount)}
                    </h3>
                  </ListGroupItem>
                ))}
              </ListGroup>
              {/* </UncontrolledCollapse> */}
            </div>
          </React.Fragment>
        ))}
      </div>
    );
  }
}
export default ExpenseTable;

// class ExpenseTable2 extends Component {
//   render() {
//     const { expenses } = this.props.state;

//     return (
//       <Table size="sm" id="expense-table" dark responsive hover>
//         <thead className="border-0 shadow-lg bg-warning text-dark">
//           <tr>
//             <th style={{ width: "4%" }}> </th>
//             <th style={{ width: "32%" }}>Expense</th>
//             <th style={{ width: "32%" }}>Amount</th>
//             <th style={{ width: "32%" }}>Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {expenses.map(expense => (
//             <tr key={expense._id}>
//               <th scope="row">{removeButton(expense, this)}</th>
//               <td>{expense.item}</td>
//               <td>$ {expense.amount}</td>
//               <td>{dateFormat(expense.date)}</td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     );
//   }
// }

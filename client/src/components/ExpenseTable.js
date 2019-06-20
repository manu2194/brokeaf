import React, { Component } from "react";
import {
  Button,
  Card,
  UncontrolledCollapse,
  ListGroup,
  ListGroupItem
} from "reactstrap";
import ExpensSortingMethods from "../utilities/ExpenseSortingMethods";

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
      className="rounded"
      color="outline-danger"
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
    const ESM = new ExpensSortingMethods();
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
    const { expenses } = this.state;
    return (
      <div id="expense-table">
        {Object.keys(this.state.groupedExpenses).map((date, index) => (
          <React.Fragment key={date}>
            <Card color="dark border-0" className="m-2">
              <div className="bg-none pt-2 pb-2 ml-2">
                <a
                  style={{ cursor: "pointer", fontSize: "22px" }}
                  className="text-warning"
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
                    className="expense-list-item bg-none flex-column align-items-start"
                  >
                    <div className="d-flex w-100 justify-content-between">
                      <h6 className="font-weight-bold">{expense.item}</h6>
                      <small>{removeButton(expense, this)}</small>
                    </div>

                    <p className="expense-amount mb-1">${expense.amount}</p>
                  </ListGroupItem>
                ))}
              </ListGroup>
              {/* </UncontrolledCollapse> */}
            </Card>
            <hr />
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

import React, { Component } from "react";
import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Button,
  UncontrolledTooltip
} from "reactstrap";

class ExpenseTable extends Component {
  state = {
    isEmpty: this.props.state.expenses.length === 0
  };

  bootstrapColorClass = () => {
    if (this.props.color) {
      return this.props.color;
    } else {
      return "light";
    }
  };

  generateBootstrapClass = () => {
    const backgroundColor = this.bootstrapColorClass();
    var textColor;
    if (backgroundColor === "light") {
      textColor = "dark";
    } else if (backgroundColor === "dark") {
      textColor = "light";
    } else {
      textColor = "light";
    }

    return `bg-${backgroundColor} text-${textColor}`;
  };
  render() {
    const { isEmpty } = this.state.isEmpty;
    return (
      <ListGroup>
        <ListGroupItem className="bg-warning text-dark rounded font-weight-bold">
          <Row>
            <Col className="p-0" xs="1" />
            <Col className="p-0" xs="5">
              Items
            </Col>
            <Col className="p-0" xs="3">
              Amount
            </Col>
            <Col className="p-0" xs="3">
              Date
            </Col>
          </Row>
        </ListGroupItem>
        {this.props.state.expenses.map(expense => (
          <ListGroupItem
            key={expense._id}
            className={this.generateBootstrapClass() + "pt-2 pb-2"}
          >
            <Row>
              <Col xs="1">
                <Button
                  id={`delete-expense-${expense._id}`}
                  className="rounded-circle"
                  color="outline-danger"
                  type="button"
                  size="sm"
                  onClick={() => this.props.removeExpense(expense._id)}
                >
                  &times;
                </Button>
                <UncontrolledTooltip
                  size="sm"
                  placement="bottom"
                  target={`delete-expense-${expense._id}`}
                >
                  Delete {expense.item}
                </UncontrolledTooltip>
              </Col>
              <Col xs="5" className="p-0">
                {expense.item}
              </Col>
              <Col xs="3" className="p-0">
                $ {expense.amount}
              </Col>
              <Col xs="3" className="p-0">
                {new Date(expense.date).toLocaleString().split(",")[0]}
              </Col>
            </Row>
          </ListGroupItem>
        ))}
      </ListGroup>
    );
  }
}

export default ExpenseTable;

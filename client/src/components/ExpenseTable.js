import React, { Component } from "react";
import { ListGroup, ListGroupItem, Row, Col, Button } from "reactstrap";

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
    if (backgroundColor == "light") {
      textColor = "dark";
    } else if (backgroundColor == "dark") {
      textColor = "light";
    } else {
      textColor = "light";
    }

    return `bg-${backgroundColor} text-${textColor}`;
  };
  render() {
    const { isEmpty } = this.state.isEmpty;
    return (
      <ListGroup flush>
        <ListGroupItem className="bg-warning text-dark rounded font-weight-bold">
          <Row>
            <Col md="1" />
            <Col md="5">Items</Col>
            <Col md="3">Amount</Col>
            <Col md="3">Date</Col>
          </Row>
        </ListGroupItem>
        {this.props.state.expenses.map(expense => (
          <ListGroupItem
            key={expense._id}
            className={this.generateBootstrapClass() + "pt-2 pb-2"}
          >
            <Row>
              <Col md="1">
                <Button
                  className="remove-button rounded-circle"
                  type="button"
                  size="sm"
                  onClick={() => this.props.removeExpense(expense._id)}
                >
                  &times;
                </Button>
              </Col>
              <Col md="5">{expense.item}</Col>
              <Col md="3">$ {expense.amount}</Col>
              <Col md="3">{expense.date}</Col>
            </Row>
          </ListGroupItem>
        ))}
      </ListGroup>
    );
  }
}

export default ExpenseTable;

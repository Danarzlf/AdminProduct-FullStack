import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ExpenseItem from "./ExpenseItem";
import "./ExpensesList.css";

const ExpensesList = (props) => {
  console.log(props.items);
  if (props.items.length === 0) {
    return <h2 className="expenses-list__fallback">Found no expenses.</h2>;
  }

  return (
    <div className="container">
      <Row>
        {props.items.map((expense) => (
          <Col key={expense.id} md={4}>
            <Card className="mb-4">
              <Card.Body>
                <ExpenseItem
                  id={expense.id}
                  title={expense.name}
                  amount={expense.price}
                  description={expense.description}
                  dateee={expense.date}
                  date={expense.createdAt}
                  datee={expense.updatedAt}
                  image={expense.image}
                  stock={expense.stock}
                />
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ExpensesList;

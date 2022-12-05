import React, { useEffect, useContext, useState } from "react";
import Card from "react-bootstrap/Card";
import { Row, ListGroup, Dropdown, Col, Spinner, Alert } from "react-bootstrap";
// import Table from "react-bootstrap/Table";
import { Bar } from "react-chartjs-2";
import { getUserData } from "../api/UserApi";
// eslint-disable-next-line
import { Chart as ChartJS } from "chart.js/auto";
import { UserContext } from "../contexts/UserContext";
import { DataSimplifier } from "../services/DataModifier";

const Dashboard = () => {
  const { user, setUser } = useContext(UserContext);
  const [toggleYear, setToggleYear] = useState(new Date().getUTCFullYear());
  const [toggleMonth, setToggleMonth] = useState(new Date().getUTCMonth());
  const [simplifiedData, setSimplifiedData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      let user = await getUserData();
      let res = DataSimplifier(user.Id, user.accounts, user.categories, user.transactions);
      setSimplifiedData(res);
      setUser(user);
    };
    getData();
    // eslint-disable-next-line
  }, []);

  let expenseData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let incomeData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let years = [];

  if (user) {
    for (let i = 0; i < simplifiedData.length; i++) {
      let getTimeStamp = simplifiedData[i].transactionDate;
      let date = new Date(getTimeStamp);
      let month = date.getUTCMonth();
      let year = date.getUTCFullYear();

      if (!years.includes(year)) {
        years.push(year);
      }

      if (simplifiedData[i].categoryType === 2) {
        expenseData[month] += simplifiedData[i].transactionAmount;
      }
      if (simplifiedData[i].categoryType === 1) {
        incomeData[month] += simplifiedData[i].transactionAmount;
      }
    }
  }

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // const monthnumbers = months.map((month) => {
  //   return months.indexOf(month);
  // });

  function setYearValue(y) {
    setToggleYear(y);
  }

  function setMonthValue(m) {
    setToggleMonth(m);
  }

  function getIncome() {
    let total = 0;
    for (let i = 0; i < simplifiedData.length; i++) {
      let getTimeStamp = simplifiedData[i].transactionDate;
      let date = new Date(getTimeStamp);
      let month = date.getUTCMonth();
      let year = date.getUTCFullYear();
      if (
        simplifiedData[i].categoryType === 1 &&
        // eslint-disable-next-line
        year == toggleYear &&
        // eslint-disable-next-line
        month == toggleMonth
      ) {
        total += simplifiedData[i].transactionAmount;
      }
    }
    return total;
  }
  function getExpenses() {
    let total = 0;
    for (let i = 0; i < simplifiedData.length; i++) {
      let getTimeStamp = simplifiedData[i].transactionDate;
      let date = new Date(getTimeStamp);
      let month = date.getUTCMonth();
      let year = date.getUTCFullYear();
      if (
        simplifiedData[i].categoryType === 2 &&
        // eslint-disable-next-line
        year == toggleYear &&
        // eslint-disable-next-line
        month == toggleMonth
      ) {
        total += simplifiedData[i].transactionAmount;
      }
    }
    return total;
  }

  const expense = {
    label: "Expenses",
    data: expenseData,
    backgroundColor: "rgba(255, 99, 132, 0.4)",
    borderColor: "rgba(255, 99, 132, 1)",
    borderWidth: 1,
  };

  const income = {
    label: "Income",
    data: incomeData,
    backgroundColor: "rgba(75, 192, 192, 0.4)",
    borderColor: "rgba(75, 192, 192, 1)",
    borderWidth: 1,
  };

  const barData = {
    labels: months,
    datasets: [expense, income],
  };

  if (user == null) {
    return <Spinner animation="border" role="status" style={{
      marginTop: "10%",
      marginLeft: "5%",
    }}>
      <span className="visually-hidden">Loading...</span>
    </Spinner>;
  }

  return (
    <>
    {(user.accounts.length == 0 ? true : user.categories.length == 0 ? true : user.transactions.length == 0 ? true : false)
      && <div sm={11} style={{
          marginTop: "10%",
          marginLeft: "5%",
          marginRight: "5%",
      }}>
        <Col>
          <h1>Welcome {user.UserName ? user.UserName : "Guest"}</h1>{" "}
        </Col>
          <Alert variant="danger">Please make sure to have atleast one account, category and transaction to view data on this page.</Alert>
      </div>
    }
    { (user.accounts.length == 0 ? false : user.categories.length == 0 ? false : user.transactions.length == 0 ? false : true) 
    && < div >
      <Row
        style={{
          marginTop: "10%",
          marginLeft: "5%",
        }}
      >
        <Col>
          <h1>Welcome {user.UserName ? user.UserName : "Guest"}</h1>{" "}
        </Col>
        <Col></Col>
        <Col>
          <Row>
            <Dropdown onSelect={setYearValue}>
              <Dropdown.Toggle className="dropdown" id="dropdown-basic">
                {toggleYear ?? "Choose Year"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {years.map((year) => (
                  <Dropdown.Item eventKey={year}>{year}</Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown style={{ marginLeft: "5%" }} onSelect={setMonthValue}>
              <Dropdown.Toggle className="dropdown">
                {toggleMonth == null ? "Choose Month" : months[toggleMonth]}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {months.map((month) => (
                  <Dropdown.Item eventKey={months.indexOf(month)}>
                    {month}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col className="toprow">
          <Card style={{ alignItems: "center" }}>
            <Card.Body>
              <Card.Title
                className="mb-2 text-success"
                style={{ fontSize: "80%" }}
              >
                Income
              </Card.Title>
              <Card.Text className="mb-2 text-success">
                $ {getIncome()}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col
          className="toprow"
          style={{
            marginRight: "5%",
          }}
        >
          <Card style={{ alignItems: "center" }}>
            <Card.Body>
              <Card.Title
                className="mb-2 text-danger"
                style={{ fontSize: "80%" }}
              >
                Expense
              </Card.Title>
              <Card.Text className="mb-2 text-danger">
                $ {getExpenses()}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col className="bottomrow">
          <Card>
            <Card.Body>
              <Card.Title>Year {toggleYear}</Card.Title>
              <Bar data={barData} height={400} width={600} />
            </Card.Body>
          </Card>
        </Col>
        <Col
          className="bottomrow"
          style={{
            marginRight: "5%",
          }}
        >
          <Card style={{maxHeight:"580px"}}>
            <Card.Title
              style={{
                marginTop: "5%",
                marginLeft: "5%",
                fontSize: "450%",
              }}
            >
              Recent Activity
            </Card.Title>
            <Card.Body style={{ overflowY: "scroll" }}>
              <ListGroup variant="flush" style={{ fontSize: "250%" }}>
                {simplifiedData.map(transaction => (
                  <ListGroup.Item variant={transaction.categoryType === 1 ? "success" : "danger"}>
                    <Col> {transaction.transactionName} : $ {transaction.transactionAmount}</Col>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div >
    }
    </>
  );
};

export default Dashboard;

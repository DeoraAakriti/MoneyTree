import React, { useEffect, useContext, useState } from "react";
import Card from "react-bootstrap/Card";
import { Row, Dropdown, Col, Form, Button, Spinner, Modal, Alert } from "react-bootstrap";

import Table from "react-bootstrap/Table";
import { Doughnut } from "react-chartjs-2";
import { createCategory, deleteCategory, getUserData } from "../api/UserApi";
import { UserContext } from "../contexts/UserContext";
import { DataSimplifier, GroupByCategory } from "../services/DataModifier";

const Categories = () => {
  const { user, setUser } = useContext(UserContext);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [toggleYear, setToggleYear] = useState(null);
  const [toggleMonth, setToggleMonth] = useState(null);
  const [toggleCategory, setToggleCategory] = useState(null);
  const [categoryList, setCategoryList] = useState(null);
  const [formCategoryName, setFormCategoryName] = useState(null);
  const [formCategoryType, setFormCategoryType] = useState(null);
  const [formCategoryBudget, setFormCategoryBudget] = useState(null);
  const [simplifiedData, setSimplifiedData] = useState(null);
  const [groupByCategory, setGroupByCategory] = useState(null);
  const [transactionDisplay, setTransactionDisplay] = useState(null);
  const [addCategory, setAddCategory] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [yearList, setYearList] = useState(null);

  const [doughnutData, setDoughnutData] = useState(null);


  const handleClose = () => { setAddCategory(false); setFormCategoryBudget(null); setFormCategoryName(null); setFormCategoryType(null) };
  const handleShow = () => setAddCategory(true);
  const deleteClose = () => { setDeleteId(null) };

  const submitForm = async () => {
    const formData = {
      name: formCategoryName,
      type: formCategoryType,
      budget: formCategoryBudget
    }
    setPageLoaded(false);
    const response = await createCategory(formData);
    handleClose();
  }

  const deleteCat = async () => {
    const response = await deleteCategory(deleteId.id);
    setDeleteId(null);
    setPageLoaded(false);
  }

  useEffect(() => {
    const getData = async () => {
      const user = await getUserData();
      let res = DataSimplifier(user.Id, user.accounts, user.categories, user.transactions);
      let response = GroupByCategory(user.categories, res);
      let years = res.map(item => new Date(item.transactionDate).getFullYear());
      years = [... new Set(years)];
      setUser(user);
      setCategoryList(Object.keys(response))
      setSimplifiedData(res);
      setGroupByCategory(response);
      setDoughnutData(createDoughnutData(response));
      setTransactionDisplay(res);
      setYearList(years)
      setPageLoaded(true);
    };
    getData();
  }, [pageLoaded]);

  function loadTransactionTableData(category, year, month) {
    var res = (simplifiedData ?? []).filter(item => checkFilter(category, year, month, item));
    setTransactionDisplay(res);
    setDoughnutData(createDoughnutData(GroupByCategory(user.categories, res)));
  }

  function checkFilter(categoryFilter, yearFilter, monthFilter, item) {
    var year = new Date(item.transactionDate).getUTCFullYear();
    var month = new Date(item.transactionDate).getUTCMonth();
    return (categoryFilter == null ? true : item.categoryName == categoryFilter) && (yearFilter == null ? true : year == yearFilter) && (monthFilter == null ? true : month == monthFilter)
  }

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  function setYearValue(y) {
    setToggleYear(y);
    loadTransactionTableData(toggleCategory, y, toggleMonth);
  }

  function setMonthValue(m) {
    setToggleMonth(months.indexOf(m));
    loadTransactionTableData(toggleCategory, toggleYear, months.indexOf(m));
  }

  function setCategoryName(c) {
    setToggleCategory(c);
    loadTransactionTableData(c, toggleYear, toggleMonth);
  }

  function setCategoryType(ct) {
    setFormCategoryType(ct);
    if (ct != 2) { setFormCategoryBudget(null) }
  }

  function createDoughnutData(data) {
    return {
      labels: Object.keys(data),
      datasets: [
        {
          data: Object.keys(data).map(entry => data[entry].reduce((sum, item) => sum + item.transactionAmount, 0)),
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
          ],
          borderWidth: 1,
          cutout: "50%",
          circumference: 180,
          rotation: 270,
        },
      ],
    };
  }


  if (pageLoaded == false) {
    return <Spinner animation="border" role="status" style={{
      marginTop: "10%",
      marginLeft: "5%",
    }}>
      <span className="visually-hidden">Loading...</span>
    </Spinner>;
  }

  return (
    <>
      <Row
        style={{
          marginTop: "10%",
          marginLeft: "5%",
        }}
      >
        {(user.categories.length == 0 ? true : false) && <Col sm={11} style={{
          marginRight: "5%",
        }}>
          <Alert variant="danger">Please add a category to get started.</Alert>
        </Col>
        }
        {(user.categories.length == 0 ? false : true) && <Row>
          <Dropdown onSelect={setCategoryName} >
            <Dropdown.Toggle className="dropdown" id="dropdown-basic">
              {toggleCategory ?? 'Choose Category'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {categoryList.map(category => (
                <Dropdown.Item eventKey={category}>{category}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown onSelect={setYearValue}>
            <Dropdown.Toggle className="dropdown" id="dropdown-basic">
              {toggleYear ?? "Choose Year"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {yearList.map((year) => (
                <Dropdown.Item eventKey={year}>{year}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown onSelect={setMonthValue}>
            <Dropdown.Toggle className="dropdown">
              {toggleMonth == null ? "Choose Month" : months[toggleMonth]}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {months.map((month) => (
                <Dropdown.Item eventKey={month}>
                  {month}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Row>
        }
        <Col>
          <Button onClick={handleShow}>
            Add Category
          </Button>

          <Modal show={addCategory} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Create A New Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Category Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter category name" id="categoryName" onChange={e => setFormCategoryName(e.target.value)} />
                  <Form.Label>Select Category Type</Form.Label>
                  <Dropdown onSelect={setCategoryType} style={{ background: "#ffffff" }}>
                    <Dropdown.Toggle className="dropdown">
                      {formCategoryType == 1 ? "Income" : formCategoryType == 2 ? "Expense" : "Category Type"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item eventKey="1">Income</Dropdown.Item>
                      <Dropdown.Item eventKey="2">Expense</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  {formCategoryType == 2 && <Form.Label>Set Expense Category Budget</Form.Label>}
                  {formCategoryType == 2 && <Form.Control type="text" placeholder="Enter budget for Category" id="categoryName" onChange={e => setFormCategoryBudget(e.target.value)} />}
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={submitForm}
                disabled={(formCategoryName == null ? true : (formCategoryType == null ? true : (formCategoryType == 2 ? (formCategoryBudget == null ? true : false) : false)))}
              >
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
      {(user.categories.length == 0 ? false : true) && <div>
        <Row style={{ marginTop: "1%", marginLeft: "5%", marginRight: "5%" }}>
          <Col sm={6}>
            <Card>
              <Card.Body>
                <Doughnut
                  data={doughnutData}
                  options={{ aspectRatio: 2 }}
                  style={{ height: "10%" }}
                />
              </Card.Body>
            </Card>
          </Col>
          <Col sm={6}>
            <Table responsive striped bordered>
              <thead>
                <tr>
                  <th>Category Name</th>
                  <th>Category Type</th>
                  <th>Category Budget</th>
                  <th>Created At</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {user.categories.map(item => (
                  <tr>
                    <td>{item.Name}</td>
                    <td style={{ color: item.Type === 1 ? "rgba(50,205,50)" : "red" }}>{item.Type == 1 ? "Income" : "Expense"}</td>
                    <td>$ {item.Budget ?? 0}</td>
                    <td>{item.CreatedAt.split("T")[0]}</td>
                    <td><Button variant="danger" value={item.Name} id={item.Id} onClick={e => setDeleteId({ name: e.target.value, id: e.target.id })}>Delete</Button></td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {deleteId && <Modal show={deleteId} onHide={deleteClose}>
              <Modal.Header closeButton>
                <Modal.Title>Confirm Delete</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Are you sure you want to delete the category : {deleteId.name} ?<br></br>
                All transactions related to the category will be deleted as well.
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={deleteClose}>
                  Cancel
                </Button>
                <Button variant="danger" onClick={deleteCat}>
                  Confirm
                </Button>
              </Modal.Footer>
            </Modal>
            }
          </Col>
        </Row>
        {transactionDisplay && <Row style={{
          marginTop: "1%",
          marginLeft: "5%",
          width: "90%"
        }}>
          <Table responsive striped bordered>
            <thead>
              <tr>
                <th>Category Name</th>
                <th>Transaction Entry</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {transactionDisplay.map(item => (
                <tr>
                  <td>{item.categoryName}</td>
                  <td>{item.transactionName}</td>
                  <td style={{ color: item.categoryType === 1 ? "rgba(50,205,50)" : "red" }}>$ {item.transactionAmount}</td>
                  <td>{item.transactionDate.split("T")[0]}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Row>
        }
      </div>
      }
    </>
  );
};

export default Categories;

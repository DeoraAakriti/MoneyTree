import { AccountSummaryTable, DataSimplifier, GroupByAccount } from "../services/DataModifier";
import { useEffect, useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { Row, Dropdown, Col, Button, Modal, Form, Spinner, Alert } from "react-bootstrap";
import { getUserData, createAccount, deleteAccount } from "../api/UserApi";

const Account = () => {
    const { user, setUser } = useContext(UserContext)
    const [pageLoaded, setPageLoaded] = useState(false);
    const [summaryTableData, setSummaryTableData] = useState([]);
    const [toggleAccount, setToggleAccount] = useState(null);
    const [accountList, setAccountList] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [simplifiedData, setSimplifiedData] = useState(null);
    const [groupByAccount, setGroupByAccount] = useState(null);
    const [transactionDisplay, setTransactionDisplay] = useState(null);
    const [formData, setFormData] = useState(null);
    const [addAccount, setAddAccount] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const handleClose = () => { setAddAccount(false); setFormData(null) };
    const handleShow = () => setAddAccount(true);

    const deleteClose = () => { setDeleteId(null) };

    const onFormDataChange = e => {
        setFormData({
            name: e.target.value
        });
    }

    const submitForm = async () => {
        handleClose();
        setPageLoaded(false);
        const response = await createAccount(formData);
        setFormData(null)
    }
    useEffect(() => {
        const setData = async () => {
            const user = await getUserData();
            setUser(user);
            let res = DataSimplifier(user.Id, user.accounts, user.categories, user.transactions);
            let response = GroupByAccount(user.accounts, res);
            setAccountList(Object.keys(response));
            setSimplifiedData(res);
            setGroupByAccount(response)
            setSummaryTableData(AccountSummaryTable(user.accounts, response));
            setTransactionDisplay(res);
            setPageLoaded(true);
        }
        setData();
    }, [pageLoaded]);

    const deleteAcc = async () => {
        const response = await deleteAccount(deleteId.id);
        setDeleteId(null);
        setPageLoaded(false);
    }

    function setAccountValue(y) {
        setToggleAccount(y);
        setSelectedAccount(summaryTableData.find(entry => entry.accountName === y));
        setTransactionDisplay(simplifiedData.filter(item => item.accountName === y));
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
        <div>
            <Row style={{
                marginTop: "10%",
                marginLeft: "5%",
            }}>
                {(user.accounts.length == 0 ? true : false) && <Col sm={11} style={{
                    marginRight: "5%",
                }}>
                    <Alert variant="danger">Please add an account to get started.</Alert>
                </Col>
                }
                {user.accounts.length == 0 ? false : true && <Dropdown onSelect={setAccountValue} >
                    <Dropdown.Toggle className="dropdown" id="dropdown-basic">
                        {toggleAccount ?? 'Choose Account'}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {accountList.map(account => (
                            <Dropdown.Item eventKey={account}>{account}</Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
                }
                <Col>
                    <Button onClick={handleShow} id="addAccount">
                        Add Account
                    </Button>

                    <Modal show={addAccount} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Create A New Account</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onChange={onFormDataChange}>
                                <Form.Group className="mb-3" controlId="formAccountName">
                                    <Form.Label>Account Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter account name" id="accountname"/>
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="danger" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={submitForm}
                                disabled={formData == null ? true : false} id="submitaccount">
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Col>
            </Row>
            {(user.accounts.length == 0 ? false : true) && <div>
                <Row style={{ marginTop: "1%", marginLeft: "5%", marginRight: "5%" }}>
                    <CardGroup style={{ width: "100%" }}>
                        <Card bg="success" text="white" style={{ alignItems: "center" }}>
                            <Card.Header>Income Past 30 Days</Card.Header>
                            <Card.Title>$ {summaryTableData.reduce((sum, item) => sum + item.income30, 0)}</Card.Title>
                        </Card>
                        <Card bg="danger" text="white" style={{ alignItems: "center" }}>
                            <Card.Header>Expense Past 30 Days</Card.Header>
                            <Card.Title>$ {summaryTableData.reduce((sum, item) => sum + item.expense30, 0)} </Card.Title>
                        </Card>
                        <Card bg="success" text="white" style={{ alignItems: "center" }}>
                            <Card.Header>Income Past 60 Days</Card.Header>
                            <Card.Title>$ {summaryTableData.reduce((sum, item) => sum + item.income60, 0)} </Card.Title>
                        </Card>
                        <Card bg="danger" text="white" style={{ alignItems: "center" }}>
                            <Card.Header>Expense Past 60 Days</Card.Header>
                            <Card.Title>$ {summaryTableData.reduce((sum, item) => sum + item.expense60, 0)} </Card.Title>
                        </Card>
                        <Card bg="success" text="white" style={{ alignItems: "center" }}>
                            <Card.Header>Income Past 90 Days</Card.Header>
                            <Card.Title>$ {summaryTableData.reduce((sum, item) => sum + item.income90, 0)} </Card.Title>
                        </Card>
                        <Card bg="danger" text="white" style={{ alignItems: "center" }}>
                            <Card.Header>Expense Past 90 Days</Card.Header>
                            <Card.Title>$ {summaryTableData.reduce((sum, item) => sum + item.expense90, 0)} </Card.Title>
                        </Card>
                    </CardGroup>
                </Row>
                <Row style={{
                    marginTop: "1%",
                    marginLeft: "5%",
                    width: "90%"
                }}>
                    <Col sm={8}>
                        <Table responsive striped bordered>
                            <thead>
                                <tr>
                                    <th>Account Name</th>
                                    <th>Income Past 30 Days</th>
                                    <th>Expense Past 30 Days</th>
                                    <th>Income Past 60 Days</th>
                                    <th>Expense Past 60 Days</th>
                                    <th>Income Past 90 Days</th>
                                    <th>Expense Past 90 Days</th>
                                </tr>
                            </thead>
                            <tbody>
                                {summaryTableData.map(item => (
                                    <tr>
                                        <td>{item.accountName}</td>
                                        <td style={{ color: "rgba(50,205,50)" }}>$ {item.income30}</td>
                                        <td style={{ color: "red" }}>$ {item.expense30}</td>
                                        <td style={{ color: "rgba(50,205,50)" }}>$ {item.income60}</td>
                                        <td style={{ color: "red" }}>$ {item.expense60}</td>
                                        <td style={{ color: "rgba(50,205,50)" }}>$ {item.income90}</td>
                                        <td style={{ color: "red" }}>$ {item.expense90}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                    <Col sm={4}>
                        <Table responsive striped bordered>
                            <thead>
                                <tr>
                                    <th>Account Name</th>
                                    <th>Created At</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {user.accounts.map(item => (
                                    <tr>
                                        <td>{item.Name}</td>
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
                                Are you sure you want to delete the account : {deleteId.name} ? <br></br>
                                All transactions related to the account will be deleted as well.
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={deleteClose}>
                                    Cancel
                                </Button>
                                <Button variant="danger" onClick={deleteAcc} id="confirmdelete">
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
                                <th>Account Name</th>
                                <th>Transaction Entry</th>
                                <th>Amount</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactionDisplay.map(item => (
                                <tr>
                                    <td>{item.accountName}</td>
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
        </div >
    );
}

export default Account;
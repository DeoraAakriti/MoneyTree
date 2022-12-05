import { useContext } from "react";

const uri = "https://moneytreeapi.herokuapp.com/";
export const getUserData = async () => {
  var data = await fetch(
    uri + "users/" + localStorage.getItem("userid")
  )
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      return response[0];
    })
    .catch((err) => console.error(err));

  return data;
};

export const createUser = async (newUser) => {
  var data = fetch(uri + "users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  })
    .then((response) => response.json())
    .then((response) => {
      return response[0];
    })
    .catch((err) => console.error(err));

  return data;
};

export const createAccount = async (accountName) => {
  var data = fetch(
    uri + "users/" +
      localStorage.getItem("userid") +
      "/accounts",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(accountName),
    }
  )
    .then((response) => response.json())
    .then((response) => {
      return response[0];
    })
    .catch((err) => console.error(err));
  return data;
};

export const deleteAccount = async (accountId) => {
  var data = fetch(
    uri + "users/" +
      localStorage.getItem("userid") +
      "/accounts/" +
      accountId,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((response) => {
      return response[0];
    })
    .catch((err) => console.error(err));
  return data;
};

export const createCategory = async (category) => {
  var data = fetch(
    uri + "users/" +
      localStorage.getItem("userid") +
      "/categories",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    }
  )
    .then((response) => response.json())
    .then((response) => {
      return response[0];
    })
    .catch((err) => console.error(err));
  return data;
};

export const deleteCategory = async (categoryId) => {
  var data = fetch(
    uri + "users/" +
      localStorage.getItem("userid") +
      "/categories/" +
      categoryId,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((response) => {
      return response[0];
    })
    .catch((err) => console.error(err));
  return data;
};

export const createTransaction = async (transaction) => {
  var data = fetch(
    uri + "users/" +
      localStorage.getItem("userid") +
      "/transactions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transaction),
    }
  )
    .then((response) => response.json())
    .then((response) => {
      return response[0];
    })
    .catch((err) => console.error(err));
  return data;
};

export const deleteTreansaction = async (transactionId) => {
  var data = fetch(
    uri + "users/" +
      localStorage.getItem("userid") +
      "/transactions/" +
      transactionId,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((response) => {
      return response[0];
    })
    .catch((err) => console.error(err));
  return data;
};

export const getUserByuserName = async (user) => {
  var data = fetch(uri + "login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .then((response) => {
      return response[0];
    })
    .catch((err) => console.error(err));

  return data;
};

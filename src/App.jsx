import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
  LabelList ,
} from "recharts";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Balance from "./components/Balance";
import "./App.css";

const App = () => {
  const [expenses, setExpenses] = useState(
    JSON.parse(localStorage.getItem("expenses")) || [] );

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  // Function to add an expense
  const addExpense = (newExpense) => {
    const updatedExpenses = [...expenses, newExpense];
    setExpenses(updatedExpenses);
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
  };

  // Function to delete an expense
  const deleteExpense = (id) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(updatedExpenses);
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
  };

  // Group expenses by description and sum the amounts
  const groupedExpenses = expenses.reduce((acc, expense) => {
    const existingExpense = acc.find(
      (item) => item.name === expense.description
    );
    if (existingExpense) {
      existingExpense.value += expense.amount;
    } else {
      acc.push({ name: expense.description, value: expense.amount });
    }
    return acc;
  }, []);


  return (
    <div className="container">
      <h1>Expense Tracker</h1>
      <div className="main-layout">
        <div className="left-column">
          <div className="card">
            <h2>Balance</h2>
            <Balance expenses={expenses} /> {/* Pass expenses as a prop */}
          </div>

          <div className="card">
            <h2>Add Expense</h2>
            <ExpenseForm
              description={description}
              amount={amount}
              setDescription={setDescription}
              setAmount={setAmount}
              addExpense={addExpense}
            />
          </div>
        </div>

        {/* Right Column: Expense List */}
        <div className="right-column">
          <div className="card">
            <h2>Expense List</h2>
            <ExpenseList expenses={expenses} deleteExpense={deleteExpense} />
          </div>
        </div>
      </div>

      {/* Full-Width Chart */}
      <div className="card bar-chart">
        <h2>Expense Distribution</h2>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={groupedExpenses}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />

              <Tooltip />
              <Legend />

              <Bar dataKey="value" fill="#8884d8">
                <LabelList
                  dataKey="value"
                  position="top"
                  formatter={(value) => `₹${value}`}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default App;

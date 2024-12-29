import React, { useState } from "react";

function ExpenseForm({ addExpense }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
   
    if (!description || !amount) return;

    const newExpense = {
      id: Math.floor(Math.random() * 1000), 
      description,
      amount: parseFloat(amount),
    };

    addExpense(newExpense);
    setDescription("");
    setAmount("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
//e (event object) for managing the behavior of events in React
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button type="submit">Add Expense</button>
    </form>
  );
}

export default ExpenseForm;

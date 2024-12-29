import React from "react";

const ExpenseList = ({ expenses, deleteExpense }) => {
  // expenses: An array of expense objects.
  //  Each expense object contains details 
  // such as id, description, and amount
  return (
    <div>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            {expense.description}: ₹{expense.amount.toFixed(2)}{" "}
            {/* Display amount in ₹ */}
            <button onClick={() => deleteExpense(expense.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;

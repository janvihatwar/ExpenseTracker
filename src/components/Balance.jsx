import React from 'react';

const Balance = ({ expenses }) => {
  // Calculate the total balance based on the expenses array
  const totalBalance = expenses.reduce((acc, expense) => acc + expense.amount, 0);

  return (
    <div>
      <h2>Your Total Balance: ₹{totalBalance.toFixed(2)}</h2>
    </div>
  );
};

export default Balance;

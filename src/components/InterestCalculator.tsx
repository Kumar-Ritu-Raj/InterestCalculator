import React, { useState } from 'react';
import './InterestCalculator.css';

interface MonthData {
  month: number;
  interest: number;
  remaining: number;
  due: number;
}

export default function InterestCalculator() {
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('');
  const [monthlyReturn, setMonthlyReturn] = useState('');
  const [tableData, setTableData] = useState<MonthData[]>([]);

  const handleCalculation = () => {
    const numAmount = parseFloat(amount);
    const numRate = parseFloat(rate);
    const numMonthlyReturn = parseFloat(monthlyReturn);

    if (
      isNaN(numAmount) ||
      isNaN(numRate) ||
      isNaN(numMonthlyReturn) ||
      numAmount <= 0 ||
      numRate <= 0 ||
      numMonthlyReturn <= 0
    ) {
      alert('⚠️ Please enter valid positive numbers.\nकृपया मान्य सकारात्मक संख्या दर्ज करें।');
      return;
    }

    let currentAmount = numAmount;
    let months = 1;
    const maxMonths = 100;
    const monthlyData: MonthData[] = [];

    while (currentAmount > numMonthlyReturn + (numMonthlyReturn * numRate) / 100) {
      const interest = ((currentAmount - numMonthlyReturn) * numRate) / 100;
      currentAmount = currentAmount + interest - numMonthlyReturn;

      monthlyData.push({
        month: months,
        interest: parseFloat(interest.toFixed(2)),
        remaining: parseFloat(currentAmount.toFixed(2)),
        due: parseFloat(numMonthlyReturn.toFixed(2)),
      });

      months++;

      if (months >= maxMonths) {
        alert('⚠️ Please consider taking for fewer months.\nकृपया कम महीनों के लिए विचार करें।');
        setTableData([]);
        return;
      }
    }

    const finalInterest = (currentAmount * (numRate / 12)) / 100;

    monthlyData.push({
      month: months,
      interest: parseFloat(finalInterest.toFixed(2)),
      remaining: 0,
      due: parseFloat((finalInterest + currentAmount).toFixed(2)),
    });

    setTableData(monthlyData);
    setAmount('');
    setRate('');
    setMonthlyReturn('');
  };

  return (
    <main className="main-container">
      <h1 className="title">Interest Calculator</h1>
      <ul className="form-list">
        <li>
          <label className="label">Total Amount / कुल राशि:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="input"
            placeholder="Enter amount"
            min="0"
          />
        </li>
        <li>
          <label className="label">Interest Rate (%) / ब्याज दर:</label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className="input"
            placeholder="Enter interest rate"
            min="0"
          />
        </li>
        <li>
          <label className="label">Monthly Return / मासिक पुनर्भुगतान राशि:</label>
          <input
            type="number"
            value={monthlyReturn}
            onChange={(e) => setMonthlyReturn(e.target.value)}
            className="input"
            placeholder="Enter monthly return"
            min="0"
          />
        </li>
        <li className="button-center">
          <button onClick={handleCalculation} className="button">
            Calculate / गणना करें
          </button>
        </li>
      </ul>

      {tableData.length > 0 && (
        <>
          <div className="table-container">
            <h2 className="title">Monthly Breakdown / मासिक विवरण</h2>
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>Interest (₹)</th>
                    <th>Due (₹)</th>
                    <th>Remaining Amount (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map(({ month, interest, due, remaining }) => (
                    <tr key={month}>
                      <td className="text-center">{month}</td>
                      <td className="text-right">{interest}</td>
                      <td className="text-right">{due}</td>
                      <td className="text-right">{remaining}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="clear-button-wrapper">
            <button onClick={() => setTableData([])} className="clear-button">
              Clear Table / तालिका साफ करें
            </button>
          </div>
        </>
      )}
    </main>
  );
}

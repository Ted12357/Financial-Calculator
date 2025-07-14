import { useState, useEffect } from 'react';
import Header from './components/Header';
import InputForm from './components/InputForm';
import FilterPanel from './components/FilterPanel';
import TransactionsChart from './components/TransactionsChart';
import './styles/App.css';


export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const addTransaction = trx => {
    setTransactions(prev => [...prev, trx]);
  };

  useEffect(() => {
    setFiltered(transactions);
  }, [transactions]);

  return (
    <>
      <Header />

      <div className="app-container">
        <div className="sidebar left">
          <h2>Add Transaction</h2>
          <InputForm onAdd={addTransaction} />
        </div>
        <div className="sidebar right">
          <h2>Filter & Transactions</h2>
          <FilterPanel
            transactions={transactions}
            onFilter={setFiltered}
          />
        </div>
        <div className="content">
          <h2>Transaction History</h2>
          <TransactionsChart data={filtered} />
        </div>
      </div>
    </>
  );
}
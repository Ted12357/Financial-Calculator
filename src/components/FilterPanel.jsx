// src/components/FilterPanel.jsx
import React, { useState } from 'react';
import styled from 'styled-components';

const StyledFilterForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  input, select, button {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  button {
    background: #4A90E2;
    color: white;
    cursor: pointer;
    &:hover {
      background: #357ABD;
    }
  }
`;

const TransactionList = styled.ul`
  margin-top: 1rem;
  padding-left: 0;
  list-style-type: none;
`;

const TransactionItem = styled.li`
  padding: 0.5rem;
  border-bottom: 1px solid #ddd;
  font-size: 0.9rem;
`;

export default function FilterPanel({ transactions }) {
  const [filters, setFilters] = useState({ date: '', category: '' });

  const filtered = transactions.filter(tx => {
    const matchDate = filters.date ? tx.date === filters.date : true;
    const matchCat = filters.category
      ? tx.category.toLowerCase().includes(filters.category.toLowerCase())
      : true;
    return matchDate && matchCat;
  });

  return (
    <>
      <StyledFilterForm>
        <input
          type="date"
          value={filters.date}
          onChange={e => setFilters({ ...filters, date: e.target.value })}
        />
        <input
          type="text"
          placeholder="Filter by category"
          value={filters.category}
          onChange={e => setFilters({ ...filters, category: e.target.value })}
        />
        <button type="button" onClick={() => setFilters({ date: '', category: '' })}>
          Clear Filters
        </button>
      </StyledFilterForm>

      <TransactionList>
        {filtered.length === 0 && <TransactionItem>No matching transactions.</TransactionItem>}
        {filtered.map(tx => (
          <TransactionItem key={tx.id}>
            {tx.date} — {tx.category} — ${tx.amount} ({tx.type})
          </TransactionItem>
        ))}
      </TransactionList>
    </>
  );
}
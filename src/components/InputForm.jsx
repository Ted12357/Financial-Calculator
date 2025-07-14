// src/components/InputForm.jsx
import React, { useState } from 'react';
import styled from 'styled-components';

// Styled-form definition
const StyledForm = styled.form`
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
    &:hover { background: #357ABD; }
  }
`;

export default function InputForm({ onAdd }) {
  const [form, setForm] = useState({ amount: '', date: '', type: 'income', category: '' });

  const handleSubmit = e => {
    e.preventDefault();
    onAdd({ ...form, id: Date.now(), amount: Number(form.amount) });
    setForm({ amount: '', date: '', type: 'income', category: '' });
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={form.amount}
        onChange={e => setForm({ ...form, amount: e.target.value })}
        required
      />
      <input
        type="date"
        name="date"
        value={form.date}
        onChange={e => setForm({ ...form, date: e.target.value })}
        required
      />
      <select
        name="type"
        value={form.type}
        onChange={e => setForm({ ...form, type: e.target.value })}
      >
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={e => setForm({ ...form, category: e.target.value })}
        required
      />
      <button type="submit">Add</button>
    </StyledForm>
  );
}
// src/components/TransactionsTable.jsx
import React, { useMemo, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from '@tanstack/react-table';

export default function TransactionsTable({ data }) {
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);

  const columns = useMemo(() => [
    { accessorKey: 'date', header: 'Date' },
    { accessorKey: 'category', header: 'Category' },
    { accessorKey: 'type', header: 'Type' },
    {
      accessorKey: 'amount',
      header: 'Amount',
      cell: info => {
        const val = info.getValue();
        return (
          <span className={val >= 0 ? 'text-green-600' : 'text-red-600'}>
            {val >= 0 ? '+' : '-'}${Math.abs(val).toFixed(2)}
          </span>
        );
      }
    }
  ], []);

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter, sorting },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
  });

  return (
    <div className="transactions-table">
      <div className="table-controls">
        <input
          value={globalFilter}
          onChange={e => setGlobalFilter(e.target.value)}
          placeholder="Search transactions..."
          className="p-2 border rounded"
        />
      </div>
      <table className="min-w-full mt-2 bg-white rounded shadow">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  className="cursor-pointer px-4 py-2"
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {{
                    asc: ' 🔼',
                    desc: ' 🔽',
                  }[header.column.getIsSorted()] ?? null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="hover:bg-gray-100">
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="px-4 py-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-controls mt-2 flex justify-between items-center">
        <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          {'<'} Prev
        </button>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next {'>'}
        </button>
      </div>
    </div>
  );
}
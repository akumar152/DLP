import React from 'react';
import { useTable } from 'react-table';
import './Table.css'; // Import your CSS file

// Generate dummy data with 20 rows and 10 columns
const generateData = (numRows, numCols) => {
    const data = [];
    for (let i = 0; i < numRows; i++) {
        const row = {};
        for (let j = 0; j < numCols; j++) {
            row[`col${j}`] = `Row ${i + 1} - Col ${j + 1}`;
        }
        data.push(row);
    }
    return data;
};

// Generate columns based on the number of columns
const generateColumns = (numCols) => {
    return Array.from({ length: numCols }, (_, i) => ({
        Header: `Column ${i + 1}`,
        accessor: `col${i}`, // Accessor is the key in the data
    }));
};

const numRows = 10;
const numCols = 10;
const data = generateData(numRows, numCols);
const columns = generateColumns(numCols);

const Table = () => {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

    return (
        <div className="table-container">
            <table {...getTableProps()} className="responsive-table">
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()} className="header-row">
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()} className="header-cell">
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} className="body-row">
                                {row.cells.map(cell => (
                                    <td {...cell.getCellProps()} className="body-cell">
                                        {cell.render('Cell')}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Table;

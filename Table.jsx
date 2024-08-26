import React from 'react';
import { useTable } from 'react-table';

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
        <div style={{
            padding: '20px',
            marginLeft: '-20px',
            marginRight: '-100px',
            maxWidth: 'calc(100%)', // Ensure the table does not exceed the container width
            overflowX: 'auto',
        }}>
            <table {...getTableProps()} style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()} style={{ backgroundColor: '#f4f4f4' }}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()} style={{ border: '1px solid #ddd', padding: '8px' }}>
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
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => (
                                    <td {...cell.getCellProps()} style={{ border: '1px solid #ddd', padding: '8px' }}>
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

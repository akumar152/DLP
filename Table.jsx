import React from 'react';
import { useTable } from 'react-table';
import './Table.css'; // Import your CSS file

// Generate dummy data with 10 rows and 9 columns
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

// Custom column headers
const columns = [
    { Header: 'Market', accessor: 'col0' },
    { Header: 'Domain coverage', accessor: 'col1' },
    { Header: 'Time coverage', accessor: 'col2' },
    { Header: 'Volume', accessor: 'col3' },
    { Header: 'No of tables', accessor: 'col4' },
    { Header: 'Update frequencies', accessor: 'col5' },
    { Header: 'Number of issues', accessor: 'col6' },
    { Header: 'Average Monthly cost', accessor: 'col7' },
    { Header: 'Data Ingestion Mechanism', accessor: 'col8' },
];

const numRows = 10;
const numCols = columns.length; // Updated to match the number of custom columns
const data = generateData(numRows, numCols);

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

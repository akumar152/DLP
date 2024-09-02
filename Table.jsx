import React from 'react';
import { useTable } from 'react-table';
import './Table.css'; // Import your CSS file

// Helper functions to generate specific types of data
const randomBetween = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomChoice = (choices) => choices[Math.floor(Math.random() * choices.length)];
const formatDate = (date) => `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;

// Generate a random date range between Jan 2020 and March 2027
const randomDateRange = (start, end) => {
    const startDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    const endDate = new Date(startDate.getTime() + Math.random() * (end.getTime() - startDate.getTime()));
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
};

// Generate data with 10 rows based on provided value constraints
const generateData = (numRows) => {
    const markets = ['HK', 'ID', 'PH', 'MY'];
    const ingestionMechanisms = ['CDC', 'Real Time', 'Batch'];

    const data = [];
    for (let i = 0; i < numRows; i++) {
        data.push({
            col0: randomChoice(markets),  // Market
            col1: 'Claim',  // Domain coverage
            col2: randomDateRange(new Date(2020, 0, 1), new Date(2027, 2, 31)),  // Time coverage
            col3: 250.00,  // Volume
            col4: randomBetween(20, 102),  // No of tables
            col5: 'Monthly',  // Update frequencies
            col6: randomBetween(10, 400),  // Number of issues
            col7: randomBetween(78, 500),  // Average Monthly cost
            col8: randomChoice(ingestionMechanisms)  // Data Ingestion Mechanism
        });
    }
    return data;
};

// Updated column headers
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

const numRows = 10; // Number of rows to generate
const data = generateData(numRows);

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

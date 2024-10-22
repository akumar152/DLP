import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const ExcelUpload = () => {
    const [excelData, setExcelData] = useState([]);

    // Function to handle file upload
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            const binaryStr = event.target.result;
            const workbook = XLSX.read(binaryStr, { type: 'binary' });

            // Get the first sheet from the workbook
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];

            // Convert sheet to JSON data
            const data = XLSX.utils.sheet_to_json(sheet);
            setExcelData(data);
        };

        // Read the file as a binary string
        reader.readAsBinaryString(file);
    };

    return (
        <div style={styles.container}>
            <h2>Upload an Excel File</h2>
            <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileUpload}
                style={styles.input}
            />

            {excelData.length > 0 && (
                <div style={styles.tableContainer}>
                    <h3>Parsed Data:</h3>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                {Object.keys(excelData[0]).map((key) => (
                                    <th key={key} style={styles.th}>
                                        {key}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {excelData.map((row, index) => (
                                <tr key={index}>
                                    {Object.values(row).map((cell, idx) => (
                                        <td key={idx} style={styles.td}>
                                            {cell}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        textAlign: 'center',
    },
    input: {
        marginBottom: '20px',
    },
    tableContainer: {
        marginTop: '20px',
        textAlign: 'left',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    th: {
        border: '1px solid #ddd',
        padding: '8px',
        backgroundColor: '#f2f2f2',
    },
    td: {
        border: '1px solid #ddd',
        padding: '8px',
    },
};

export default ExcelUpload;

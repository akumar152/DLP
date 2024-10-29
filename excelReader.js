import React, { useState } from 'react';
import axios from 'axios';

const UploadAndRunNotebook = () => {
    const [file, setFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');
    const [notebookPath, setNotebookPath] = useState('');
    const [clusterId, setClusterId] = useState('');
    const [runStatus, setRunStatus] = useState('');
    const [fileType, setFileType] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [jobData, setJobData] = useState([
        { jobId: 'JOB12345', userId: 'user1', timeTaken: '5m 32s', dateTime: '2024-10-29 14:35:00', clusterId: 'CL123' },
        { jobId: 'JOB12346', userId: 'user2', timeTaken: '12m 10s', dateTime: '2024-10-29 15:00:00', clusterId: 'CL124' },
        { jobId: 'JOB12347', userId: 'user3', timeTaken: '3m 45s', dateTime: '2024-10-29 15:30:00', clusterId: 'CL125' },
        { jobId: 'JOB12348', userId: 'user4', timeTaken: '7m 10s', dateTime: '2024-10-29 15:45:00', clusterId: 'CL126' },
        { jobId: 'JOB12349', userId: 'user5', timeTaken: '4m 20s', dateTime: '2024-10-29 16:00:00', clusterId: 'CL127' },
        { jobId: 'JOB12350', userId: 'user6', timeTaken: '8m 15s', dateTime: '2024-10-29 16:15:00', clusterId: 'CL128' }
    ]);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 3;

    const fileTypes = {
        excel: ".xlsx",
        csv: ".csv",
        parquet: ".parquet",
        text: ".txt",
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleFileTypeChange = (event) => {
        setFileType(event.target.value);
        setFile(null);
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Please select a file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post("http://127.0.0.1:8000/upload-file/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setUploadStatus(`File uploaded successfully: ${response.data.file_path}`);
            setShowModal(true);
        } catch (error) {
            console.error("Error uploading file:", error);
            setUploadStatus(`Error: ${error.response ? error.response.data : error.message}`);
            setShowModal(true);
        }
    };

    const handleRunNotebook = async () => {
        const filePath = "FileStore/databricks_test.xlsx";

        if (!filePath) {
            console.error("File path is missing. Cannot run the notebook.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8000/run-notebook/", {
                notebook_path: notebookPath,
                cluster_id: clusterId,
                file_path: filePath,
            }, {
                headers: {
                    'accept': 'application/json',
                    "Content-Type": "application/json",
                },
            });

            setRunStatus(`Notebook run triggered: ${response.data}`);
            setShowModal(true);
        } catch (error) {
            console.error("Error running notebook:", error);
            setRunStatus(`Error running notebook: ${error.response ? error.response.data : error.message}`);
            setShowModal(true);
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setUploadStatus('');
        setRunStatus('');
    };

    // Pagination Logic
    const indexOfLastJob = currentPage * rowsPerPage;
    const indexOfFirstJob = indexOfLastJob - rowsPerPage;
    const currentJobs = jobData.slice(indexOfFirstJob, indexOfLastJob);
    const totalPages = Math.ceil(jobData.length / rowsPerPage);

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Upload File and Run Notebook</h2>

            {/* Upload Section */}
            <div style={styles.section}>
                <h3 style={styles.subtitle}>Upload Section</h3>

                <label style={styles.label}>Select file type:</label>
                <select value={fileType} onChange={handleFileTypeChange} style={styles.select}>
                    <option value="">-- Select File Type --</option>
                    <option value="excel">Excel (.xlsx)</option>
                    <option value="csv">CSV (.csv)</option>
                    <option value="parquet">Parquet (.parquet)</option>
                    <option value="text">Text (.txt)</option>
                </select>

                <input
                    type="file"
                    accept={fileType ? fileTypes[fileType] : ''}
                    onChange={handleFileChange}
                    disabled={!fileType}
                    style={styles.fileInput}
                />
                <button onClick={handleUpload} disabled={!file} style={styles.uploadButton}>
                    Upload to DBFS
                </button>
            </div>

            {/* Run Notebook Section */}
            <div style={styles.section}>
                <h3 style={styles.subtitle}>Run Notebook Section</h3>

                <input
                    type="text"
                    placeholder="Notebook Path (e.g., /Workspace/Users/username/notebook)"
                    value={notebookPath}
                    onChange={(e) => setNotebookPath(e.target.value)}
                    style={styles.input}
                />
                <input
                    type="text"
                    placeholder="Cluster ID"
                    value={clusterId}
                    onChange={(e) => setClusterId(e.target.value)}
                    style={styles.input}
                />
                <button onClick={handleRunNotebook} style={styles.runButton}>
                    Run Notebook
                </button>
            </div>

            {/* Job Run Status Table */}
            <div style={styles.section}>
                <h3 style={styles.subtitle}>Job Run Status</h3>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Job ID</th>
                            <th style={styles.th}>User ID</th>
                            <th style={styles.th}>Time Taken</th>
                            <th style={styles.th}>Date & Time</th>
                            <th style={styles.th}>Cluster ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentJobs.map((job, index) => (
                            <tr key={index} style={styles.row}>
                                <td style={styles.td}>{job.jobId}</td>
                                <td style={styles.td}>{job.userId}</td>
                                <td style={styles.td}>{job.timeTaken}</td>
                                <td style={styles.td}>{job.dateTime}</td>
                                <td style={styles.td}>{job.clusterId}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div style={styles.pagination}>
                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        style={styles.paginationButton}
                    >
                        Previous
                    </button>
                    <span style={styles.paginationInfo}>
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        style={styles.paginationButton}
                    >
                        Next
                    </button>
                </div>
            </div>

            {/* Modal for displaying status */}
            {showModal && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalContent}>
                        <h3>Status</h3>
                        {uploadStatus && <p>{uploadStatus}</p>}
                        {runStatus && <p>{runStatus}</p>}
                        <button onClick={closeModal} style={styles.closeButton}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

// Inline styles object
const styles = {
    container: {
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        // maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 2px 15px rgba(0, 0, 0, 0.1)',
    },
    title: {
        textAlign: 'center',
        color: '#333',
        marginBottom: '20px',
    },
    section: {
        marginBottom: '20px',
        padding: '15px',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
    },
    subtitle: {
        color: '#555',
        marginBottom: '10px',
    },
    label: {
        fontWeight: 'bold',
    },
    select: {
        width: '100%',
        padding: '10px',
        marginBottom: '10px',
        border: '1px solid #e0e0e0',
        borderRadius: '4px',
    },
    input: {
        width: '100%',
        padding: '10px',
        marginBottom: '10px',
        border: '1px solid #e0e0e0',
        borderRadius: '4px',
    },
    fileInput: {
        width: '100%',
        padding: '10px',
        marginBottom: '10px',
    },
    uploadButton: {
        backgroundColor: '#007bff',
        color: '#ffffff',
        border: 'none',
        padding: '10px',
        borderRadius: '4px',
        cursor: 'pointer',
        width: '100%',
        marginTop: '5px',
    },
    runButton: {
        backgroundColor: '#007bff',
        color: '#ffffff',
        border: 'none',
        padding: '10px',
        borderRadius: '4px',
        cursor: 'pointer',
        width: '100%',
        marginTop: '5px',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '10px',
    },
    th: {
        border: '1px solid #e0e0e0',
        padding: '10px',
        textAlign: 'left',
        backgroundColor: '#007bff',
        color: '#ffffff',
    },
    td: {
        border: '1px solid #e0e0e0',
        padding: '10px',
        textAlign: 'left',
    },
    row: {
        backgroundColor: '#f9f9f9',
    },
    pagination: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '10px',
    },
    paginationInfo: {
        color: '#555',
    },
    paginationButton: {
        backgroundColor: '#007bff',
        color: '#ffffff',
        border: 'none',
        padding: '10px',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
        maxWidth: '400px',
        width: '100%',
    },
    closeButton: {
        backgroundColor: '#007bff',
        color: '#ffffff',
        border: 'none',
        padding: '10px',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '10px',
    },
};

export default UploadAndRunNotebook;

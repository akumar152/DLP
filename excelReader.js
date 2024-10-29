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
        { jobId: 'JOB12346', userId: 'user2', timeTaken: '12m 10s', dateTime: '2024-10-29 15:00:00', clusterId: 'CL124' }
    ]);

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
            console.log("File uploaded successfully:", response.data.file_path);

            setShowModal(true);
            return response.data.file_path;
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

            console.log("Notebook run triggered:", response.data);
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
                        {jobData.map((job, index) => (
                            <tr key={index}>
                                <td style={styles.td}>{job.jobId}</td>
                                <td style={styles.td}>{job.userId}</td>
                                <td style={styles.td}>{job.timeTaken}</td>
                                <td style={styles.td}>{job.dateTime}</td>
                                <td style={styles.td}>{job.clusterId}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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

// Inline styles
// Inline styles
const styles = {
    container: {
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        width: 'calc(100% - 40px)',
        margin: '0 auto',
        marginLeft: '20px',
        marginRight: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    title: {
        textAlign: 'center',
        marginBottom: '20px',
        color: '#333',
    },
    section: {
        marginTop: '30px',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    },
    subtitle: {
        fontSize: '18px',
        marginBottom: '15px',
        color: '#333',
        textAlign: 'center',
    },
    label: {
        display: 'block',
        marginBottom: '10px',
        fontSize: '16px',
        color: '#555',
    },
    select: {
        padding: '8px',
        width: '100%',
        fontSize: '16px',
        marginBottom: '15px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    fileInput: {
        display: 'block',
        marginBottom: '15px',
        fontSize: '16px',
        color: '#555',
    },
    uploadButton: {
        padding: '10px 20px',
        backgroundColor: '#007BFF',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        transition: 'background-color 0.3s',
    },
    input: {
        width: '100%',
        padding: '10px',
        marginBottom: '10px',
        fontSize: '16px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    runButton: {
        padding: '10px 20px',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
    },
    th: {
        borderBottom: '1px solid #ddd',
        padding: '8px',
        textAlign: 'left',
        fontWeight: 'bold',
        color: '#333',
    },
    td: {
        borderBottom: '1px solid #ddd',
        padding: '8px',
        color: '#555',
    },
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        maxWidth: '400px',
        textAlign: 'center',
    },
    closeButton: {
        marginTop: '15px',
        padding: '8px 16px',
        fontSize: '14px',
        color: '#333',
        backgroundColor: '#eee',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default UploadAndRunNotebook;


// UploadSong.js

import React, { useState } from 'react';
import axios from 'axios';

const UploadSong = ({ onUploadComplete }) => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('audio', selectedFile);

        try {
            await axios.post('http://localhost:5000/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            // Refresh the audio files list after successful upload
            onUploadComplete();
        } catch (error) {
            console.error('Error uploading audio file:', error);
        }
    };

    return (
        <div>
            <h2>Upload Audio</h2>
            <input type="file" accept="audio/*" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default UploadSong;

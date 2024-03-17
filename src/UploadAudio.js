import React, { useState } from 'react';
import axios from 'axios';

const UploadAudio = ({ onUploadSuccess }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert('Please select a file');
            return;
        }

        const formData = new FormData();
        formData.append('audio', selectedFile);

        setUploading(true);
        try {
            await axios.post('https://audiolist.onrender.com/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Upload successful');
            setSelectedFile(null);
            onUploadSuccess(); // Trigger fetch of audio files after successful upload
        } catch (error) {
            console.error('Error uploading audio file:', error);
            alert('Upload failed');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className='w-full'>
            <div className="bg-black bg-opacity-40 backdrop-blur-xl shadow-lg p-8 rounded-lg">

                <h2 className="text-xl font-semibold mb-4">Upload Audio</h2>
                <div className="mb-4">
                    <label htmlFor="audio-upload" className="block mb-2">Choose a file:</label>
                    <input
                        type="file"
                        accept="audio/*"
                        onChange={handleFileChange}
                        id="audio-upload"
                        className="hidden"
                    />
                    <label
                        htmlFor="audio-upload"
                        className="bg-black bg-opacity-60 backdrop-blur-xl shadow-lg text-white py-2 px-4 rounded-lg cursor-pointer transition duration-300 hover:bg-violet-600"
                    >
                        Select File
                    </label>
                    {selectedFile && (
                        <span className="block mt-2">{selectedFile.name}</span>
                    )}
                </div>
                <button
                    onClick={handleUpload}
                    disabled={uploading}
                    className="w-full py-2 px-4 rounded-lg text-white bg-black bg-opacity-60 backdrop-blur-xl shadow-lg hover:bg-violet-600 focus:outline-none focus:bg-violet-300 transition duration-300 ease-in-out"
                >
                    {uploading ? 'Uploading...' : 'Upload'}
                </button>
            </div>
        </div>
    );
};

export default UploadAudio;

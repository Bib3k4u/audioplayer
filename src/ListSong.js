// ListSong.js

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const ListSong = () => {
    const [audioFiles, setAudioFiles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
        fetchAudioFiles();
    }, [currentPage]);

    const fetchAudioFiles = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`http://localhost:5000/api/audio?page=${currentPage}`);
            setAudioFiles(response.data.audioFiles);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching audio files:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePlay = (audioId) => {
        const audioElement = audioRef.current;
        audioElement.src = `http://localhost:5000/api/audio/${audioId}`;
        audioElement.play();
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    return (
        <div>
            <h1>List of Audio Files</h1>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    {audioFiles.map((audio) => (
                        <div key={audio.id}>
                            <button onClick={() => handlePlay(audio.id)}>{audio.filename}</button>
                        </div>
                    ))}
                    <div>
                        <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous Page</button>
                        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next Page</button>
                    </div>
                </div>
            )}
            <audio ref={audioRef} controls></audio>
        </div>
    );
};

export default ListSong;

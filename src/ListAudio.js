import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactAudioPlayer from 'react-audio-player';
import UploadAudio from './UploadAudio';
import Sidebar from './Sidebar';

const ListAudio = () => {
    const [audioFiles, setAudioFiles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [currentAudio, setCurrentAudio] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [totalDuration, setTotalDuration] = useState(0);
    const [currentlyPlayingId, setCurrentlyPlayingId] = useState(null);

    useEffect(() => {
        fetchAudioFiles();
    }, [currentPage]);

    const fetchAudioFiles = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`https://audiolist.onrender.com/api/audio?page=${currentPage}`);
            setAudioFiles(response.data);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching audio files:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePrevPage = () => {
        setCurrentPage(prevPage => prevPage - 1);
    };

    const handleNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const handleFilenameClick = async (id) => {
        try {
            const response = await axios.get(`https://audiolist.onrender.com/api/audio/${id}`, {
                responseType: 'blob'
            });
            const audioBlob = new Blob([response.data], { type: 'audio/mpeg' });
            const audioUrl = URL.createObjectURL(audioBlob);

            setCurrentAudio({ id, url: audioUrl });
            setIsPlaying(true);
            setCurrentlyPlayingId(id);
        } catch (error) {
            console.error('Error fetching audio file:', error);
        }
    };

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const handleListen = (e) => {
        if (e && e.target && typeof e.target.currentTime === 'number') {
            setCurrentTime(e.target.currentTime);
            setTotalDuration(e.target.duration);
        }
    };

    const handleEnded = () => {
        const currentIndex = audioFiles.findIndex(file => file.id === currentAudio.id);
        if (currentIndex !== -1 && currentIndex < audioFiles.length - 1) {
            handleFilenameClick(audioFiles[currentIndex + 1].id);
        }
    };

    const handlePrevSong = () => {
        const currentIndex = audioFiles.findIndex(file => file.id === currentAudio.id);
        if (currentIndex > 0) {
            handleFilenameClick(audioFiles[currentIndex - 1].id);
        }
    };

    const handleNextSong = () => {
        const currentIndex = audioFiles.findIndex(file => file.id === currentAudio.id);
        if (currentIndex < audioFiles.length - 1) {
            handleFilenameClick(audioFiles[currentIndex + 1].id);
        }
    };

    return (
        <div className='main flex flex-col h-screen'>
            <div className='nav-list-upload flex md:flex-row lg:flex-row xl:flex-row flex-col justify-between p-16 w-full flex-grow'>
                <div className='list'>
                    <div className='flex flex-row'>
                        <img className='rounded-full h-32 animate-spin animate-pulse -mt-12 -ml-12' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROjJ1uzte6eT2DyCuGpuQyrXdUxJNq_Cu3sA&usqp=CAU" alt="s" />
                        <h1 className='ml-4 font-serif font-semibold text-2xl tracking-wider'>My Music Player</h1>
                    </div>
                    <div className='mt-5'>
                        <h1 className='font-semibold text-xl mb-4 tracking-widest'>My Playlist</h1>
                        {isLoading ? (
                            <div>Loading Songs...</div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1">
                                {audioFiles.length > 0 ? (
                                    audioFiles.map(audio => (
                                        <div key={audio.id} className="bg-black bg-opacity-50 backdrop-blur-lg rounded-lg p-5 hover:bg-opacity-75">
                                            <button
                                                onClick={() => handleFilenameClick(audio.id)}
                                                className={`text-white w-full rounded-md ${currentlyPlayingId === audio.id ? 'bg-violet-500' : ''}`}
                                            >
                                                <span className="mr-2">
                                                    {currentlyPlayingId === audio.id && <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                    </svg>}
                                                </span>
                                                {audio.filename.length > 25 ? `${audio.filename.substring(0, 25)}...` : audio.filename}
                                            </button>

                                        </div>
                                    ))
                                ) : (
                                    <div className="text-white">No audio files found.</div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <div className='upload md:w-1/3 lg:w-1/3 xl:w-1/3 ml-4 w-full mt-24 md:mt-3 lg:mt-3 xl:mt-3'>
                    <UploadAudio onUploadSuccess={fetchAudioFiles} />
                </div>
            </div>

            <div className='player bg-transparent rounded-lg p-4  bottom-0 w-full'>
                {currentAudio && (
                    <>
                        <div className="flex flex-row justify-center space-x-4">
                        <button 
    onClick={handlePrevSong} 
    className="bg-black bg-opacity-40 text-white px-4 py-2 rounded-lg flex items-center transition duration-300 hover:bg-violet-500"
>
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
    Previous Song
</button>
<button 
    onClick={handleNextSong} 
    className="bg-black bg-opacity-40 text-white px-4 py-2 rounded-lg flex items-center transition duration-300 hover:bg-violet-500"
>
    Next Song
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
</button>

</div>

                        <ReactAudioPlayer
                            src={currentAudio.url}
                            autoPlay={isPlaying}
                            controls
                            onPlay={handlePlayPause}
                            onPause={handlePlayPause}
                            onListen={handleListen}
                            onEnded={handleEnded}
                            style={{ color: '#2A2A2A' }}
                            className="w-full"
                        />

                    </>
                )}
            </div>

        </div>
    );
};

export default ListAudio;

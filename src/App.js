import React from 'react';
import UploadAudio from './UploadAudio';
import ListAudio from './ListAudio';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './Sidebar';

function App() {
  return (
    <div className='backdrop-blur-sm h-screen w-full'>
      <BrowserRouter>

        <Routes>

          <Route path="/"
            element={<ListAudio />}
          />
          <Route path="/upload"
            element={<UploadAudio />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

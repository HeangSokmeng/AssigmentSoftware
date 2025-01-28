import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ThemeProvider, useTheme } from '../src/ThemeContext'; // Import your context
import { Chat } from './Component/Chat';
import { Header } from './Component/header/header';
import Login from './Component/login/login';
import { MainContent } from './Component/MainContent';
import { SavedDocuments } from './Component/SavedDocuments';
import ShowDoc from './Component/Show_Doc';
import ShowImg from './Component/show_img';
import ShowVid from './Component/show_Vid';
import { Sidebar } from './Component/sidebar/Sidebar';
import SinglePost from './Component/single_post';
import VideoPost from './Component/video_post';
import DocumentDetail from './pages/Documents/DocumentDetail';
import DocumentGrid from './pages/product/Product';

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <Content />
      </Router>
    </ThemeProvider>
  );
};

const Content = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className={isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}>
      <Header />
      <button onClick={toggleTheme} className={`p-2 m-4 rounded transition ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}>
        {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>
      <div className="flex">
        <Sidebar />
        <Routes>
          <Route path="/" element={<MainContent />} />
          {/* Other routes... */}
          <Route path="/chat" element={<Chat />} />
          <Route path="/post" element={<SinglePost />} />
          <Route path="/video" element={<VideoPost />} />
          <Route path="/show/img" element={<ShowImg />} />
          <Route path="/show/vid" element={<ShowVid />} />
          <Route path="/show/doc" element={<ShowDoc />} />
          <Route path="/login" element={<Login />} />
          <Route path="/saved-documents" element={<SavedDocuments />} />

          <Route path="/documents/:id" element={<DocumentDetail />} />
          <Route path="/category/:categoryId" element={<DocumentGrid />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
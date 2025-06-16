import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import LandingPage from './pages/Landingpage.jsx';
import Dashboard from './pages/Home/Dashboard';
import InterviewPrep from './pages/InterviewPrep/Interviewprep.jsx';
import UserProvider from './context/usercontext';

const App = () => {
  return (
      <UserProvider>
        <div>

    <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/interviewprep/:sessionId" element={<InterviewPrep />} />
        </Routes>

        <Toaster
          position="top-right"
          toastOptions={{
            style: { fontSize: '13px' },
          }}
          />
    </Router>
          </div>
      </UserProvider>
  );
};

export default App;

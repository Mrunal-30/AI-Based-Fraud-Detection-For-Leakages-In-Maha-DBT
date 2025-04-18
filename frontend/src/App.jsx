import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HeroSection } from "./component/HeroSection";
import { LoginPage } from "./component/LoginPage";
import { FraudCheck } from "./component/FraudCheck";
import { Dashboard } from "./component/Dashboard";
import { Footer } from "./component/Footer";
import {Statistics} from "./component/Statistics";
import Settings from "./component/Settings";


function App() {

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HeroSection />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/fraud-check" element={<FraudCheck />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
    
        <Footer />
      </div>
    </Router>
  );
}

export default App;

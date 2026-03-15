import { BrowserRouter, Routes, Route } from "react-router-dom";

import { About, Contact, Experience, Hero, Navbar, Tech, Works, StarsCanvas } from "./components";
import Resume from "./components/Resume";
import { ThemeProvider } from "./context/ThemeContext";
import AdminLayout from "./components/admin/AdminLayout";
import AdminLogin from "./components/admin/AdminLogin";
import AdminMessages from "./components/admin/AdminMessages";
import AdminResume from "./components/admin/AdminResume";
import AdminSettings from "./components/admin/AdminSettings";
import AdminExperiences from "./components/admin/AdminExperiences";

const Portfolio = () => (
  <div className='relative z-0 bg-primary'>
    <div className='bg-hero-pattern bg-fixed bg-no-repeat bg-center'>
      <Navbar />
      <Hero />
    </div>
    <About />
    <Experience />
    <Tech />
    <Works />
    <div className='relative z-0'>
      <Contact />
      <StarsCanvas />
    </div>
    <Resume />
  </div>
);

const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminMessages />} />
            <Route path="messages" element={<AdminMessages />} />
            <Route path="experiences" element={<AdminExperiences />} />
            <Route path="resume" element={<AdminResume />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;

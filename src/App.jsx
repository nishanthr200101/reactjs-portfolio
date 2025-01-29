import { BrowserRouter } from "react-router-dom";

import { About, Contact, Experience, Hero, Navbar, Tech, Works, StarsCanvas } from "./components";
import Resume from "./components/Resume";

const App = () => {
  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary'>
        deploy 1
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
        <Resume/>
      </div>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Services from './pages/services/Services';
import Tickets from './pages/tickets/Tickets';

function App() {
  return (
    <>
      <Router>
        <main className='w-full min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-800 dark:text-neutral-300 flex flex-col overflow-hidden'>
          {/* Navbar */}
          <Navbar />

          {/* Routing */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="tickets" element={<Tickets />} />
          </Routes>

          {/* Footer */}
          
        </main>
      </Router>
    </>
  )
}

export default App

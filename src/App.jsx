import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Services from './pages/home/services/Services';
import Ticket from './pages/ticket/Ticket';
import Wifi from './pages/wifi/Wifi';
import Signin from './pages/signin/Signin';
import Footer from './components/footer/Footer';
import Detail from './pages/ticket/detail/Detail';
import Gallery from './pages/gallery/Gallery';
import Checkout from './pages/ticket/checkout/Checkout';
import Invoice from './pages/ticket/invoice/Invoice';
import Timetable from './pages/timetable/Timetable';
import Admin from './pages/admin/Admin';
import APi from './components/apilinksmanager/ApiLinksManager'
import ApiLinksManager from './components/apilinksmanager/ApiLinksManager';

const App = () => {
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
            <Route path="/bus-tickets" element={<Ticket />} />
            <Route path="/bus-tickets/checkout" element={<Checkout />} />
            <Route path="/bus-tickets/payment" element={<Invoice />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/wifi" element={<Wifi />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/AdminPanel" element={<Admin />} />
            <Route path="/api" element={<ApiLinksManager />} />

            {/* Ticket Detail Page */}
            <Route path="/bus-tickets/detail" element={<Detail />} />

            {/* Driver-only route */}
            <Route path="/timetable" element={<Timetable />} />

          </Routes>

          {/* Footer */}
          <Footer />
          
        </main>
      </Router>
    </>
  )
}

export default App

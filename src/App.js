import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './pages/js/navbar';

import HomePage from './pages/js/homepage';
import BirthdayCakes from './pages/js/birthdaycake';
import ShopContact from './pages/js/contact';
import CustomizeCake from './pages/js/register';
function App() {

  return (
    <div className="App">
       <Router>

        
        
      <Routes>
                  <Route path="/" element={<HomePage />} />                 {/* ✅ Home (first page) */}

           {<Route path="/birthdaycake" element={<BirthdayCakes />} />
            
          }

           {<Route path="/register" element={<CustomizeCake />} />
            
          }
           {<Route path="/contact" element={<ShopContact />} />
           
            
          }
           {<Route path="/Footer" element={<Navbar />} />
            
          }
                </Routes>
    </Router>
    </div>
  );
}

export default App;

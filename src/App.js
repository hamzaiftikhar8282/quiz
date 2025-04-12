// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/JS/Login';
import SignUp from './pages/JS/SignUp';
import Home from './pages/JS/Home';
import Author from './pages/JS/About_Author';
import Contact from './pages/JS/Contact_Us';
import Chapter from './pages/JS/User_Chapters';
import ViewChapter from './pages/JS/Daily_Thoughts';
import Privacy from './pages/JS/Privacy_Policy';
import AdminNavbar from './pages/JS/components/Admin_navbar';
import AdminHome from './pages/JS/Admin';
import ForgetPassword from './pages/JS/forget_password';
import BookUpload from './pages/JS/book_upload';
import EditProfile from './pages/JS/edit_profile';
import UploadDailyThoughts from './pages/JS/Upload_Daily_Thoughts';
function App() {
  return (
    <Router>

      <div className="app-container">
      <Routes>
            <Route path="/" element={<SignUp/>} />


            {<Route path="/SignUp" element={<SignUp />} />
            
            }
             {<Route path="/Upload_Daily_Thoughts" element={<UploadDailyThoughts />} />
            
          }
             {<Route path="/edit_profile" element={<EditProfile />} />
            
          }
          {<Route path="/User_Chapter" element={<Chapter />} />
            
          }
            {<Route path="/Login" element={<Login />} />
            
            


          }
           {<Route path="/Admin" element={<AdminHome />} />
            
            

          }
              {<Route path="/books_upload" element={<BookUpload />} />
            
            

          }

{<Route path="/forget_password" element={<ForgetPassword />} />
            
            // <Route path="/feed_page" element={<Feedpage />} /> 
            
            }
              {<Route path="/Home" element={<Home />} />
            // <Route path="/feed_page" element={<Feedpage />} /> 
            
            }
             {<Route path="/Admin_navbar" element={<AdminNavbar />} />
            // <Route path="/feed_page" element={<Feedpage />} /> 
            
            }
                {<Route path="/About_Author" element={<Author />} />
            
            // <Route path="/feed_page" element={<Feedpage />} /> 
            
            }
                {<Route path="/Contact_Us" element={<Contact />} />
            
            // <Route path="/feed_page" element={<Feedpage />} /> 
            
            }
          
                
                
                {<Route path="/User_Chapters" element={<Chapter />} />
            
            // <Route path="/feed_page" element={<Feedpage />} /> 
            
            }
                 {<Route path="/Daily_Thoughts" element={<ViewChapter />} />
            
            // <Route path="/feed_page" element={<Feedpage />} /> 
            
            }
          
                  {<Route path="/Privacy_Policy" element={<Privacy />} />
            
            // <Route path="/feed_page" element={<Feedpage />} /> 
            
            }


          </Routes>

        <div className="main-content">
        
        </div>
      </div>
    </Router>
  );
}

export default App;

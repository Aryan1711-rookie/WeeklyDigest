import LoginScreen from './pages/LoginScreen';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Writer from './pages/Writer';
import Blogs from './pages/Blogs';
import HomePage from './pages/HomePage.jsx';
import BlogById from './pages/BlogById.jsx';
import Profile from './pages/Profile.jsx';
import RegisterScreen from './pages/RegistrationScreen.jsx';
import Payment from './components/Payment.jsx';
import PaymentResult from './pages/PaymentResult.jsx';
import About from './pages/About.jsx';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="*" element={<div>404 - Page Not Found</div>} />
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginScreen />} />
        <Route path='/register' element={<RegisterScreen/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/write' element={
          <ProtectedRoute>
            <Writer />
          </ProtectedRoute>
        } />
        <Route path='/profile' element={
          <ProtectedRoute>
            <Profile/>
          </ProtectedRoute>

        }/>
        <Route path='/blogs' element={<Blogs />} />
        <Route path='/blog/:id' element={<BlogById/>}/>
        <Route path='/blog/update/:id' element={
          <ProtectedRoute>
            <Writer/>
          </ProtectedRoute>
        }/>
        <Route path='/payment' element={<Payment/>}/>
        <Route path='/paymentResult' element={<PaymentResult/>}/>
      </Routes>
      <ToastContainer position="bottom-right" autoClose={2000} hideProgressBar />
    </>
  );
};

export default App;

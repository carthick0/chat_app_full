import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import Settings from './pages/Settings';
import ProfilePic from './pages/ProfilePic';
import SignUp from './pages/SignUp';
import { useAuthStore } from './store/useAuthStore';
import Loginpage from './pages/Loginpage';
import { Loader } from "lucide-react";
import { Toaster } from 'react-hot-toast';

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log("Auth User:", authUser);

  if (isCheckingAuth && !authUser) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className="size-30 animate-spin"/>
      </div>
    );
  }
  
  return (
    <div data-theme="retro">

      <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <HomePage />: <Navigate to="/login"/>} />
        <Route path="/login" element={!authUser ?<Loginpage />:<Navigate to ="/"/>} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={authUser ?<ProfilePic />:<Navigate to ="/login"/>} />
        <Route path="/signup" element={!authUser?<SignUp />:<Navigate to ="/"/>} />
      </Routes>
      <Toaster/>
    </div>
  );
};

export default App;

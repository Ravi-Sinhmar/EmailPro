import React,{useState} from 'react';
import { FaBars } from 'react-icons/fa';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isSidebarOpenState, authState } from '../states/atoms/auth';
import { GrValidate } from "react-icons/gr";





const Header = () => {

  const BACKEND_URL =
        import.meta.env.VITE_ENV === "Production"
            ? import.meta.env.VITE_PRODUCTION_BACKEND_URL
            : import.meta.env.VITE_LOCAL_BACKEND_URL;



  const [isSidebarOpen, setIsSidebarOpen] = useRecoilState(isSidebarOpenState);
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const isAuth = useRecoilValue(authState)

 
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

   // Function to handle authentication
    const handleAuth = () => {
      setIsAuthenticating(true);
    
      window.location.href = `${BACKEND_URL}/auth`;
    };

  return (
    <header className="fixed top-0 left-0 w-full bg-white border-b border-gray-200 p-4 flex justify-between items-center z-50">
  
      <button
        onClick={toggleSidebar}
        className="p-2 bg-white border border-gray-200 rounded-lg shadow-sm"
      >
        <FaBars className="w-4 h-4" />
      </button>
  
     <div className='flex justify-center items-center gap-2'>

     <button
        onClick={handleAuth}
        disabled={isAuthenticating || isAuth}
        className="px-3 py-1 bg-blue-500 text-white hover:bg-blue-600 rounded-md shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
      >
        {isAuth ?<span className='flex items-center gap-2 justify-center'>Valid<GrValidate className='size-4 text-white' /></span> :isAuthenticating ? "Authenticating" : "Login with Google"}
        
      </button>
     
     </div>
    
    </header>
  );
};

export default Header;
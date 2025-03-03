import React from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useLocation } from 'react-router-dom';
import { authState } from '../states/atoms/auth';
import {
  FaTrash,
  FaSignOutAlt,
  FaPaperPlane,
  FaEnvelope,
  FaHome,
  FaTimes,
} from 'react-icons/fa';
import { MdSpaceDashboard } from 'react-icons/md';
import { isSidebarOpenState, isLogoutPopupOpenState, isDeleteAccountPopupOpenState } from '../states/atoms/auth';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useRecoilState(isSidebarOpenState);
  const [, setIsLogoutPopupOpen] = useRecoilState(isLogoutPopupOpenState);
  const [, setIsDeleteAccountPopupOpen] = useRecoilState(isDeleteAccountPopupOpenState);
  const isAuth = useRecoilValue(authState)
  const location = useLocation();

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const navItems = [
    { name: 'Home', icon: <FaHome />, path: '/' },
    { name: 'Dashboard', icon: <MdSpaceDashboard />, path: '/dashboard' },
    { name: 'Single Email', icon: <FaEnvelope />, path: '/email/one' },
    { name: 'Bulk Email', icon: <FaPaperPlane />, path: '/email/bulk' },
  ];

  const bottomItems = [
    { name: isAuth ?'Logout' : "Login" , icon: <FaSignOutAlt />, onClick: isAuth ? () => setIsLogoutPopupOpen(true)  : ()=> window.location.href = "http://localhost:3000/auth"},
    { name:isAuth ?  'Delete Account' : "Create Account", icon: <FaTrash />, onClick: isAuth ? () => setIsDeleteAccountPopupOpen(true) :()=> window.location.href = "http://localhost:3000/auth" },
  ];

  return (
    <div
      className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 px-6 py-10 transform transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <button
        onClick={closeSidebar}
        className="absolute top-4 right-4 p-2 bg-white border border-gray-200 rounded-lg shadow-sm"
      >
        <FaTimes className="w-6 h-6" />
      </button>

      <div className="text-xl font-bold mb-8">Email Pro</div>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.path}
            className={`p-2 rounded-lg cursor-pointer flex items-center space-x-2 ${
              location.pathname === item.path
                ? 'bg-blue-500 text-white'
                : 'hover:bg-gray-100 text-gray-900'
            }`}
          >
            {item.icon}
            <span>{item.name}</span>
          </a>
        ))}
      </nav>

      <div className="mt-8 border-t border-gray-200 pt-6">
        {bottomItems.map((item) => (
          <button
            key={item.name}
            onClick={item.onClick}
            className={`w-full p-2 rounded-lg cursor-pointer flex items-center space-x-2 ${
              location.pathname === item.path
                ? 'bg-blue-500 text-white'
                : 'hover:bg-gray-100 text-gray-900'
            }`}
          >
            {item.icon}
            <span>{item.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
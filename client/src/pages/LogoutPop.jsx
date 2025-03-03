import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { isLogoutPopupOpenState,authState } from '../states/atoms/auth';

const LogoutPopup = () => {
  const [isLogoutPopupOpen, setIsLogoutPopupOpen] = useRecoilState(isLogoutPopupOpenState);
const setIsAuth = useSetRecoilState(authState)
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3000/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      if (response.ok) {
        window.location.href = '/'; 
        setIsAuth(false);
      } else {
        alert('Failed to logout. Please try again.');
      }
    } catch (error) {
      console.error('Error during logout:', error);
      alert('Error during logout. Please try again.');
    }
  };

  if (!isLogoutPopupOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Logout Confirmation</h2>
        <p className="mb-6">Are you sure you want to logout?</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={() => setIsLogoutPopupOpen(false)}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutPopup;
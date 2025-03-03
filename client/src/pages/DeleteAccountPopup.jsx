import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { isDeleteAccountPopupOpenState,authState } from '../states/atoms/auth';


const DeleteAccountPopup = () => {
  const BACKEND_URL =
  import.meta.env.VITE_ENV === "Production"
      ? import.meta.env.VITE_PRODUCTION_BACKEND_URL
      : import.meta.env.VITE_LOCAL_BACKEND_URL;

  const [isDeleteAccountPopupOpen, setIsDeleteAccountPopupOpen] = useRecoilState(
    isDeleteAccountPopupOpenState
  );
  const setIsAuth = useSetRecoilState(authState);

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/auth/delete-account`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (response.ok) {
        window.location.href = '/';
        setIsAuth(false);
      } else {
        alert('Failed to delete account. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('Error deleting account. Please try again.');
    }
  };

  if (!isDeleteAccountPopupOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Delete Account Confirmation</h2>
        <p className="mb-6">Are you sure you want to delete your account? This action cannot be undone.</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={() => setIsDeleteAccountPopupOpen(false)}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteAccount}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountPopup;
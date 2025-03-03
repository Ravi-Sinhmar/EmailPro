import { useState, useEffect } from 'react';
import EmailList from '@/components/EmailList';
import EmailDetails from '@/components/EmailDetails';
import { authState, selectEmail } from '@/states/atoms/auth';
import { useRecoilState, useRecoilValue } from 'recoil';
import { loadingState  } from '@/states/atoms/auth';


export default function EmailDashboard() {
  const [selectedEmail, setSelectedEmail] = useState(null);
  const isSelectEmail = useRecoilValue(selectEmail);
  const [isLoading,setIsLoading] = useRecoilState(loadingState);
  const [showComposeDialog, setShowComposeDialog] = useState(false);
  const [allEmails, setAllEmails] = useState([]);
  const [messageCount, setMessageCount] = useState(10);
  const isAuth = useRecoilValue(authState);
  const [status, setStatus] = useState('sent'); 

  useEffect(() => {
    if (true) {
      handleReadEmails();
    }
  }, [isAuth]);

  const handleReadEmails = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3000/readEmails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ count: messageCount }),
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setAllEmails(data.data);
        console.log('Got All Emails:', data.data);
      } else {
        throw new Error('Error in fetching emails');
      }
    } catch (error) {
      console.error('Error during fetching:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterEmails = (status) => allEmails.filter((email) => email.status === status);

  const getStatusColor = (status) => {
    switch (status) {
      case 'sent':
        return 'bg-blue-600';
      case 'replied':
        return 'bg-green-500';
      default:
        return 'bg-blue-600';
    }
  };

  return (
    <main className="p-6 space-y-6 flex bg-zinc-100 justify-between items-center pt-20 gap-6 w-screen">
      {!isSelectEmail && (
        <div className="w-full">
      
          <div className="bg-white w-full border border-zinc-300 rounded-lg overflow-hidden shadow-md">
            <div className="p-4 border-b border-zinc-300">
            
              <div className="flex space-x-4">
                <button
                  onClick={() => setStatus('sent')}
                  className={`px-4 py-2 rounded-md text-sm ${
                    status === 'sent' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  Sent
                </button>
                <button
                  onClick={() => setStatus('replied')}
                  className={`px-4 py-2 rounded-md text-sm ${
                    status === 'replied' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  Replied
                </button>
              </div>
              <div className="flex justify-between items-center text-zinc-800">
                <h3 className="text-lg font-semibold">
                  {status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Hi'}
                </h3>
                <span
                  className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                    status === 'replied' ? 'bg-green-700 text-green-100' : 'bg-blue-600 text-zinc-100'
                  } border border-zinc-600`}
                >
                  {filterEmails(status).length}
                </span>
              </div>
              <p className="text-sm text-zinc-400">Emails that have been {status}</p>
            </div>
            <div className="p-4">
         
              {!isLoading &&
                <EmailList
                  emails={filterEmails(status)}
                  onSelectEmail={setSelectedEmail}
                  getStatusColor={getStatusColor}
                />
              }
            </div>
          </div>
        </div>
      )}

      {isSelectEmail && <EmailDetails email={selectedEmail} />}
    </main>
  );
}
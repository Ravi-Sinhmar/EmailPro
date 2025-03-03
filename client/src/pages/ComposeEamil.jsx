import { useState, useEffect } from 'react';
import { authState } from '@/states/atoms/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Wand2, Loader2, X, Send, Trash2 } from 'lucide-react';
import OverlayComponent from '@/components/OverlayComponent';

export default function SendEmail() {
  const BACKEND_URL =
  import.meta.env.VITE_ENV === "Production"
      ? import.meta.env.VITE_PRODUCTION_BACKEND_URL
      : import.meta.env.VITE_LOCAL_BACKEND_URL;


  const [sharedArray, setSharedArray] = useState([]);
  const [inputEmail, setInputEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [resume, setResume] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  const navigate = useNavigate();
  const isAuth = useRecoilValue(authState);
  const location = useLocation();
  const isBulkEmail = location.pathname === '/email/bulk';


  const processEmails = () => {
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const newEmails = inputEmail.match(emailRegex) || [];
    setSharedArray([...new Set([...sharedArray, ...newEmails])]);
    setInputEmail('');
  };

  
  const deleteEmail = (index) => {
    setSharedArray(sharedArray.filter((_, i) => i !== index));
  };


  const sendEmailHandler = async () => {
    if (!isAuth) {
      alert('Please authenticate first.');
      navigate('/');
      return;
    }

    const formattedMessage = message.replace(/\n/g, "<br>").replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;");
    const formData = new FormData();
    formData.append("message", formattedMessage);
    formData.append("subject", subject);
    if (resume) {
      formData.append("resume", resume);
    }


    if (isBulkEmail) {
      formData.append("toEmail", JSON.stringify(sharedArray));
    } else {
      // For single email, use the inputEmail
      formData.append("toEmail", JSON.stringify([inputEmail]));
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/sendEmail`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          alert('Emails sent successfully!');
          setInputEmail('');
          setSharedArray([]);
          setResume(null);
          setSubject('');
          setMessage('');
        } else {
          alert('Failed to send emails.');
        }
      } else {
        alert('Failed to send emails.');
      }
    } catch (error) {
      console.error('Error sending emails:', error);
      alert('Error sending emails.');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to clear the form
  const handleClear = () => {
    setInputEmail('');
    setSharedArray([]);
    setResume(null);
    setSubject('');
    setMessage('');
  };

  // Function to generate email with AI
  const generateEmail = async (userData, jobDescription = '', customPrompt = '') => {
    setIsLoading(true);
    setShowOverlay(false);

    let attempts = 0;
    const maxAttempts = 3;

    const generate = async () => {
      const prompt = customPrompt || 'Generate an email based on the provided details.';

      const inputString = `{
        "role": "system",
        "content": "You are an AI email writing assistant. Generate a professional email based on the user's data and job description. Follow these rules:\\n\\n1. Return the response in the format: ----{\\"subject\\": \\"Subject\\", \\"emailBody\\": \\"Email body\\"}------\\n\\n2. Use the user's skills and job description to personalize the email."
      },
      {
        "role": "user",
        "content": "User data: ${JSON.stringify(userData)} | Job description: ${jobDescription} | Custom prompt: ${prompt}"
      }`;

      try {
        const response = await fetch(`${BACKEND_URL}/question`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question: inputString }),
        });
        const data = await response.json();

        if (!data.data.answer) {
          throw new Error("Error: Answer is null or undefined.");
        }

        const regex = /----({.*?})------/;
        const match = data.data.answer.match(regex);

        if (!match || !match[1]) {
          throw new Error("Error: Answer does not follow the required format.");
        }

        const unescapedJson = match[1].replace(/\\"/g, '"').replace(/\\n/g, '\\n');
        const parsedObject = JSON.parse(unescapedJson);
        const { subject, emailBody } = parsedObject;

        setSubject(subject);
        setMessage(emailBody);
        return true; 
      } catch (error) {
        console.error("Error:", error);
        return false; 
      }
    };

    while (attempts < maxAttempts) {
      attempts++;
      const success = await generate();
      if (success) {
        break; 
      }
      if (attempts < maxAttempts) {
        alert(`Attempt ${attempts} failed. Retrying...`);
      } else {
        alert("Failed to generate email after 3 attempts. Please try again later.");
      }
    }

    setIsLoading(false);
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg mt-16">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl font-bold text-gray-800">
          {isBulkEmail ? 'Bulk Email Sender' : 'Single Email Sender'}
        </h1>
        <button
          onClick={() => setShowOverlay(true)}
          className="flex items-center gap-2 bg-gradient-to-r bg-blue-500  text-white px-4 py-2 rounded-lg hover:bg-blue-400 transition-all shadow-md"
        >
          <Wand2 className="h-5 w-5" />
          Generate with AI
        </button>
      </div>

      <div className="space-y-6">
        {isBulkEmail ? (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Recipient Emails</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={inputEmail}
                onChange={(e) => setInputEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2  focus:border-none transition-all"
                placeholder="Enter email addresses (comma separated)"
              />
              <button
                onClick={processEmails}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {sharedArray.map((email, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full"
                >
                  <span className="text-sm text-gray-700">{email}</span>
                  <button
                    onClick={() => deleteEmail(index)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Recipient Email</label>
            <input
              type="email"
              value={inputEmail}
              onChange={(e) => setInputEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2   focus:border-none transition-all"
              placeholder="Enter recipient email"
            />
          </div>
        )}

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2   focus:border-none transition-all"
            placeholder="Enter email subject"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg h-64 focus:ring-2   focus:border-none transition-all"
            placeholder="Write your email message here..."
          />
        </div>


        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Attach Resume (Optional)</label>
          <input
            type="file"
            onChange={(e) => setResume(e.target.files[0])}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2   focus:border-none transition-all"
          />
        </div>

    
        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={handleClear}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-all"
          >
            <Trash2 className="h-4 w-4" />
            Clear
          </button>
          <button
            onClick={sendEmailHandler}
            disabled={!subject || !message || (isBulkEmail ? sharedArray.length === 0 : !inputEmail)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-all ${
              !subject || !message || (isBulkEmail ? sharedArray.length === 0 : !inputEmail)
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 shadow-md'
            }`}
          >
            <Send className="h-4 w-4" />
            {isBulkEmail ? 'Send Bulk Emails' : 'Send Email'}
          </button>
        </div>
      </div>

     
      {showOverlay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 px-2">
          <div className="bg-white rounded-xl shadow-xl p-6 lg:w-9/12 sm:w-10/12 w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-bold text-gray-800">Generate Email with AI</h2>
              <button
                onClick={() => setShowOverlay(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <OverlayComponent
              onClose={() => setShowOverlay(false)}
              onSubmit={(userData, jobDescription, customPrompt) => generateEmail(userData, jobDescription, customPrompt)}
            />
          </div>
        </div>
      )}

  
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg flex items-center gap-3">
            <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
            <p className="text-gray-800 font-medium">Loading...</p>
          </div>
        </div>
      )}
    </div>
  );
}
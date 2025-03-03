import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, FileText, Zap, Filter  , Sparkles} from "lucide-react"; // Updated import
import { authState } from "@/states/atoms/auth";
import { useRecoilState, useRecoilValue } from "recoil";

export default function AuthPage() {
  const [isAuth, setIsAuth] = useRecoilState(authState);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('http://localhost:3000/auth/check-tokens', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          response.json().then((data) => {
            console.log(data);
            if (data.hasValidJWT) {
              setIsAuth(true);
              navigate('/dashboard');
            }
          });
        } else {
          setIsAuth(false);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        setIsAuth(false);
      }
    };

    checkAuth();
  }, [navigate, setIsAuth]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      fetch(`http://localhost:3000/auth/callback?code=${code}`, {
        method: "GET",
        credentials: "include",
      })
        .then((response) => response.text())
        .then((data) => {
          setIsAuth(true);
          navigate("/send-email");
        })
        .catch((err) => {
          console.error("Error during OAuth callback:", err);
        });
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center justify-center p-4 pt-24">
      <h1 className="text-2xl font-bold mb-6">Email Automation Platform</h1>

      <p className="text-gray-600 mb-8 text-center max-w-2xl">
        Supercharge your email communication with our AI-powered platform. Send bulk or single emails, craft or edit messages with AI, and track all your sent and replied emails in one place.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Feature 1: Bulk and Single Emails */}
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col items-center p-4">
            <Mail className="w-8 h-8 text-blue-500 mb-4" />
            <h2 className="text font-semibold mb-2 text-gray-900">Bulk & Single Emails</h2>
            <p className="text-center text-gray-600">
              Send emails to multiple recipients at once or craft personalized single emails effortlessly.
            </p>
          </div>
        </div>

        {/* Feature 2: AI-Powered Email Writing */}
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col items-center p-4">
            <Sparkles className="w-8 h-8 text-blue-500 mb-4" />
            <h2 className="text font-semibold mb-2 text-gray-900">AI-Powered Writing</h2>
            <p className="text-center text-gray-600">
              Write or edit emails using AI. Customize prompts to create the perfect message.
            </p>
          </div>
        </div>
      
        {/* Feature 3: Email Tracking */}
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col items-center p-4">
            <Filter className="w-8 h-8 text-blue-500 mb-4 " /> {/* Updated icon */}
            <h2 className="text font-semibold mb-2 text-gray-900">Email Filtering</h2>
            <p className="text-center text-gray-600">
              View all sent emails in two sections: replied emails and sent emails.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
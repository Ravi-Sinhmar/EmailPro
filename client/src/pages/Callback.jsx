import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { authState } from "../states/atoms/auth";

function Callback() {
  const navigate = useNavigate();
  const setIsAuth = useSetRecoilState(authState);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      fetch(`http://localhost:3000/auth/callback?code=${code}`, {
        method: "GET",
        credentials: "include",
      })
        .then((response) => {
          
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            return response.json();
          } else {
            return response.text().then((text) => {
              throw new Error(text || "Invalid response from server");
            });
          }
        })
        .then((data) => {
          console.log(data);
          setIsAuth(true);
          navigate("/dashboard");
        })
        .catch((error) => {
          console.error("Error during OAuth callback:", error);
          navigate("/");
        });
    } else {
      console.error("Authorization code missing");
      navigate("/");
    }
  }, [navigate, setIsAuth]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="bg-white border border-gray-200 p-8 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold text-zinc-900 mb-4">
          Processing Authentication
        </h2>
        <p className="text-gray-600">
          Please wait while we complete your authentication...
        </p>
      </div>
    </div>
  );
}

export default Callback;
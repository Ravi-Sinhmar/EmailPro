import { useState } from "react";
import { Loader2 } from "lucide-react";

const OverlayComponent = ({ onClose, onSubmit }) => {
  const [userData, setUserData] = useState({
    name: "",
    skills: "",
    experience: "",
  });
  const [jobDescription, setJobDescription] = useState("");
  const [customPrompt, setCustomPrompt] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onSubmit(userData, jobDescription, customPrompt);
      setUserData({ name: "", skills: "", experience: "" });
      setJobDescription("");
      setCustomPrompt("");
    } catch (error) {
      console.error("Error generating email:", error);
      alert("Failed to generate email. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Your Name</label>
        <input
          type="text"
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-none"
          placeholder="Ravi Sinhmar"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Your Skills</label>
        <input
          type="text"
          value={userData.skills}
          onChange={(e) => setUserData({ ...userData, skills: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-none"
          placeholder="React, JavaScript, UI/UX Design"
          required
        />
      </div>


      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Your Experience</label>
        <input
          type="text"
          value={userData.experience}
          onChange={(e) => setUserData({ ...userData, experience: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-none"
          placeholder="5 years of frontend development"
          required
        />
      </div>

   
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Job Description (Optional)
        </label>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-none"
          rows="3"
          placeholder="Paste the job description here"
        />
      </div>

   
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Custom Instructions (Optional)
        </label>
        <textarea
          value={customPrompt}
          onChange={(e) => setCustomPrompt(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-none"
          rows="2"
          placeholder="E.g., Make it formal, highlight my React skills"
        />
      </div>

    
      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400 flex items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            "Generate Email"
          )}
        </button>
      </div>
    </form>
  );
};

export default OverlayComponent;
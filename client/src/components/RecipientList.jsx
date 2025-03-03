import React, { useRef, useEffect } from 'react';
import { Trash2 } from 'lucide-react';

export default function RecipientList({ inputEmails, setInputEmails, sharedArray, processEmails, deleteEmail }) {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
    }
  }, []);

  return (
    <div className="space-y-4">
        <div className='flex gap-3'>
      <textarea
        placeholder="Paste your bulk emails here..."
        value={inputEmails}
        onChange={(e) => setInputEmails(e.target.value)}
        className="min-h-[150px] w-2/5 bg-white rounded-md p-2 text-zinc-700  border border-zinc-200 placeholder-zinc-800 focus:outline-none "
      />

<div 
        ref={scrollContainerRef} 
        className="flex flex-wrap gap-2 border border-zinc-200 max-h-[150px] overflow-y-auto w-3/5 p-2 bg-white rounded-md"
      >
        {sharedArray.map((email, index) => (
          <div key={index} className="flex items-center bg-zinc-200  h-fit rounded px-2 py-1">
            <span className="text-sm mr-2">{email}</span>
            <button
              onClick={() => deleteEmail(index)}
              className="h-5 w-5 rounded-full bg-red-600 text-white p-0 flex items-center justify-center"
            >
              <Trash2 className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>
      </div>
      <button 
        onClick={processEmails} 
        className="w-full bg-blue-500 text-white  py-2 px-4 rounded-md transition-colors"
      >
        Process Emails
      </button>
     
    </div>
  );
}
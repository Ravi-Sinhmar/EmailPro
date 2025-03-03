import React from 'react';
import { Loader2 } from 'lucide-react'; 

export default function LoaderComponent() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="flex flex-col items-center">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
        <p className="mt-2 text-white">Loading...</p>
      </div>
    </div>
  );
}
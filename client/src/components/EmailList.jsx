import React from 'react';
import { selectEmail } from '@/states/atoms/auth';
import { useSetRecoilState } from 'recoil';

export default function EmailList({ emails, onSelectEmail, getStatusColor }) {
  const setIsSelectEmail = useSetRecoilState(selectEmail)
  return (
    <div className="h-[450px] overflow-y-auto pr-2 ">
      {emails.map(email => (
        <div key={email.id} className="mb-2 last:mb-0">
          <div 
            className="flex items-center space-x-4 p-4 text-zinc-800 hover:text-black hover:bg-zinc-100 cursor-pointer border border-zinc-700 rounded-lg transition-all duration-200 ease-in-out hover:shadow-md" 
            onClick={() => {
              onSelectEmail(email);
              setIsSelectEmail(true);
            }}
          >
            <div className={`w-3 h-3 rounded-full ${getStatusColor(email.status)}`} />
            <div className="flex-1">
            <p className="text-md font-semibold line-clamp-2"><span>Subject : </span>{email.subject}</p>
              <p className="font-normal text-sm text-gray-500"> <span>To : </span>{email.to}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
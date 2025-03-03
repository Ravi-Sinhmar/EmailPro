import React from 'react';
import EmailAttachments from './EmailAttachments';
import {selectEmail} from '../states/atoms/auth'
import { useRecoilState, useSetRecoilState } from 'recoil';

export default function EmailDetails({ email }) {
  if (!email) return null;
  const setIsSelectEmail = useSetRecoilState(selectEmail);

  function handleCancel(){
    setIsSelectEmail(false);
  }
  
  return (
      <div style={{margin : '0'}} className="bg-white-200 h-[560px] bg-white w-full text-black  flex flex-col p-6 rounded-lg shadow-xl m-0">
        <div className="flex flex-col  overflow-hidden space-y-4">
          <div className="space-y-1">
            <div className='flex justify-between'>
            <p className='text-lg text-gray-600 font-normal'><span className=''>Subject : </span>{email.subject}</p>
            <p className={`font-semibold ${email.status === 'replied' ? 'text-green-400' : 'text-blue-600'}`}>
               {email.status.toUpperCase()}
            </p>
            </div>
            <p className='text-gray-600'> <span>To : </span>{email.to}</p>
            <p className='text-gray-600'> {new Date(email.messages[email.messages.length-1].sentAt).toLocaleString()}</p>
          
          </div>
          <div className="flex-grow overflow-hidden">
            <div className="h-[calc(80vh-250px)] pr-4  rounded-md p-2 pb-8 overflow-y-auto">
              <div className="space-y-4">
                {email.attachments && email.attachments.length > 0 && 
                  <EmailAttachments attachments={email.attachments} />
                }
                {email.messages && email.messages.length > 0 && (
                  <>
              
                    {email.messages.map((reply, index) => (
                      <div key={index} className="mt-2 p-2 bg-gray-100 rounded-md">
                        <div className='flex items-center justify-between  mb-1'>
                         <div className='flex justify-center gap-2 items-center'>
                         <p className='text-zinc-500 text-xs'>Sent By:</p>
                         <p className="text-xs text-zinc-500">{reply.from}</p>
                         </div>
                          <p className="text-xs text-zinc-500">{new Date(reply.sentAt).toLocaleString()}</p>
                        </div>
                        <div className="text-zinc-500 whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: reply.content }}></div>
                        {reply.attachments && reply.attachments.length > 0 && 
                          <EmailAttachments attachments={reply.attachments} />
                        }
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
          <br />
        </div>
        <div className="mt-6 ">
       
        <div className='flex gap-2 items-center'>
        <button onClick={handleCancel} className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-blue-600">
          Cancel
        </button>
       
        </div>
      </div>
      </div>
    
  );
}
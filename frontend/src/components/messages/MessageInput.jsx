import { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
  
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage()

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(!message) return;
    await sendMessage(message);
    setMessage("")
  }

  return (
    <form onSubmit={handleSubmit} className="w-1/2 px-4 my-3">
        <div className="w-full relative">
            <input type="text" placeholder="send a message" 
            className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white" 
            value={message} onChange={(e) => setMessage(e.target.value)}/>
            <button type="submit" className="absolute inset-y-0 end-0 flex items-center pe-3">
              {loading ? <span className="loading loading-spinner mx-auto"></span> : <BsSend className="text-white" />}
            </button>
        </div>
    </form>
  )
}

export default MessageInput

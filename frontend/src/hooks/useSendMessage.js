import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import useConversation from "../zustand/useConversation";
import { useState } from "react";

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation} = useConversation()
    const { url } = useAuthContext();

    const sendMessage = async (message) => {
        setLoading(true);
        try {
            const res = await fetch(`${url}/api/messages/send/${selectedConversation._id}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({message}),
				credentials: 'include'
			})
            const data = await res.json();
            if(data.error) {
                throw new Error(data.error)
            }
            setMessages([...messages,data])
        } catch (error) {
            toast.error(error.message);
        } finally {
			setLoading(false);
		}
    }

    return { loading, sendMessage };
}

export default useSendMessage;
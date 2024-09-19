import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import useConversation from "../zustand/useConversation";
import { useEffect, useState } from "react";

const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation} = useConversation()
    const { url } = useAuthContext();

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true);
            try {
                const res = await fetch(`${url}/api/messages/${selectedConversation._id}`,{credentials: 'include'})

                const data = await res.json();
                if(data.error) {
                    throw new Error(data.error)
                }
                setMessages(data)
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        }

        if(selectedConversation?._id) getMessages()
    },[selectedConversation?._id, setMessages])

    

    return { loading, messages };
}

export default useGetMessages;
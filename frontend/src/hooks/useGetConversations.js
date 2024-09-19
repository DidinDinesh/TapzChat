import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";


const useGetConversation = () => {
	const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([])
    const { url } = useAuthContext();

    useEffect(() => {
        const getConversation = async () => {
            setLoading(true)
            try {
                const res = await fetch(`${url}/api/users`, {credentials: 'include'});
                const data= await res.json()
                if(data.error) {
                    throw new Error(data.error)
                }
                setConversations(data)
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false)
            }
        }

        getConversation()
    },[])

	

	return { loading, conversations };
};
export default useGetConversation;

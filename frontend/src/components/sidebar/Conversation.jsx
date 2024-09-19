import useGetConversation from "../../hooks/useGetConversations"
import { getRandomEmoji } from "../../utils/emoji";
import SingleConversation from "./SingleConversation"


const Conversation = () => {

  const { loading, conversations } = useGetConversation()

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation, idx) => (
        <SingleConversation 
        key={conversation._id} 
        conversation={conversation} 
        emoji={getRandomEmoji()} 
        lastIdx={idx === conversations.length - 1}
        />
      ))}
      {loading ? <span className="loading loading-spinner mx-auto"></span> : null}
    </div>
  )
}

export default Conversation

import { ChatPageContext } from "@src/pages/ChatsPage/ChatsPage"
import { useContext } from "react"

export default function ChatInfo(props) {
    const {handleCloseButton} = useContext(ChatPageContext)
    
    return (
        <div className="min-w-96 w-1/5 bg-gray-400">
            <button onClick={handleCloseButton}>Закрыть</button>
        </div>
    )
}
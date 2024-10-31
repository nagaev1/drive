import { ChatPageContext } from "@src/pages/ChatsPage/ChatsPage"
import { useContext } from "react"

export default function MessageSearch(props) {
    const {handleCloseButton} = useContext(ChatPageContext)

    return (
        <div className="bg-teal-50 flex flex-col min-w-96 w-1/3">
            <button onClick={handleCloseButton}>Назад</button>
            ПОиск сообщение
        </div>
    )
}
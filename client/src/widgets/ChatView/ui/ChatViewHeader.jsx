import { ChatPageContext } from "@src/pages/ChatsPage/ChatsPage"
import { useContext } from "react"

export default function ChatViewHeader(props) {
    const {handleSearchButton, handleInfoButton} = useContext(ChatPageContext)
    
    return (
        <div className="h-10 bg-zinc-200">
            <div className="flex h-full items-center justify-between">
                <div className="">
                    <div className="">
                        имя
                    </div>
                    <div className="">
                        Время
                    </div>

                </div>
                <div className="">
                    <button onClick={handleSearchButton}>ПОиск</button>
                    <button onClick={handleInfoButton}>Инфа</button>
                </div>
            </div>
        </div>
    )
}
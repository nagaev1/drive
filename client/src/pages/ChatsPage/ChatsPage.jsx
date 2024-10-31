import ChatsList from "@src/widgets/ChatsList/ChatsList"
import Layout from "../layout"
import ChatView from "@src/widgets/ChatView/ChatView"
import Sidebar from "@src/widgets/Sidebar/Sidebar"
import ChatInfo from "@src/widgets/ChatInfo/ChatInfo"
import MessageSearch from "@src/widgets/MessageSearch/MessageSearch"
import { useState, createContext } from "react"
import SwitchComponents from "@src/shared/ui/SwitchComponents"

export const ChatPageContext = createContext()

const CHAT_LIST = 'chatList'
const MESSAGE_SEARCH = 'messageSearch'
const CHAT_VIEW = 'chatView'
const CHAT_INFO = 'chatInfo'

const defaultViews = {
    view1: 'chatList',
    view2: 'chatView',
    view3: null,
}
export default function ChatsPage(props) {
    const [views, setViews] = useState(defaultViews)

    const chatListContext = {
    }
    const MessageSearchContext = {
        handleCloseButton: () => { setViews({ ...views, view1: CHAT_LIST }) },
    }
    const ChatViewContext = {
        handleSearchButton: () => { setViews({ ...views, view1: MESSAGE_SEARCH }) },
        handleInfoButton: () => { setViews({ ...views, view3: CHAT_INFO }) }
    }
    const ChatInfoContext = {
        handleCloseButton: () => { setViews({ ...views, view3: null }) },
    }

    return (
        <Layout>
            <Sidebar />
            <div className=" flex justify-between flex-grow">
                <SwitchComponents active={views.view1}>
                    <ChatPageContext.Provider name={CHAT_LIST} value={chatListContext}>
                        <ChatsList />
                    </ChatPageContext.Provider>
                    <ChatPageContext.Provider name={MESSAGE_SEARCH} value={MessageSearchContext}>
                        <MessageSearch />
                    </ChatPageContext.Provider>
                </SwitchComponents>

                <SwitchComponents active={views.view2}>
                    <ChatPageContext.Provider name={CHAT_VIEW} value={ChatViewContext}>
                        <ChatView />
                    </ChatPageContext.Provider>
                </SwitchComponents>

                <SwitchComponents active={views.view3}>
                    <ChatPageContext.Provider name={CHAT_INFO} value={ChatInfoContext}>
                        <ChatInfo />
                    </ChatPageContext.Provider>
                </SwitchComponents>
            </div>
        </Layout>
    )
}
import Button from "@src/shared/ui/Button"
import { MdChatBubble } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import Avatar from "@src/shared/ui/Avatar";

export default function Sidebar(props) {
    return (
        <div className="bg-th-bg-secondary w-16 lg:block hidden shadow-lg">
            <div className="flex flex-col items-center justify-between p-2 h-full">
                <div className="w-full flex flex-col gap-2">
                    <SideBarButton>
                        <MdChatBubble className="size-full" />
                    </SideBarButton>
                    <SideBarButton>
                        <MdChatBubble className="size-full" />
                    </SideBarButton>
                </div>
                <div className="w-full flex flex-col gap-2">
                    <SideBarButton>
                        <IoSettingsSharp className="size-full" />
                    </SideBarButton>
                    <Avatar className="" />
                </div>
            </div>
        </div>
    )
}

function SideBarButton ({children}) {
    return <Button className=" aspect-square w-full rounded-full">{children}</Button>
}



// export default function Sidebar(props) {
//     const [expanded, setExpanded] = useState(false)

//     function SideBarButton() {
//         return (
//             <Button className=" p-4 w-full rounded-full  justify-center items-center h-full" onClick={() => setExpanded(!expanded)}>
//                 {expanded ?
//                     <LuChevronFirst className="w-full h-full" />
//                     : <FaBars className="w-full h-full" />
//                 }
//             </Button>)
//     }

//     return (
//         <div className={`flex justify-between absolute h-screen ${expanded ? 'w-full' : null}`}>
//             <div className={`h-full overflow-hidden transition-all bg-slate-200 ${expanded ? "w-96" : 'w-16'}`}>
//                 <div className="size-16 p-3">
//                     <SideBarButton />
//                 </div>
//                 <div className="p-3 flex">
//                     <Avatar className="w-16" />
//                     <div className="h-full">Имя</div>
//                 </div>
//             </div>
//             <div className={`bg-black transition-opacity ${expanded ? "flex-grow opacity-50" : 'opacity-0'}`} onClick={() => setExpanded(!expanded)} />
//         </div>
//     )
// }
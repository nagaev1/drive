import { FaFolder } from "react-icons/fa";

export default function FileListItem(props) {
    
    return (
        <div className="grid grid-cols-8 text-xl">
            <div className="flex gap-2 items-center col-span-5">
                <FaFolder className="" />
                Название
            </div>
            <div className="">я</div>
            <div className="">21.10.2024</div>
        </div>
    )
}
import FileIcon from "@src/shared/ui/FileIcon";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { FaEllipsisVertical } from "react-icons/fa6";

export default function FileGridItem(props) {

    return (
        <div
            data-selected={props.selected ? true : null}
            className=" data-[selected]:bg-th-bg-medium flex flex-col pb-2 rounded-lg size-40 lg:size-52 aspect-square text-th-text-primary bg-th-bg-secondary shadow-lg hover:bg-th-bg-light transition-colors"
            onClick={(e) => props.onCLick?.(e,props.file)}
            onDoubleClick={() => props.onDoubleClick?.(props.file)}
            onContextMenu={(e) => props.onContextMenu?.(e, props.file)}
        >
            <div className=" py-2 px-4 select-none flex gap-2 items-center">
                <div>
                    <FileIcon className="size-4" icon={props.file.type || "folder"} />
                </div>
                <span className="text-ellipsis text-nowrap overflow-hidden">{props.file.name}</span>
            </div>
            {props.file.data ? 
                <div className=" p-2 overflow-hidden">
                    <div>
                        <img src={props.file.data}/>
                    </div>
                </div>
            :
            <FileIcon className=" flex-grow w-full p-8" icon={props.file.type || "folder"} />}
        </div>
    )
}

// function FileMenu() {
//     return (
//         <Menu>
//             <div className="p-1">
//                 <MenuButton className="size-6 p-0.5 rounded-full data-[hover]:bg-th-bg-light data-[open]:bg-bg-th-bg-secondary transition-colors">
//                     <FaEllipsisVertical className="size-full" />
//                 </MenuButton>
//             </div>
//             <MenuItems
//                 transition
//                 anchor="bottom start"
//                 className="w-52 origin-top-right px-1.5 py-1.5 rounded-lg bg-th-bg-secondary transition duration-1000 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
//             >
//                 <MenuItem>
//                     <button className="text-start w-full rounded-lg py-1.5 px-3 data-[focus]:bg-th-bg-primary">
//                         Переименовать
//                     </button>
//                 </MenuItem>
//                 <MenuItem>
//                     <button className="text-start w-full rounded-lg py-1.5 px-3 data-[focus]:bg-th-bg-primary">
//                         Скачать
//                     </button>
//                 </MenuItem>
//                 <MenuItem>
//                     <button className="text-start w-full rounded-lg py-1.5 px-3 data-[focus]:bg-th-bg-primary">
//                         Удалить
//                     </button>
//                 </MenuItem>
//             </MenuItems>
//         </Menu>
//     )
// }
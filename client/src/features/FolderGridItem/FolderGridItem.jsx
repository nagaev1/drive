import FileIcon from "@src/shared/ui/FileIcon";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { FaEllipsisVertical } from "react-icons/fa6";

export default function FolderGridItem(props) {

    return (
        <div
            data-selected={props.selected ? true : null}
            className=" data-[selected]:bg-th-bg-medium flex flex-col pb-2 rounded-lg w-40 lg:w-52 text-th-text-primary bg-th-bg-secondary shadow-lg hover:bg-th-bg-light transition-colors"
            onClick={(e) => props.onCLick?.(e, props.file)}
            onDoubleClick={(e) => props.onDoubleClick?.(e,props.file)}
            onContextMenu={(e) => props.onContextMenu?.(e, props.file)}
        >
            <div className=" py-2 px-4 select-none flex gap-2 items-center">
                <div>
                    <FileIcon className="size-4" icon={"folder"} />
                </div>
                <span className="text-ellipsis text-nowrap overflow-hidden">{props.file.name}</span>
            </div>
        </div>
    )
}
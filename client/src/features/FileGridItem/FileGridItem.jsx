import { FaFolder } from "react-icons/fa";
import FileIcon from "@src/shared/ui/FileIcon";

export default function FileGridItem(props) {

    return (
        <div className="p-1 flex flex-col rounded-lg size-40 lg:size-52 aspect-square cursor-pointer bg-th-bg-secondary shadow-lg hover:bg-th-bg-medium transition-colors" onClick={() => props.onCLick?.(props.file)}>
            <div className="flex justify-between p-1">
                <span className="text-lg">{props.file.name}</span>
                <button>ДОп</button>
            </div>
            <FileIcon className=" flex-grow w-full p-8 text-th-bg-dark" icon={props.file.type} />
        </div>
    )
}
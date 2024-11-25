import { useContext, useState } from "react"
import { DrivePageContext } from "@src/pages/DrivePage/DrivePage"
import { IoClose } from "react-icons/io5";
import { FaSave } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import FileIcon from "@src/shared/ui/FileIcon"
import formatBytes from "@src/shared/helpers/formatBytes";
import TextField from "@src/shared/ui/TextField";

export default function FileInfo(props) {
    const [nameEditing, setNameEditing] = useState(false)
    const { handleClose, file } = useContext(DrivePageContext)

    function handleEditButton() {
        setNameEditing(!nameEditing)
    }

    return (
        <div className=" bg-th-bg-secondary shadow-lg h-full text-th-text-primary">
            <div className="flex justify-between items-center">
                {nameEditing ?
                    <div className="p-3"><TextField className="w-full text-xl" defaultValue={file.name} /></div>
                    :
                    <div className="flex gap-2 items-center p-4">
                        <FileIcon className="size-6" icon={file.type} />
                        <span className="text-xl">
                            {file.name}
                        </span>
                    </div>
                }
                <div className="flex justify-end items-center gap-4">
                    <button onClick={handleEditButton} className=" size-8">
                        {nameEditing ?
                            <FaSave className=" size-full" />
                            :
                            <FaEdit className=" size-full" />
                        }
                    </button>
                    <button onClick={handleClose} className=" size-8"><IoClose className=" size-full" /></button>
                </div>
            </div>
            <div className="grid gap-8 border-t-4 border-th-bg-primary p-4">
                <span className="text-xl">Сведения о файле</span>
                <div className=" grid">
                    <span className=" text-sm">Владелец</span>
                    <span className="text-xl">{file.owner}</span>
                </div>
                <div className=" grid">
                    <span className=" text-sm">Тип</span>
                    <span className="text-xl">{file.type}</span>
                </div>
                <div className=" grid">
                    <span className=" text-sm">Размер</span>
                    <span className="text-xl">{formatBytes(file.size)}</span>
                </div>
            </div>
        </div>
    )
}
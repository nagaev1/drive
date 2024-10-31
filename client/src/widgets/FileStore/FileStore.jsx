import FileListItem from "@src/features/FileListItem/FileListItem"
import FileGridItem from "@src/features/FileGridItem/FileGridItem"
import getFiles from "./api/getFiles"
import { useEffect, useState, useContext } from "react"
import { DrivePageContext } from "@src/pages/DrivePage/DrivePage"

export default function FileStore(props) {
    const [files, setFiles] = useState([])
    const {handleFileClick} = useContext(DrivePageContext)
    
    useEffect(() => {
        setFiles(getFiles())
    }, [])
       
    
    return (
        <div className="">
            <div className=" flex gap-4 flex-wrap m-auto p-4">
                {files.map((el, i) => <FileGridItem key={i} file={el} onCLick={handleFileClick} />)}
            </div>
            {/* <div className="border-t-2 border-black">
                <div className="grid grid-cols-8 text-xl">
                    <span className=" col-span-5">Название</span>
                    <span>Владелец</span>
                    <span>Последнее изменение</span>
                    <span>Размер</span>
                </div>
                <FileListItem />
            </div> */}
        </div>
    )
}
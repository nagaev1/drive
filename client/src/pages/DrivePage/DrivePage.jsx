import Layout from "../layout";
import FileSearch from "@src/widgets/FileSearch/FileSearch";
import FileStore from "@src/widgets/FileStore/FileStore";
import FileInfo from "@src/widgets/FileInfo/FileInfo";
import { useState, createContext } from "react"

export const DrivePageContext = createContext()

export default function DrivePage(props) {
    const [selectedFile, setSelectedFile] = useState()

    function handleFileClick(file) {
        setSelectedFile(file)
    }

    function handleClose() {
        setSelectedFile(null)
    }

    return (
        <Layout>
            <FileSearch />
            <div className="flex h-full">
                <div className="flex-grow">
                    <DrivePageContext.Provider value={{ handleFileClick }}>
                        <FileStore />
                    </DrivePageContext.Provider>
                </div>
                <DrivePageContext.Provider value={{ handleClose, file: selectedFile }}>
                    {selectedFile ?
                        <div className="w-80">
                            <FileInfo />
                        </div>
                        : null}
                </DrivePageContext.Provider>
            </div>
        </Layout>
    )
}
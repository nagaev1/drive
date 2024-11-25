import Layout from "../Layout";
import FileSearch from "@src/widgets/FileSearch/FileSearch";
import FileStore from "@src/widgets/FileStore/FileStore";
import FileInfo from "@src/widgets/FileInfo/FileInfo";
import { useState, createContext, useEffect } from "react"

export const DrivePageContext = createContext()

export default function DrivePage(props) {
    const [selectedFile, setSelectedFile] = useState({})
    
    return (
        <Layout>
            <div className=" h-svh flex flex-col">
                <FileSearch />
                <div className="flex justify-between flex-grow">
                    <div className=" overflow-y-auto max-h-full w-full relative">
                        <DrivePageContext.Provider value={{ selectedFile, setSelectedFile}}>
                            <FileStore />
                        </DrivePageContext.Provider>
                    </div>
                    {/* { <DrivePageContext.Provider value={{ handleClose, file: selectedFile }}>
                        {selectedFile ?
                            <div className=" min-w-96 fixed right-0">
                                <FileInfo />
                            </div>
                            : null}
                    </DrivePageContext.Provider> } */}
                </div>
            </div>
        </Layout>
    )
}


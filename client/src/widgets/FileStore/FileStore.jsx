import FolderGridItem from "@src/features/FolderGridItem/FolderGridItem"
import FileGridItem from "@src/features/FileGridItem/FileGridItem"
import { useEffect, useState, useContext, useCallback } from "react"
import { DrivePageContext } from "@src/pages/DrivePage/DrivePage"
import useContextMenu from "@src/shared/hooks/ContextMenuHook"
import { FaUpload } from "react-icons/fa";
import ModalRename from "./ui/ModalRename"
import ModalFolderCreate from "./ui/ModalFolderCreate"
import Modal from "@src/shared/ui/Modal"
import fetchDeleteData from "./api/fetchDeleteData"

import fetchGetData from "./api/fetchGetData"
import fetchDownloadtFile from "./api/fetchDownloadFile"
import fetchUploadFile from "./api/fetchUploadFile"
import fetchFolderCreate from "./api/fetchFolderCreate"
import fetchRenameData from "./api/fetchRenameData"
import { useDropzone } from 'react-dropzone'
import { useSearchParams } from "react-router-dom"
import { Link } from "react-router-dom"


export default function FileStore(props) {
    const [files, setFiles] = useState([])
    const [folders, setFolders] = useState([])
    const { selectedFile, setSelectedFile } = useContext(DrivePageContext)
    const { clicked, setClicked, position, setPosition } = useContextMenu()
    const [modalRename, setModalRename] = useState(false)
    const [modalFolderCreate ,setModalFolderCreate] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams();
    const [modalFileViewer, setModalFileViewer] = useState(false)
    const onDrop = useCallback(handleUpload, [])

    const folderParam = searchParams.get('folder') ? "?folder=" + searchParams.get('folder') : null
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, noClick: true })
    async function getData(param) {
        fetchGetData("api/folders" + (param || folderParam || " "))
            .then((data) => setFolders(data || null))
        fetchGetData("/api/files" + (param || folderParam || " "))
            .then((data) => setFiles(data || null))
    }

    function handleFileClick(e, file) {
        e.stopPropagation()
        setSelectedFile(file)
    }

    async function handleFileDoubleClick(file) {
        await setSelectedFile(file)
        await setModalFileViewer(true)
    }

    async function handleFolderDoubleClick(e, folder) {
        searchParams.set('folder', folder.id)
        setSearchParams(searchParams)
        await setFiles([])
        await setFolders([])
        getData("?folder=" + folder.id)
    }

    function handleBgClick(e) {
        setSelectedFile({})
    }

    function handleBgContextMenu(e) {
        e.preventDefault()
        e.stopPropagation()
        setSelectedFile({})
        setPosition({ x: e.clientX, y: e.clientY })
        setClicked(true)
    }

    function handleFileContextMenu(e, file) {
        e.preventDefault()
        e.stopPropagation()
        setSelectedFile(file)
        setPosition({ x: e.clientX, y: e.clientY })
        setClicked(true)
    }

    async function handleRenameSubmit(e) {
        e.preventDefault()
        if (selectedFile) {
            await fetchRenameData(e, `/api/${Object.hasOwn(selectedFile, "type") ? "files" : 'folders'}/${selectedFile.id}/rename`)
            await getData()
        }
    }

    async function handleFolderCreateSubmit(e) {
        e.preventDefault()
        await fetchFolderCreate(e, searchParams.get('folder'))
        getData()
    }

    async function handleDelete(e) {
        if (selectedFile) {
            await fetchDeleteData(`/api/${Object.hasOwn(selectedFile, "type") ? "files" : 'folders'}/${selectedFile.id}`)
            await getData()
        }
    }

    async function handleDownload() {
        if (selectedFile) {
            await fetchDownloadtFile(selectedFile.id, selectedFile.name)
        }
    }

    async function handleUpload(acceptedFiles) {
        console.log(searchParams.get('folder'));
        await fetchUploadFile(acceptedFiles, searchParams.get('folder') || null)
        await getData()
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            {clicked ?
                <ContextMenu
                    open={clicked}
                    x={position.x}
                    y={position.y}
                    data={selectedFile}
                    onRename={() => setModalRename(true)}
                    onFolderCreate={() => setModalFolderCreate(true)}
                    onDelete={handleDelete}
                    onDownload={handleDownload}
                />
                : null}
            <div {...getRootProps()} className="h-full">
                <input {...getInputProps()} />
                {
                    isDragActive ?
                        <div className="absolute h-full bg-black/10 w-full flex justify-center items-center">
                            <FaUpload className=" size-96 text-th-text-primary" />
                        </div>
                        :
                        null
                }

                <div className="h-full" onClick={handleBgClick} onContextMenu={handleBgContextMenu}>
                    <div className=" p-4 text-3xl">
                        <Link to="/drive" onClick={() => getData("/")}>Мой диск</Link> {folders.length !== 0 ? folders.find((el) => el.id === Number(searchParams.get('folder')))?.name : null}
                    </div>
                    <h1 className="p-4 text-xl">Папки</h1>
                    <div className=" w-full -z-20 flex gap-4 flex-wrap p-4">
                        {folders.map((el, i) => <FolderGridItem
                            {...(selectedFile && selectedFile.id == el.id && selectedFile.type === el.type ? { selected: true } : {})}
                            key={i}
                            file={el}
                            onCLick={handleFileClick}
                            onDoubleClick={handleFolderDoubleClick}
                            onContextMenu={handleFileContextMenu} />)}
                    </div>
                    <h1 className="p-4 text-xl">Файлы</h1>
                    <div className=" w-full flex gap-4 flex-wrap p-4">
                        {files.map((el, i) => <FileGridItem
                            {...(selectedFile && selectedFile.id == el.id && selectedFile.type === el.type ? { selected: true } : {})}
                            key={i}
                            file={el}
                            onCLick={handleFileClick}
                            onDoubleClick={handleFileDoubleClick}
                            onContextMenu={handleFileContextMenu} />)}
                    </div>
                </div>

                <ModalRename onSubmit={handleRenameSubmit} defaultValue={selectedFile.name} open={modalRename} onClose={() => setModalRename(false)} />
                <ModalFolderCreate onSubmit={handleFolderCreateSubmit} open={modalFolderCreate} onClose={() => setModalFolderCreate(false)} />
                <ModalFileViewer open={modalFileViewer} onClose={() => setModalFileViewer(false)} title={selectedFile.name} file={selectedFile} />
            </div>
        </>
    )
}

function ContextMenu(props) {

    return (
        <div
            className="w-52 z-30 origin-top absolute px-1.5 py-1.5 rounded-lg bg-th-bg-secondary"
            style={{ left: Math.min(props.x ? props.x - 60 : 0, window.innerWidth - 208), top: props.y - 70 }}>
            {Object.keys(props.data).length > 0 ?
                <>
                    <button className="text-start w-full rounded-lg py-1.5 px-3 hover:bg-th-bg-primary" onClick={props.onRename}>
                        Переименовать
                    </button>
                    {Object.hasOwn(props.data, 'type') ?
                        <button onClick={props.onDownload} className="text-start w-full rounded-lg py-1.5 px-3 hover:bg-th-bg-primary">
                            Скачать
                        </button>
                        : null
                    }
                    <button className="text-start w-full rounded-lg py-1.5 px-3 hover:bg-th-bg-primary" onClick={props.onDelete}>
                        Удалить
                    </button>
                </>
                :
                <>
                    <button className="text-start w-full rounded-lg py-1.5 px-3 hover:bg-th-bg-primary" onClick={props.onFolderCreate}>
                        Создать папку
                    </button>
                </>
            }

        </div>
    )
}

function ModalFileViewer(props) {
    const [file, setFile] = useState({})

    // async function getFile() {
    //     try {
    //         const response = await fetch(`/api/files/${props.file.id}`, {
    //           method: "GET",
    //           headers: {
    //             authorization: `Bearer ${localStorage.getItem("token")}`,
    //           },
    //         });

    //         if (!response.ok) {
    //           const errorData = await response.json();
    //           const errorMessage =
    //             errorData.error || errorData.errors || "Get files failed";
    //           throw new Error(errorMessage);
    //         }

    //         const binaryData = await response.arrayBuffer();
    //         const base64 = btoa(String.fromCharCode(...new Uint8Array(binaryData)));
    //         const binaryString = atob(base64);
    //         const dataUrl = `data:video/mp4;base64,${base64}`;
    //         var blob = new Blob([binaryString], {type: "video/mp4"});
    //         const url = window.URL.createObjectURL(blob);
    //         console.log(url);
    //         setFile(url)
    //     } catch (err) {
    //         throw(err)
    //     }
    // }

    // useEffect(() => {
    //     if (Object.keys(props.file).length !== 0 && props.file.type !== "image")
    //         getFile()
    // }, [props.file])






    if (props.open)
        return (
            <Modal open={props.open} onClose={props.onClose} title={props.file.name} >
                <div className="p-4">
                    {
                        (() => {
                            switch (props.file.type) {
                                case "image":
                                    return <img className="w-full" src={props.file.data} />
                                // case "video":
                                // return <video src={file} width="320" height="240" controls>
                                // </video>;
                                // case 3:
                                // return <div>1</div>;
                                default: return null;
                            }
                        })()
                    }
                </div>
            </Modal>
        )
}
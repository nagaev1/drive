import FileSearchForm from "@src/features/FileSearchForm/FileSearchForm"

export default function FileSearch(props) {
    
    return (
        <div className="p-4 bg-th-bg-secondary shadow-lg">
            <div className=" w-96 lg:mx-0 mx-auto max-w-full">
                <FileSearchForm />
            </div>
        </div>
    )
}
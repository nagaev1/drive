import { useState, useRef, useEffect } from "react"
import Modal from "@src/shared/ui/Modal"
import TextField from "@src/shared/ui/TextField"
import Button from "@src/shared/ui/Button"

export default function ModalRename(props) {
    const [value, setValue] = useState()
    const inputRef = useRef(null)

    useEffect(() => {
        setValue(props.defaultValue)
    },[props.defaultValue])
    
    useEffect(() => {
        // if (props.open)
            // inputRef.current.focus()
        // console.log(inputRef);
    }, [props.open])

    function handleChange(e) {
        setValue(e.target.value)
    }
    
    return (
        <Modal open={props.open} onClose={props.onClose} title="Переименовать">
            <div className="p-4">
                <form onSubmit={props.onSubmit}>
                    <TextField name="newName" inputRef={inputRef} className="w-full" value={value || ""} onChange={handleChange} />
                    <div className="mt-4 justify-end flex gap-2">
                        <Button type="button" onClick={props.onClose}>Отмена</Button>
                        <Button type="submit" onClick={props.onClose}>Ок</Button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}
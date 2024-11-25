import Modal from "@src/shared/ui/Modal"
import TextField from "@src/shared/ui/TextField"
import Button from "@src/shared/ui/Button"

export default function ModalFolderCreate(props) {    

    return (
        <Modal open={props.open} onClose={props.onClose} title="Новая папка">
            <div className="p-4">
                <form onSubmit={props.onSubmit}>
                    <TextField name="name" className="w-full" defaultValue="Новая папка" />
                    <div className="mt-4 justify-end flex gap-2">
                        <Button type="button" onClick={props.onClose}>Отмена</Button>
                        <Button type="submit" onClick={props.onClose}>Ок</Button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}
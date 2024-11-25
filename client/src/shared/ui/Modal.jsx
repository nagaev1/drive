import { IoClose } from "react-icons/io5";
import { Dialog, DialogPanel, DialogTitle, DialogBackdrop } from "@headlessui/react"

export default function Modal(props) {

    return (
        <Dialog open={props.open} as="div" onClose={props.onClose}>
            <DialogBackdrop className="fixed inset-0 bg-black/30 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0" transition />
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <DialogPanel
                    transition
                    className="w-full max-w-md rounded-xl bg-th-bg-secondary duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                >
                    <div className=" flex justify-between items-center p-4">
                        <DialogTitle as="h3" className="text-2xl font-medium">
                            {props.title}
                        </DialogTitle>
                        <button className=" size-8 p-0" onClick={props.onClose}><IoClose className=" size-full" /></button>
                    </div>
                    <div className="mt-2 ">
                        {props.children}
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    )
}
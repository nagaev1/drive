import { Input } from "@headlessui/react";

export default function TextField (props) {

    return (
        <Input type={props.type || "text"} id={props.id} className={`rounded-3xl focus:bg-th-bg-medium font-semibold focus:text-white transition-colors bg-th-bg-primary px-2 py-1 ${props.className}`} defaultValue={props.defaultValue} required={props.required || false} />
    )
}
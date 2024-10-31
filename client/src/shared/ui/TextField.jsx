import { Input } from "@headlessui/react";

export default function TextField (props) {

    return (
        <Input type="text" className={`rounded-3xl px-2 py-1 ${props.className}`} />
    )
}
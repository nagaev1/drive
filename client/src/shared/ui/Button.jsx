import { Button as UIButton } from "@headlessui/react"

export default function Button (props) {
    function handleCLick() {
        props.onClick?.()
    }

    return (
        <UIButton className={`${props.className} text-center bg-th-accent px-2 py-1 text-th-text`} onClick={handleCLick}>
            {props.children}
        </UIButton>
    )
}
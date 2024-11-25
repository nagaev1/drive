import { Button as UIButton } from "@headlessui/react"

export default function Button (props) {
    function handleCLick() {
        props.onClick?.()
    }

    return (
        <UIButton type={props.type} className={`text-center rounded-2xl bg-th-bg-light font-semibold hover:bg-th-bg-medium transition-colors px-2 py-1 text-th-text ${props.className}`} onClick={handleCLick}>
            {props.children}
        </UIButton>
    )
}
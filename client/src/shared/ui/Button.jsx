import { Button as UIButton } from "@headlessui/react"

export default function Button (props) {
    function handleCLick() {
        props.onClick?.()
    }

    return (
        <UIButton type={props.type} className={`${props.className} text-center rounded-2xl bg-th-bg-primary font-semibold hover:bg-th-bg-medium hover:text-white focus:bg-th-bg-medium focus:text-white transition-colors px-2 py-1 text-th-text`} onClick={handleCLick}>
            {props.children}
        </UIButton>
    )
}
import { Input } from "@headlessui/react";

export default function TextField (props) {

    return (
        <Input
        ref={props.inputRef || null}
        name={props.name}
        type={props.type || "text"}
        value={Object.hasOwn(props, 'value') ? props.value : undefined}
        id={props.id}
        defaultValue={props.defaultValue}
        required={props.required || false}
        onChange={(e) => props.onChange?.(e)}
        className={`rounded-3xl focus:bg-th-bg-medium  bg-th-bg-light text-th-text-primary transition-colors font-semibold outline-none  px-2 py-1 ${props.className}`}
        />
    )
}
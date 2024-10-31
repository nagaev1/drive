export default function SwitchComponents({ active, children }) {
    if (Array.isArray(children)) {
        return children.filter(child => child.props.name == active)
    } else if (children.props.name == active) {
        return children
    }
}
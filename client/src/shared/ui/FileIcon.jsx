import { FaFolder } from "react-icons/fa";
import { BsFileTextFill } from "react-icons/bs";

export default function FileIcon(props) {

    switch (props.icon) {
        case ("text file"): return <BsFileTextFill className={props.className} />
        case ("folder"): return <FaFolder className={props.className}/>
        default: return <FaFolder className={props.className}/>
    }
}
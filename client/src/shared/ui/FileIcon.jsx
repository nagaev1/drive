import { FaFolder } from "react-icons/fa";
import { BsFileTextFill } from "react-icons/bs";
import { FaImage } from "react-icons/fa6";

export default function FileIcon(props) {

    switch (props.icon) {
        case ("text file"): return <BsFileTextFill className={props.className} />
        case ("folder"): return <FaFolder className={props.className}/>
        case ("image"): return <FaImage className={props.className}/>
        default: return <BsFileTextFill className={props.className}/>
    }
}
import TextField from "@src/shared/ui/TextField"
import Button from "@src/shared/ui/Button"
import { FaSearch } from "react-icons/fa";
export default function FileSearchForm(props) {

    return (
        <form >
            <fieldset className=" overflow-hidden rounded-3xl flex">
                <TextField className="rounded-e-none text-xl outline-none flex-grow" />
                <Button className="rounded-s-none" ><FaSearch className="text-th-bg-dark" /></Button>
            </fieldset>
        </form>
    )
}
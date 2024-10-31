import TextField from "@src/shared/ui/TextField"
import Button from "@src/shared/ui/Button"
import { FaSearch } from "react-icons/fa";
export default function FileSearchForm(props) {

    return (
        <form >
            <fieldset className=" overflow-hidden rounded-3xl flex">
                <TextField className="rounded-e-none flex-grow bg-th-bg-medium" />
                <Button className="bg-th-bg-medium" ><FaSearch className="text-th-bg-dark" /></Button>
            </fieldset>
        </form>
    )
}
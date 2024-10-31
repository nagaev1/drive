import Sidebar from "@src/widgets/Sidebar/Sidebar"
import BottomMenu from "@src/widgets/BottomMenu/ButtonMenu"
export default function Layout(props) {

    return (
        <div className=" bg-th-bg-primary h-0 min-h-svh">
            <div className="flex lg:flex-row flex-col-reverse h-full">
                <Sidebar />
                <div className="flex-grow">
                    {props.children}
                </div>
                <BottomMenu />
            </div>
        </div>
    )
}
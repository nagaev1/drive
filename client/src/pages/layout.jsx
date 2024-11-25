import Sidebar from "@src/widgets/Sidebar/Sidebar"
import BottomMenu from "@src/widgets/BottomMenu/ButtonMenu"
import Modal from "@src/shared/ui/Modal"
import ModalUserEdit from "@src/widgets/ModalUserEdit/ModalUserEdit"
import { useState } from "react"
export default function Layout(props) {
    const [modalSettings, setModalSettings] = useState(false)
    const [modalUser, setModalUser] = useState(false)

    return (
        <div className="bg-th-bg-primary min-h-svh">
            <div className="lg:block hidden">
                <Sidebar onSettingsClick={() => setModalSettings(true)} onUserClick={() => setModalUser(true)} />
            </div>
            <Modal title="Настройки" open={modalSettings} onClose={() => setModalSettings(false)}>
                <div className="">В процессе</div>
            </Modal>
            <ModalUserEdit title="Настройки профиля" open={modalUser} onClose={() => setModalUser(false)} />
            <div className="lg:ml-16">
                {props.children}
            </div>
            <BottomMenu />
        </div>
    )
}
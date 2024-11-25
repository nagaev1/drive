import Modal from "@src/shared/ui/Modal"
import TextField from "@src/shared/ui/TextField"
import Button from "@src/shared/ui/Button"
import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import fetchLogout from "./api/fetchLogout"
import fetchUserPatch from "./api/fetchUserPatch";

export default function ModalUserEdit(props) {
    const [errors, setErrors] = useState({})
    const navigate = useNavigate();

    async function handleLogout(e) {
        await fetchLogout()
        navigate('/login')
    }

    async function handleUserPatch(e) {
        await fetchUserPatch(e)
    }

    return (
        <Modal title="Настройки профиля" open={props.open} onClose={props.onClose}>
                <div className="mb-4">
                    <form onSubmit={handleUserPatch}>
                    <div className="grid gap-4 p-4">
                            <div className="grid gap-2">
                                <label className=" text-sm select-none" htmlFor="loginField">Логин</label>
                                <TextField defaultValue={localStorage.getItem('name')} name="name" type="text" id="loginField" className=" bg-th-bg-primary" />
                            </div>
                            <div className="grid gap-2">
                                <label className=" text-sm select-none" htmlFor="emailField">Email</label>
                                <TextField defaultValue={localStorage.getItem('email')} name="email" type="email" id="emailField" className=" bg-th-bg-primary"/>
                            </div>
                            <div className="grid gap-2">
                                <label className=" text-sm select-none" htmlFor="passwordField">Новый пароль</label>
                                <TextField name="password" type="password" id="passwordField" className=" bg-th-bg-primary"/>
                                <span className="text-sm text-th-danger">{errors.password ? errors.password : null}</span>
                            </div>
                            <div className="grid gap-2">
                                <label className=" text-sm select-none" htmlFor="passwordConfirmField">Подтверждение пароля</label>
                                <TextField name="password_confirmation" type="password" id="passwordConfirmField" className=" bg-th-bg-primary"/>
                                <span className="text-sm text-th-danger">{errors.passwordConfirm ? errors.passwordConfirm : null}</span>
                            </div>
                            <Button type="submit" className="mt-4">Сохранить</Button>
                            <Button onClick={handleLogout} type="button" className="mt-4">Выйти из аккаунта</Button>
                        </div>
                    </form>
                </div>
            </Modal>
    )
}
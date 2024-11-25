import TextField from "@src/shared/ui/TextField"
import Button from "@src/shared/ui/Button"
import { Link } from "react-router-dom"
import fetchRegister from "./api/fetchRegister"
import validatePassword from "@src/shared/helpers/validatePassword"
import { useState } from "react"
import { useNavigate } from 'react-router-dom';
const loginURL = "/login"

export default function RegisterPage(props) {
    const [errors, setErrors] = useState({})
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault()
        const newErrors = {
            password: validatePassword(e.target.password.value),
            passwordConfirm: e.target.password_confirmation.value !== e.target.password.value ? "Пароли не совпадают" : null
        }
        setErrors(newErrors)
        if (!newErrors.password, !newErrors.passwordConfirm) {
            try {
                const res = await fetchRegister(e)
                localStorage.setItem('token', res.token)
                localStorage.setItem('name', res.user.name)
                localStorage.setItem('email', res.user.email)
                navigate('/drive');
            } catch (err) {
                throw err
            }
        } else {
            !newErrors.passwordConfirm || e.target.password_confirmation.focus()
            !newErrors.password || e.target.password.focus()
            !newErrors.email || e.target.email.focus()
        }
    }

    return (
        <div className="h-0 min-h-svh flex flex-col gap-4 items-center justify-center">
            <h1 className="text-3xl">Регистрация</h1>
            <div className=" bg-th-bg-secondary shadow-xl rounded w-96 max-w-full">
                <div className="p-4">
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <label className=" text-sm select-none" htmlFor="loginField">Логин<sup>*</sup></label>
                                <TextField name="name" type="text" id="loginField" className=" bg-th-bg-primary" required={true} />
                            </div>
                            <div className="grid gap-2">
                                <label className=" text-sm select-none" htmlFor="emailField">Email<sup>*</sup></label>
                                <TextField name="email" type="email" id="emailField" className=" bg-th-bg-primary" required={true} />
                            </div>
                            <div className="grid gap-2">
                                <label className=" text-sm select-none" htmlFor="passwordField">Пароль<sup>*</sup></label>
                                <TextField name="password" type="password" id="passwordField" className=" bg-th-bg-primary" required={true} />
                                <span className="text-sm text-th-danger">{errors.password ? errors.password : null}</span>
                            </div>
                            <div className="grid gap-2">
                                <label className=" text-sm select-none" htmlFor="passwordConfirmField">Подтверждение пароля<sup>*</sup></label>
                                <TextField name="password_confirmation" type="password" id="passwordConfirmField" className=" bg-th-bg-primary" required={true} />
                                <span className="text-sm text-th-danger">{errors.passwordConfirm ? errors.passwordConfirm : null}</span>
                            </div>
                            <Button type="submit" className="mt-4">Зарегестрироваться</Button>
                            <Link className="text-center underline text-th-bg-dark" to={loginURL}>Войти</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
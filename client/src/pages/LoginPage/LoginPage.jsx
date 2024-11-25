import TextField from "@src/shared/ui/TextField"
import Button from "@src/shared/ui/Button"
import fetchLogin from "./api/fetchLogin"
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom';

const registerURL = "/register"

export default function LoginPage(props) {
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault()
        // const newErrors = {
        //     password: validatePassword(e.target.password.value),
        //     passwordConfirm: e.target.password_confirmation.value !== e.target.password.value ? "Пароли не совпадают" : null
        // }
        // setErrors(newErrors)
        // if (!newErrors.password, !newErrors.passwordConfirm) {
            try {
                const res = await fetchLogin(e)
                localStorage.setItem('token', res.token)
                localStorage.setItem('name', res.user.name)
                localStorage.setItem('email', res.user.email)
                navigate('/drive');
            } catch (err) {
                throw err
            }
        // } else {
            // !newErrors.passwordConfirm || e.target.password_confirmation.focus()
            // !newErrors.password || e.target.password.focus()
            // !newErrors.email || e.target.email.focus()
        // }
    }

    return (
        <div className="h-0 min-h-svh flex flex-col gap-4 items-center justify-center">
            <h1 className="text-3xl">Вход</h1>
            <div className=" bg-th-bg-secondary shadow-xl rounded w-96 max-w-full">
                <div className="p-4">
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <label className=" text-sm select-none" htmlFor="emailField">Email</label>
                                <TextField type="email" name="email" id="emailField" className=" bg-th-bg-primary" required={true} />
                            </div>
                            <div className="grid gap-2">
                                <label className=" text-sm select-none" htmlFor="passwordField">Пароль</label>
                                <TextField type="password" name="password" id="passwordField" className=" bg-th-bg-primary" required={true} />
                            </div>
                            <Button type="submit" className="mt-4">Войти</Button>
                        </div>
                    </form>
                    <div className="mt-4 text-center">
                        <Link className=" underline text-th-bg-dark" to={registerURL}>Зарегестрироваться</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
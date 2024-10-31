import TextField from "@src/shared/ui/TextField"
import Button from "@src/shared/ui/Button"
import { Link } from "react-router-dom"

const loginURL = "/login"

export default function RegisterPage(props) {

    return (
        <div className="h-0 min-h-svh flex flex-col gap-4 items-center justify-center">
            <h1 className="text-3xl">Регистрация</h1>
            <div className=" bg-th-bg-secondary shadow-xl rounded w-96 max-w-full">
                <div className="p-4">
                    <form action="/dsdsds" method="post">
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <label className=" text-sm select-none" htmlFor="emailField">Email</label>
                                <TextField type="email" id="emailField" className=" bg-th-bg-primary" required={true} />
                            </div>
                            <div className="grid gap-2">
                                <label className=" text-sm select-none" htmlFor="passwordField">Пароль</label>
                                <TextField type="password" id="passwordField" className=" bg-th-bg-primary" required={true} />
                            </div>
                            <div className="grid gap-2">
                                <label className=" text-sm select-none" htmlFor="passwordConfirmField">Подтверждение пароля</label>
                                <TextField type="password" id="passwordConfirmField" className=" bg-th-bg-primary" required={true} />
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
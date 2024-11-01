import TextField from "@src/shared/ui/TextField"
import Button from "@src/shared/ui/Button"
import { Link } from "react-router-dom"

const registerURL = "/register"

export default function LoginPage(props) {

    return (
        <div className="h-0 min-h-svh flex flex-col gap-4 items-center justify-center">
            <h1 className="text-3xl">Вход</h1>
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
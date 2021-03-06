import styles from "./Login.module.scss"
import { Link } from "react-router-dom";
import headerLogo from "../../../assets/img/headerLogo.svg"
import DefaultButton, { ButtonStyles, ButtonTypes } from "../../../components/DefaultButton/DefaultButton";
import { loginUser } from "../../../store/action-creators/user"
import { useState } from "react";
import cn from "classnames";
import {useActions} from "../../../hooks/useActions";

const Login = () => {
    const [wrongLogin, setWrongLogin] = useState<boolean>(false)
    const { loginUser } = useActions()

    const handleLoginSubmit = async (event: any) => {
        event.preventDefault()
        const { currentTarget } = event;

        loginUser(currentTarget.Login.value, currentTarget.Password.value)
        setWrongLogin(true)
        setTimeout(() => setWrongLogin(false), 3000)

    }

    return (
        <div className={styles.FormContainer} >
            <form className={styles.LoginForm} onSubmit={handleLoginSubmit}>
                <div className={cn(styles.wrongLoginSign, { [styles['wrongLoginSign-active']]: wrongLogin })}>
                    <span>Неверный логин или пароль</span>
                </div>
                <Link to={'/'}>
                    <img src={headerLogo} alt="Логотип СНО ДВГУПС" id="headerLogo" />
                </Link>
                <input className={styles.LoginInput} type="text" name="Login" placeholder="Логин"></input>
                <input className={styles.LoginInput} type="password" name="Password" placeholder="Пароль"></input>
                <DefaultButton text="Войти" style={ButtonStyles.filled} type={ButtonTypes.submit}></DefaultButton>
            </form>
        </div>
    )
}

export default Login;


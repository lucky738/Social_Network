import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { login } from '../../redux/auth-reducer';
import { AppStateType } from '../../redux/redux-store';
import { required } from '../../utils/validators/validators';
import { createField, GetStringKeys, Input } from '../common/FormControls/FormsControls';
import styles from '../common/FormControls/FormsControls.module.css';

type LoginFormOwnProps = {
    captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> =
    ({ handleSubmit, error, captchaUrl }) => {
        return <form onSubmit={handleSubmit}>
            {createField<LoginFormValuesKeysType>("Email", "email", [required], Input)}
            {createField<LoginFormValuesKeysType>("Password", "password", [required], Input,
                { type: "password" })}
            {createField<LoginFormValuesKeysType>(undefined, "rememberMe", [], Input,
                { type: "Checkbox" }, "remember me")}


            {captchaUrl && <img src={captchaUrl} />}
            {captchaUrl && createField<LoginFormValuesKeysType>("Symbols from image", "captcha",
                [required], Input)}

            {error && <div className={styles.formSummaryError} >
                {error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    }

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({ form: 'login' })(LoginForm)


type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

type LoginFormValuesKeysType = GetStringKeys<LoginFormValuesType>

export const LoginPage: React.FC = () => {

    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)

    const dispatch = useDispatch()

    const onSubmit = (formData: LoginFormValuesType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
    }
    if (isAuth) {
        return <Redirect to={"/profile"} />
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
    </div>
}
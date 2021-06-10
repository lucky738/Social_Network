import { FC } from "react"
import { InjectedFormProps, reduxForm } from "redux-form"
import { maxLengthCreator, required } from "../../../utils/validators/validators"
import { createField, Textarea } from "../../common/FormControls/FormsControls"
import { NewMessageFormValuesType } from "../Dialogs"
import s from "../Dialogs.module.css"

const maxLength50 = maxLengthCreator(50)

type NewMessageFormValuesKeysType = Extract<keyof NewMessageFormValuesType, string>

type PropsType = {}

const AddMessageForm: FC<InjectedFormProps<NewMessageFormValuesType, PropsType> & PropsType>
    = (props: any) => {
        return (
            <form onSubmit={props.handleSubmit}>
                <div className={s.addingNewPost}>
                    {createField<NewMessageFormValuesKeysType>("Enter your message", "newMessageBody",
                        [required, maxLength50], Textarea)}
                    <button className={s.send}>send</button>
                </div>
            </form>
        )
    }

export const AddMessageFormRedux = reduxForm<NewMessageFormValuesType, PropsType>({
    form: 'dialogAddMessageForm'
})(AddMessageForm)
import { FC } from "react"
import { InjectedFormProps, reduxForm } from "redux-form"
import { required } from "../../../../utils/validators/validators"
import { createField, GetStringKeys, Textarea } from "../../../common/FormControls/FormsControls"

type PropsType = {}

export type AddPostFormValuesType = {
    newPostText: string
}

type AddPostFormValuesKeysType = GetStringKeys<AddPostFormValuesType>

let AddNewPostForm: FC<InjectedFormProps<AddPostFormValuesType, PropsType> & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<AddPostFormValuesKeysType>("Post message", "newPostText",
                    [required], Textarea)}
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

let AddNewPostFormRedux = reduxForm<AddPostFormValuesType, PropsType>
    ({ form: 'ProfileAddNewPostForm' })(AddNewPostForm)

export default AddNewPostFormRedux
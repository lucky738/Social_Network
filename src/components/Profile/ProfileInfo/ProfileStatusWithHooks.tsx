import React, { ChangeEvent, FC, useEffect, useState } from 'react';

type PropsType = {
    status: string
    updateStatus: (status: string) => void
}

const ProfileStatusWithHooks: FC<PropsType> = (props) => {
    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const acitvateEditMode = () => {
        setEditMode(true)
    }
    
    const deacitvateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    } 

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }
    
    
    return (
        <div>
            {!editMode &&
                <div>
                    <b>My status: </b><span onDoubleClick={acitvateEditMode}>{props.status || "-----"}</span>
                </div>
            }
            {editMode &&
                <div>
                    <b>My status:  </b><input onChange={onStatusChange} 
                           autoFocus={true} 
                           onBlur={deacitvateEditMode}
                           value={status} />
                </div>
            }
        </div>
    );
}

export default ProfileStatusWithHooks;
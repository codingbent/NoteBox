import React from "react";

export const Alert = (props)=>{
    return (
        <div>
            <div className="alert alert-primary" role="Alert">
                {props.msg}
            </div>
        </div>
    )
}
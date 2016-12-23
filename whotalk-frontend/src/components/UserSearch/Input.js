import React from 'react'

const Input = ({onChange, value}) => {
    return (
        <div className="ui input">
            <input
                type="text"
                placeholder="Search Username.."
                onChange={onChange}/>
        </div>
    )
}

export default Input
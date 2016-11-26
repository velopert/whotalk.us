import React from 'react'

const FavoriteButton = ({isFavorite, onClick, pending, hide}) => {

    const style = {
        display: hide ? 'none' : 'inline'
    };

    return (
        <div className={`favorite-button ${isFavorite?'is-favorite':''}`}
            onClick={onClick}
            style={style}
        >
             <i className={`star icon big ${pending?'pending':''}`}></i>
        </div>
    )
}

export default FavoriteButton;
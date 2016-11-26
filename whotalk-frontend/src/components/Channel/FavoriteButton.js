import React from 'react'

const FavoriteButton = ({isFavorite, onClick, pending}) => {
    return (
        <div className={`favorite-button ${isFavorite?'is-favorite':''}`}
            onClick={onClick}>
             <i className={`star icon big ${pending?'pending':''}`}></i>
        </div>
    )
}

export default FavoriteButton;
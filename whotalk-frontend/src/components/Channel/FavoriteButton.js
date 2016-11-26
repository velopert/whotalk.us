import React from 'react'

const FavoriteButton = ({isFavorite, onClick}) => {
    return (
        <div className="favorite-button">
             <i className="star icon big"></i>
        </div>
    )
}

export default FavoriteButton;
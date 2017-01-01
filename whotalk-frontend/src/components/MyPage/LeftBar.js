import React from 'react'


const ListItem = ({selected, onClick, type, style}) => (
    <div 
        className={`item ${selected ? 'active' : ''}`} 
        style={style}
        onClick={onClick}
    >
        <span>
            {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
    </div>
);

const LeftBar = ({onSetType, currentType, onShowUnregister}) => {
    const menus = [
        {
            type: 'account'
        },
        {
            type: 'channel'
        }
    ];

    const menuItems = menus.map(
        (menu, i) => (
            <ListItem
                type={menu.type}
                style={menu.style}
                selected={menu.type === currentType}
                onClick={
                    () => onSetType(menu.type)
                }
                key={i}
            />
        )
    )

    return (
        <div className="four wide column left-bar">
            <div className="menu">
                {menuItems}
                <ListItem
                    type="unregister"
                    style={{color: '#c92a2a'}}
                    onClick={onShowUnregister}
                />
            </div>
        </div>
    )
}

export default LeftBar
import React from 'react';
import { prepareMessages } from 'locale/helper';
import {injectIntl, defineMessages} from 'react-intl';

const messages = prepareMessages({
    "MyPage.LeftBar.account": "Account",
    "MyPage.LeftBar.channel": "Channel",
    "MyPage.LeftBar.unregister": "Unregister"
});

const ListItem = ({selected, onClick, type, text, style}) => (
    <div 
        className={`item ${selected ? 'active' : ''}`} 
        style={style}
        onClick={onClick}
    >
        <span>
            {text}
        </span>
    </div>
);

const LeftBar = ({onSetType, currentType, onShowUnregister, intl: { formatMessage }}) => {
    const menus = [
        {
            text: formatMessage(messages.account),
            type: 'account'
        },
        {
            text: formatMessage(messages.channel),
            type: 'channel'
        }
    ];

    const menuItems = menus.map(
        (menu, i) => (
            <ListItem
                text={menu.text}
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
                    text={formatMessage(messages.unregister)}
                    type="unregister"
                    style={{color: '#c92a2a'}}
                    onClick={onShowUnregister}
                />
            </div>
        </div>
    )
}

export default injectIntl(LeftBar);
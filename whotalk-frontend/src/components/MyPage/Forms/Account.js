import React, { Component } from 'react'

import { prepareMessages } from 'locale/helper';
import {injectIntl, defineMessages} from 'react-intl';
import Dropzone from 'react-dropzone';

const messages = prepareMessages({
    "MyPage.Forms.save": "Save",
    "MyPage.Forms.loading": "Loading",
    "MyPage.Forms.Account.title": "Account",
    "MyPage.Forms.Account.description": "Change your basic account settings",
    "MyPage.Forms.Account.username": "Username",
    "MyPage.Forms.Account.currentPassword": "Current Password",
    "MyPage.Forms.Account.password": "Password",
    "MyPage.Forms.Account.confirmPassword": "Confirm Password",
    "MyPage.Forms.Account.edit": "Edit",
    "MyPage.Forms.Account.email": "Email",
    "MyPage.Forms.Account.name": "Name",
    "MyPage.Forms.Account.givenName": "Given Name",
    "MyPage.Forms.Account.familyName": "Family Name"
});

class Account extends Component {

    constructor(props) {
        super(props);
        this.canvas = null;
    }

    componentDidUpdate(prevProps, prevState) {
        const { onStoreImage } = this.props;

        if(prevProps.file !== this.props.file && this.canvas) {
            const ctx = this.canvas.getContext('2d');
            const url = URL.createObjectURL(this.props.file);
            const img = new Image();
            img.onload = () => {
                let scaledHeight = 0, scaledWidth = 0;
                let left = 0, top = 0;

                const width  = img.naturalWidth  || img.width;
                const height = img.naturalHeight || img.height;

                if(width>height) {
                    scaledHeight = 126;
                    scaledWidth = width * 126 / height;
                    top = 0;
                    left = -(scaledWidth - 126)/2;
                } else {
                    scaledWidth = 126;
                    scaledHeight = height * 126 / width;
                    left = 0;
                    top = -(scaledHeight - 126)/2;
                }

                console.log(width, height);
                ctx.drawImage(img, left, top, scaledWidth, scaledHeight);
                onStoreImage(this.canvas.toDataURL());
            }
            img.src = url;
        }
    }
    
    render() {
        const {
            type,
            username, 
            email,
            givenName, 
            familyName, 
            currentPassword,
            password,
            confirmPassword,
            editPassword,
            onEditPasswordClick,
            onChange,
            loading,
            updating,
            onUpdate,
            error,
            intl: { locale, formatMessage },
            editThumbnailVisibility,
            onSetEditThumbnailVisibility,
            onDrop,
            file,
            image
        } = this.props;

        const familyNameField = (
            <div className={`field ${error.familyName ? 'error' : ''}`}>
                <input 
                    type="text" 
                    name="familyName" 
                    placeholder={formatMessage(messages.familyName)}
                    value={familyName}
                    onChange={onChange}
                />
            </div>
        );

        const givenNameField = (
            <div className={`field ${error.givenName ? 'error' : ''}`}>
                <input 
                    type="text" 
                    name="givenName" 
                    placeholder={formatMessage(messages.givenName)}
                    value={givenName}
                    onChange={onChange}
                />
            </div>
        );

        return (
            <div>
                <div className="top-bar">
                    <p className="title">{formatMessage(messages.title)}</p>
                    <p>{formatMessage(messages.description)}</p>
                </div>
                
                {loading && (
                    <div className="loader-container">
                        <div className="ui active inverted dimmer">
                            <div className="ui text loader huge">{formatMessage(messages.loading)}</div>
                        </div>
                    </div>
                )}
                <div className={`body ${loading?'opacify':''}`}>
                    <div className="ui form huge">

                        { !editThumbnailVisibility && ( 
                            <div className="thumbnail-wrapper">
                                {/*<img className="thumbnail" src={"/api/common/thumbnail/" + username}/>*/}
                                <div className="thumbnail" style={{
                                    background: `url(/api/common/thumbnail/${username}) 0% 0% / cover no-repeat`
                                }}></div>
                                <button className="ui circular pink icon button" onClick={()=>{onSetEditThumbnailVisibility(true)}}><i className="write icon"></i></button>
                            </div>
                        )}

                        { editThumbnailVisibility && ( 
                        <div className="dropzone-wrapper">
                            {
                                file && (
                                    <div>
                                        <canvas className="canvas "ref={(ref)=>{this.canvas = ref}} width="126" height="126">
                                
                                        </canvas>
                                    </div>
                                )
                            }

                            <Dropzone style={null} className="dropzone" activeClassName="active" onDrop={onDrop}>
                                Drag & Drop the file to upload
                            </Dropzone>
                        </div>
                        )}

                        <div className="field">
                            <label className="disabled">{formatMessage(messages.username)} <i className="ban icon"></i></label>
                            <input 
                                disabled type="text" 
                                name="username" 
                                placeholder="Username"
                                value={username}
                            />
                        </div>

                        { editPassword 
                        ? (
                                <div className="animated flipInX" style={{marginBottom: '20px'}}>
                                    <div className={`field ${error.currentPassword ? 'error' : ''}`}>
                                        <label>{formatMessage(messages.currentPassword)}</label>
                                        <input 
                                            type="password" 
                                            name="currentPassword" 
                                            placeholder={formatMessage(messages.currentPassword)}
                                            onChange={onChange}
                                            value={currentPassword}
                                        />
                                    </div>
                                    <div className={`field ${error.password ? 'error' : ''}`}>
                                        <label>{formatMessage(messages.password)}</label>
                                        <input 
                                            type="password" 
                                            name="password" 
                                            placeholder={formatMessage(messages.password)}
                                            onChange={onChange}
                                            value={password}
                                        />
                                    </div>
                                    <div className={`field ${error.confirmPassword ? 'error' : ''}`}>
                                        <label>{formatMessage(messages.confirmPassword)}</label>
                                        <input 
                                            type="password" 
                                            name="confirmPassword" 
                                            placeholder={formatMessage(messages.confirmPassword)}
                                            onChange={onChange}
                                            value={confirmPassword}
                                        />
                                    </div>
                                </div>
                            )
                        : type === 'local' && (
                                <div className="field">
                                    <label>{formatMessage(messages.password)}</label>
                                    <input disabled type="password" name="password" value="password"/>
                                    <div 
                                        className="edit-password"
                                        onClick={onEditPasswordClick}
                                    >
                                        {formatMessage(messages.edit)}
                                    </div>
                                </div>
                            )
                        }
                        
                        <div className={`field ${error.email ? 'error' : ''}`}>
                            <label>{formatMessage(messages.email)}</label>
                            <input 
                                type="text" 
                                name="email" 
                                placeholder={formatMessage(messages.email)}
                                value={email}
                                onChange={onChange}
                            />
                        </div>

                        <div className="field">
                            <label>{formatMessage(messages.name)}</label>
                            <div className="two fields">
                                {locale=== 'ko' ? familyNameField : givenNameField}
                                {locale=== 'ko' ? givenNameField : familyNameField}
                            </div>
                        </div>
                        <div className="btn-container">
                            <button 
                                className={`ui pink huge button ${updating?'loading':''}`}
                                onClick={
                                    () => {
                                        console.log(image);
                                        onUpdate({
                                            currentPassword,
                                            password,
                                            confirmPassword,
                                            email,
                                            givenName,
                                            familyName,
                                            image
                                        });
                                    }
                                }
                            >{formatMessage(messages.save)}</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default injectIntl(Account);
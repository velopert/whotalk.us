import React, {Component} from 'react';

class Sidebar extends Component {
    componentDidMount() {
        $('.circular-button').popup({position: 'bottom center'});
    }

    render() {
        const {open} = this.props;
        return (
            <div
                className={`sidebar ${open
                ? 'open'
                : ''}`}>
                <Top>
                    <ButtonContainer>
                        <SettingsButton/>
                        <SignOutButton/>
                    </ButtonContainer>
                    <Profile>
                        <Circle/>
                        <Info/>
                    </Profile>
                </Top>
                <Bottom>
                   <Followship/>
                   <Notification/>
                </Bottom>
            </div>
        );
    }
}

const Top = ({children}) => (
    <div className="sidebar-top">
        {children}
    </div>
)

const ButtonContainer = ({children}) => (
    <div className="button-container">
        {children}
    </div>
)

const SettingsButton = ({onClick}) => (
    <div
        className="settings-button circular-button"
        data-content="Settings"
        data-variation="inverted">
        <button className="ui circular grey icon button">
            <i className="setting icon"></i>
        </button>
    </div>
);

const SignOutButton = ({onClick}) => (
    <div
        className="signout-button circular-button"
        data-content="Sign Out"
        data-variation="inverted">
        <button className="ui circular pink icon button">
            <i className="sign out icon"></i>
        </button>
    </div>
)

const Profile = ({children}) => (
    <div className="profile">
        {children}
    </div>
);

const Circle = ({image}) => (
    <div className="circle">
        <div className="image"
        style={{
            background: `url(${image}) no-repeat`
        }}></div>
    </div>
);

Circle.defaultProps = {
    image: 'http://imgh.us/1472483328_user.svg'
};

const Info = () => (
    <div className="info">
        <div className="username">@velopert</div>
        <div className="name">Minjun Kim</div>
    </div>
);

const Bottom = ({children}) => (
    <div className="sidebar-bottom">
        {children}
    </div>
);

const Followship = () => (
    <div className="followship">
        <div className="ui grid">
            <div className="eight wide column">
                <div className="title">FOLLOWING</div>
                <div className="value">0</div>
            </div>
            <div className="eight wide column">
                <div className="title">FOLLOWER</div>
                <div className="value">0</div>
            </div>
        </div>
    </div>
)

export default Sidebar;
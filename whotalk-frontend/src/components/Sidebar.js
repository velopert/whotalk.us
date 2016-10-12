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
                </Top>
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
    <div className="settings-button circular-button" data-content="Settings"
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

export default Sidebar;
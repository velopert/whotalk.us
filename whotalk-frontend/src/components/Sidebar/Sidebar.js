import React, {Component} from 'react';
import Top from './Top';
import ButtonContainer from './ButtonContainer';
import SettingsButton from './SettingsButton';
import LogoutButton from './LogoutButton';
import Profile from './Profile';
import Circle from './Circle';
import Info from './Info';
import Bottom from './Bottom';
import Followship from './Followship';
import LoginButton from './LoginButton';
import autobind from 'autobind-decorator';
import storage from 'helpers/storage';

class Sidebar extends Component {
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.session.logged !== this.props.session.logged && this.props.session.logged) {
            $('.circular-button').popup({position: 'bottom center'});
        }

    }

    @autobind
    redirect(path) {
        this
            .context
            .router
            .transitionTo(path);
    }

    render() {
        const {open, session, onToggle, onLogout} = this.props;
        const {redirect} = this;

        let username,
            name;
        if (session.logged) {
            username = session.user.common_profile.username;
            name = session.user.common_profile.givenName + ' ' + session.user.common_profile.familyName;
        }

        return (
            <div
                className={`sidebar ${open
                ? 'open'
                : ''}`}>
                <Top>
                    {session.logged
                        ? (
                            <ButtonContainer>
                                <SettingsButton/>
                                <LogoutButton onClick={onLogout}/>
                            </ButtonContainer>
                        )
                        : ''}
                    <Profile>
                        <Circle/>
                        <Info name="Minjun Kim" username={username} name={name}/>
                    </Profile>
                </Top>

                <Bottom>
                    {session.logged
                        ? (<Followship/>)
                        : <LoginButton
                            onClick={() => {
                            onToggle();
                            storage.set('redirect', {prevPath: location.pathname});
                            redirect('/auth');
                        }}/>}
                </Bottom>
            </div>
        );
    }
}

Sidebar.contextTypes = {
    router: React.PropTypes.object
};

export default Sidebar;
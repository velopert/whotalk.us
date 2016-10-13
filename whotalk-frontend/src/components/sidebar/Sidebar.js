import React, {Component} from 'react';
import Top from './Top';
import ButtonContainer from './ButtonContainer';
import SettingsButton from './SettingsButton';
import SignOutButton from './SignOutButton';
import Profile from './Profile';
import Circle from './Circle';
import Info from './Info';
import Bottom from './Bottom';
import Followship from './Followship';
import SignInButton from './SignInButton';


class Sidebar extends Component {
    componentDidMount() {
        // initialize tooltip
        $('.circular-button').popup({position: 'bottom center'});
    }

    render() {
        const {open, session, onToggle} = this.props;

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
                                <SignOutButton/>
                            </ButtonContainer>
                        ): '' }
                    <Profile>
                        <Circle/>
                        <Info name="Minjun Kim" username={username} name={name}/>
                    </Profile>
                </Top>


                <Bottom>
                    { session.logged ? (<Followship/>) : <SignInButton onClick={onToggle}/> }
                </Bottom>
            </div>
        );
    }
}

export default Sidebar;
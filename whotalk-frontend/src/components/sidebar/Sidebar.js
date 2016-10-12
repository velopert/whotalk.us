import React, { Component } from 'react';
import Top from './Top';
import ButtonContainer from './ButtonContainer';
import SettingsButton from './SettingsButton';
import SignOutButton from './SignOutButton';
import Profile from './Profile';
import Circle from './Circle';
import Info from './Info';
import Bottom from './Bottom';
import Followship from './Followship';

class Sidebar extends Component {
    componentDidMount() {
        // initialize tooltip
        $('.circular-button').popup({position: 'bottom center'});
    }

    render() {
        const {open} = this.props;

        return (
            <div
                className={`sidebar ${open ? 'open': ''}`}>
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
                </Bottom>
            </div>
        );
    }
}

export default Sidebar;
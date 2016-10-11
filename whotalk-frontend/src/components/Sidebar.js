import React from 'react';

const Sidebar = ({open}) => {
    return (
        <div className={`sidebar ${open
            ? 'open'
            : ''}`}>
  <a href="#">About</a>
  <a href="#">Services</a>
  <a href="#">Clients</a>
  <a href="#">Contact</a>
            <SignOut/>
        </div>
    );
};

const SignOut = ({onClick}) => (
    <div className="sign-out">
        
    </div>
)

export default Sidebar;
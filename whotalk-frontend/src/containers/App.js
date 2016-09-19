import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Match, Miss } from 'react-router';
import { Home, Login } from 'containers';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Match exactly pattern="/" component={Home}/>
                    <Match pattern="/login" component={Login}/>
                </div>
            </Router>
        );
    }
}

export default App;

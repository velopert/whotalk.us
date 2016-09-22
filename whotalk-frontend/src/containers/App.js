import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Match, Miss } from 'react-router';
import { Background, MatchWithFade } from 'components';
import { Home, Auth } from 'containers';


class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Background/>
                    <Match exactly pattern="/" component={Home}/>
                    <Match pattern="/auth" component={Auth}/>
                </div>
            </Router>
        );
    }
}

export default App;

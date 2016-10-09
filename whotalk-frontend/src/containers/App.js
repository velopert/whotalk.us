import React, {Component} from 'react';
import {BrowserRouter as Router, Match} from 'react-router';
import {Background} from 'components';
import {Home, Auth} from 'containers';
import { connect } from 'react-redux';
import { storage } from 'helpers';


class App extends Component {
    componentDidMount() {
        const session = storage.get('session');
        if(session) {
            if(session.logged) {
                
            }
        }
    }
    
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

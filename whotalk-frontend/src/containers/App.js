import React, {Component} from 'react';
import {BrowserRouter as Router, Match} from 'react-router';
import {Background} from 'components';
import {Home, Auth} from 'containers';
import { connect } from 'react-redux';
import { storage } from 'helpers';
import {bindActionCreators} from 'redux';
import * as auth from 'actions/auth.js';
const toastr = window.toastr;

class App extends Component {
    async componentDidMount() {
        let session = storage.get('session');

        if(session) {
            if(session.expired) {
                toastr.error('Your session is expired');
                storage.set('session', {...session, expired: false});
                return;
            }
        }
        await this.props.AuthActions.checkSession();
        
        if(!this.props.status.session.logged) {
            storage.set('session', { ...session, logged: false });
            if(session.logged){
                // session is expired
                session = storage.get('session');
                storage.set('session', {...session, expired: true});
                location.reload();
            }
        } else {
            if(!session.logged) {
                // got a new session
                storage.set('session', {...this.props.status.session});
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

App = connect(
    state => ({
        status: {
            session: state.auth.session
        }
    }),
    dispatch => ({
        AuthActions: bindActionCreators({
            checkSession: auth.checkSession
        },dispatch)
    })
)(App);

export default App;

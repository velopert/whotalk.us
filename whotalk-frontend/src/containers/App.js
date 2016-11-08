import React, {Component} from 'react';
import {BrowserRouter as Router, Match} from 'react-router';
import {Background, Dimmed, Header, Sidebar, Footer} from 'components';
import {Home, Auth, ChannelCheck, ChatRoute, NotFound} from 'containers';
import {connect} from 'react-redux';
import {storage} from 'helpers';
import {bindActionCreators} from 'redux';
import * as auth from 'actions/auth.js';
import * as ui from 'actions/ui';
import autobind from 'autobind-decorator';
import { Events, scrollSpy } from 'react-scroll';
import { toggleScroll } from 'helpers/scroll';
import notify from 'helpers/notify';

class App extends Component {

    static contextTypes = {
        router: React.PropTypes.object
    }

    constructor(props) {
        super(props);
        let session = storage.get('session');
        if (!session) {
            storage.set('session', {
                user: null,
                logged: false
            });
        }
    }

    @autobind
    async handleLogout() {
        const { AuthActions } = this.props;
        await AuthActions.logout();
        storage.set('session', { user: null, logged: false });
        notify({message: 'Good Bye!'});
        this.handleSidebarToggle();
        setTimeout(() => {location.reload(); }, 1000);
        
    }

    @autobind
    handleSidebarToggle() {
        const { UIActions } = this.props;
        UIActions.toggleSidebar();
        toggleScroll();
    }

    @autobind
    handleScroll(e) {
        console.log(window.innerHeight - window.scrollY);

        const { UIActions, ui } = this.props;


        if(window.location.pathname === "/") {
            /* HIDE & SHOW HEADER BAR */
            if(window.innerHeight - window.scrollY <= 50 && ui.header.transparent) {
                UIActions.setHeaderTransparency(false);
            }

            /* HIDE & SHOW HEADER BAR */
            if(window.innerHeight - window.scrollY > 50 && !ui.header.transparent) {
                UIActions.setHeaderTransparency(true);
            }

            if(window.innerHeight - window.scrollY <= 100 && ui.like) {
                UIActions.setLikeTransparency(false);
            }

            /* HIDE & SHOW HEADER BAR */
            if(window.innerHeight - window.scrollY > 100 && !ui.like) {
                UIActions.setLikeTransparency(true);
            }
        }
    }

    async componentDidMount() {


        Events.scrollEvent.register('begin', function (to, element) {
            console.log("begin", arguments);
        });

        Events.scrollEvent.register('end', function (to, element) {
            console.log("end", arguments);
        });

        scrollSpy.update();

        window.addEventListener('scroll', this.handleScroll);

        let session = storage.get('session');

        if (session) {
            if (session.expired) {
                //toastr.error('Your session is expired');
                notify({type: 'error', message: 'Your session is expired'});
                storage.set('session', {
                    ...session,
                    expired: false
                });
                return;
            }
        }
        await this
            .props
            .AuthActions
            .checkSession();

        if (!this.props.status.session.logged) {
            storage.set('session', {
                ...session,
                logged: false
            });
            if (session.logged) {
                // session is expired
                session = storage.get('session');
                storage.set('session', {
                    ...session,
                    expired: true
                });
                location.reload();
            }
        } else {
            if (!session.logged) {
                // got a new session
                storage.set('session', {
                    ...this.props.status.session
                });
            }
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return JSON.stringify(nextProps) !== JSON.stringify(this.props);
    }
    

    render() {
        const { ui, status } = this.props;
        const { handleSidebarToggle, handleLogout } = this;

        return (
            <Router>
                <div className="root">
                    <Background/>
                    <Sidebar 
                        open={ui.sidebar.show}
                        session={status.session}
                        onToggle={handleSidebarToggle}
                        onLogout={handleLogout}
                    />
                    <Dimmed enable={ui.sidebar.show} onClick={handleSidebarToggle}/>
                    <Header transparency={ui.header.transparent} onSidebarToggle={handleSidebarToggle}/>
                    <div>
                        <Match exactly pattern="/" component={Home}/>
                        <Match pattern="/auth" component={Auth}/>
                        <Match pattern="/:username" component={ChannelCheck}/>
                        <Match pattern="/chat/:username" component={ChatRoute}/>
                        <Match pattern="/404" component={NotFound}/>
                    </div>
                    {ui.footer.show ? <Footer {...ui.footer}/> : undefined}
                </div>
            </Router>
        );
    }

    componentWillUnmount() {
         window.removeEventListener('scroll', this.handleScroll);
    }
    
}


App = connect(state => ({
    status: {
        session: state.auth.session
    },
    ui: {
        sidebar: state.ui.sidebar,
        header: state.ui.header,
        like: state.ui.home.like,
        footer: state.ui.footer
    }
}), dispatch => ({
    AuthActions: bindActionCreators({
        checkSession: auth.checkSession,
        logout: auth.logout
    }, dispatch),
    UIActions: bindActionCreators({
        toggleSidebar: ui.toggleSidebar,
        setHeaderTransparency: ui.setHeaderTransparency,
        setLikeTransparency: ui.setLikeTransparency,
        setFooterSpace: ui.setFooterSpace,
        setFooterVisibility: ui.setFooterVisibility
    }, dispatch)
}))(App);

export default App;

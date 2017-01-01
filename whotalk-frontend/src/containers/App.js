import React, {Component} from 'react';
import {BrowserRouter as Router, Match} from 'react-router';
import {Background, Dimmed, Header, Sidebar, Footer, UserSearch, SelectLanguage} from 'components';
import {Home, Auth, ExploreRoute, ChannelCheck, ChatRoute, NotFound, Page, MyPageRoute} from 'containers';
import {connect} from 'react-redux';
import {storage} from 'helpers';
import {bindActionCreators} from 'redux';
import * as auth from 'actions/auth';
import * as ui from 'actions/ui';
import { getActivityBefore } from 'actions/explore';
import autobind from 'autobind-decorator';
import { Events, scrollSpy } from 'react-scroll';
import { toggleScroll } from 'helpers/scroll';
import notify from 'helpers/notify';
import * as form from 'actions/form';
import * as common from 'actions/common';

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
        
        this.searchTimeout = null;
    }    

    @autobind
    updateClientSize() {
        const { UIActions } = this.props;

        UIActions.updateClientSize({
            height: document.body.clientHeight,
            width: document.body.clientWidth
        });
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
        const { UIActions, AuthActions, ui } = this.props;
        if(!ui.sidebar.show) {
            AuthActions.checkSession();
        }
        UIActions.toggleSidebar();
        toggleScroll();
        
    }

    @autobind
    closeFocusBox() {
        const { UIActions, ui } = this.props;
        if(ui.focusBox.closing) return;
        UIActions.closingFocusBox();
        setTimeout(
            UIActions.toggleFocusBox, 700
        );
    }

    @autobind
    handleScroll(e) {
        //console.log(document.body.scrollHeight - document.body.scrollTop - document.body.clientHeight);
        //console.log(document.body.scrollTop +  window.innerHeight);

        const { UIActions, ExploreActions, ui, status} = this.props;
        const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

        if(window.location.pathname === "/explore") {
            if(document.body.scrollHeight - scrollTop - document.body.clientHeight < 90) {
                if(status.fetchingActivity) return;
                if(status.isLastActivity) return;

                ExploreActions.getActivityBefore(status.activityCursorId);
            }
        }

        if(window.location.pathname === "/") {
            //console.log((window.innerHeight - window.scrollY)/ window.innerHeight)
            /* HIDE & SHOW HEADER BAR */
            if(window.innerHeight - window.scrollY <= window.innerHeight*0.90 && ui.header.transparent) {
                UIActions.setHeaderTransparency(false);
            }

            /* HIDE & SHOW HEADER BAR */
            if(window.innerHeight - window.scrollY > window.innerHeight*0.90 && !ui.header.transparent) {
                UIActions.setHeaderTransparency(true);
            }

            // if(window.innerHeight - window.scrollY <= 100 && ui.like) {
            //     UIActions.setLikeTransparency(false);
            // }

            // /* HIDE & SHOW HEADER BAR */
            // if(window.innerHeight - window.scrollY > 100 && !ui.like) {
            //     UIActions.setLikeTransparency(true);
            // }
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
        
        window.addEventListener("resize", this.updateClientSize);
        this.updateClientSize();

        let session = storage.get('session');

        if (session) {
            if (session.expired) {
                //toastr.error('Your session is expired');
                notify({type: 'error', message: 'Your session is expired'});
                storage.set('session', {
                    ...session,
                    expired: false
                });
                setTimeout(
                    () => {
                        document.location = '/'
                    }, 1000
                );
                return;
            }

            if(!session.logged && (window.location.pathname === "/explore" || window.location.pathname === "/mypage")){
                 document.location = "/"
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

            if(window.location.pathname === "/explore") {
                // not logged in AND location is /explore
                document.location = "/"
            }

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
        if(nextProps.form.keyword !== this.props.form.keyword) {
            return false;
        }

        return JSON.stringify(nextProps) !== JSON.stringify(this.props);
    }
    

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateClientSize);
    }


    toggleUserSearch = () => {
        const { ui, UIActions, CommonActions } = this.props;
        if(!ui.userSearch.show) {
            CommonActions.initializeSearch();
        }
        UIActions.toggleUserSearch();
    }

    toggleSelectLanguage = () => {
        const {UIActions} = this.props;
        UIActions.toggleSelectLanguage();
    }

    
    handleSelectLanguage = (lang) => {
        const {UIActions, ui} = this.props;
        storage.set('language', { lang });
        location.reload();
    }

    handleCloseSelectLanguage = () => {
        const {UIActions, ui} = this.props;
        // to prevent double click
        if(!ui.selectLanguageVisibility) return;
        UIActions.toggleSelectLanguage();
    }

    handleUserClick = () => {
        
    }

    handleSearchInputChange = (e) => {
        const { FormActions, CommonActions } = this.props;


        const keyword = e.target.value;

        if(keyword==='') {
            CommonActions.initializeSearch();
            return;
        }
        
        FormActions.changeInput({
            form: 'search', 
            name: 'keyword', 
            value: keyword
        });

        const search = () => {          
            CommonActions.getSearchUser(keyword);
        };

        clearTimeout(this.searchTimeout);
        this.searchTimeout = setTimeout(search, 500);
    }
    
    render() {
        const { ui, status, form, UIActions } = this.props;
        const { 
                handleSidebarToggle, 
                handleLogout, 
                closeFocusBox,
                toggleUserSearch,
                handleSearchInputChange,
                toggleSelectLanguage,
                handleSelectLanguage,
                handleCloseSelectLanguage
             } = this;

        return (
            <Router>
                <div className="root">
                    <Background/>
                    <Sidebar 
                        open={ui.sidebar.show}
                        session={status.session}
                        onToggle={handleSidebarToggle}
                        onLogout={handleLogout}
                        followInfo={status.followInfo}
                    />
                    <Dimmed enable={ui.sidebar.show} onClick={handleSidebarToggle} isSidebar={true}/>
                    <Dimmed enable={ui.focusBox.show} onClick={closeFocusBox}/>
                    <Header 
                        transparency={ui.header.transparent} 
                        onSidebarToggle={handleSidebarToggle}
                        disableSearchButton={ui.userSearch.show}
                        onSearchBtnClick={toggleUserSearch}
                    />
                    <UserSearch 
                        show={ui.userSearch.show}
                        onClose={toggleUserSearch}
                        onChange={handleSearchInputChange}
                        users={status.searchResult}
                    />
                    <SelectLanguage 
                        visible={ui.selectLanguageVisibility}
                        onSelect={handleSelectLanguage}
                        onClose={handleCloseSelectLanguage}
                    />
                    
                    <div style={{height: '100%'}}>
                        <Match exactly pattern="/" component={Home}/>
                        <Match pattern="/auth" component={Auth}/>
                        <Match pattern="/explore" component={ExploreRoute}/>
                        <Match pattern="/:username" component={ChannelCheck}/>
                        <Match pattern="/chat/:username" component={ChatRoute}/>
                        <Match pattern="/page" component={Page}/>
                        <Match pattern="/mypage" component={MyPageRoute}/>
                        <Match pattern="/404" component={NotFound}/>
                    </div>

                    {ui.footer.show ? <Footer onLanguageClick={toggleSelectLanguage} {...ui.footer}/> : undefined}
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
        session: state.auth.session,
        fetchingActivity: state.explore.requests.getActivityBefore.fetching,
        activityCursorId: state.explore.activityData.length === 0 ? null : state.explore.activityData[state.explore.activityData.length-1]._id,
        isLastActivity: state.explore.isLast,
        followInfo: state.auth.followInfo,
        searchResult: state.common.search.result
    },
    ui: {
        sidebar: state.ui.sidebar,
        header: state.ui.header,
        like: state.ui.home.like,
        footer: state.ui.footer,
        focusBox: state.ui.focusBox,
        userSearch: state.ui.userSearch,
        selectLanguageVisibility: state.ui.selectLanguage.visible
    },
    form: {
        keyword: state.form.search.keyword
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
        setFooterVisibility: ui.setFooterVisibility,
        updateClientSize: ui.updateClientSize,
        toggleFocusBox: ui.toggleFocusBox,
        closingFocusBox: ui.closingFocusBox,
        toggleUserSearch: ui.toggleUserSearch,
        toggleSelectLanguage: ui.toggleSelectLanguage
    }, dispatch),
    ExploreActions: bindActionCreators({
        getActivityBefore
    }, dispatch),
    FormActions: bindActionCreators(form, dispatch),
    CommonActions: bindActionCreators(common, dispatch)
}))(App);

export default App;

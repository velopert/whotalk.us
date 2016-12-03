import React, {Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ui from 'actions/ui';
import * as explore from 'actions/explore';
import {Explore} from 'components';
import notify from 'helpers/notify'


import {injectIntl} from 'react-intl';
import { prepareMessages } from 'locale/helper';

const messages = prepareMessages({
    "LinksContainer.recentlyVisited": "RECENTLY VISITED",
    "LinksContainer.favorites": "FAVORITES"
})

class ExploreRoute extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const { UIActions, ExploreActions } = this.props;
        UIActions.initialize('explore');
        UIActions.setHeaderTransparency(false);
        UIActions.setFooterVisibility(false);
        ExploreActions.initialize();
    }

    fetchInitialActivities = async () => {
        const { ExploreActions } = this.props;
        await ExploreActions.getInitialActivity();
    }

    fetchSidebarLinks = async () => {
        const { ExploreActions } = this.props;
        await ExploreActions.getSidebarLinks();
    }

    handleFollow = async ({activityIndex, userIndex, username}) => {
        const { ExploreActions, status } = this.props;
        ExploreActions.toggleFollowButtonInActivity({activityIndex, userIndex});
        try {
            await ExploreActions.followFromActivity(username);
        } catch(e) {

        }
        ExploreActions.toggleFollowButtonInActivity({activityIndex, userIndex});
    }

    handleUnfollow = async ({activityIndex, userIndex, username}) => {
        const { ExploreActions, status } = this.props;
        ExploreActions.toggleFollowButtonInActivity({activityIndex, userIndex});
        try {
            await ExploreActions.unfollowFromActivity(username);
        } catch(e) {
            
        }
        ExploreActions.toggleFollowButtonInActivity({activityIndex, userIndex});
    }

    componentDidMount () {
        const { status } = this.props;

        if(status.sessionChecked && !status.session.logged) {
            this.context.router.transitionTo('/')
        }

        this.fetchSidebarLinks();
        this.fetchInitialActivities();
        
        // fetch initialActivities

    }
    
    
    render() {

        const { status, intl: {
                formatMessage
            } } = this.props;
        const { handleFollow, handleUnfollow } = this;
        
        console.log(status.sidebarLinks);
        
        return (
            <Explore.Container>
                <Explore.LeftBox fetching={status.fetchingLinks}>
                    <Explore.LinksContainer 
                        title={formatMessage(messages.recentlyVisited)}
                        data={status.sidebarLinks.recentVisits}
                    />
                    <Explore.LinksContainer 
                         title={formatMessage(messages.favorites)}
                        data={status.sidebarLinks.favoriteChannels}
                    />

                </Explore.LeftBox>
                <Explore.Feeds 
                    width={ status.clientSize.width - 230  + 'px'} 
                    data={status.activityData}
                    isLast={status.isLast}
                    onFollow={handleFollow}
                    onUnfollow={handleUnfollow}
                    myUsername={status.session.user.common_profile.username}
                />
            </Explore.Container>
        );
    }
}

ExploreRoute.contextTypes = {
  router: React.PropTypes.object
};


ExploreRoute = connect(
    state => ({
        status: {
            session: state.auth.session,
            sessionChecked: state.auth.requests.checkSession.fetched,
            clientSize: state.ui.clientSize,
            activityData: state.explore.activityData,
            sidebarLinks: state.explore.sidebarLinks,
            recentVisits: state.explore.recentVisits,
            isLast: state.explore.isLast,
            fetchingLinks: state.explore.requests.getSidebarLinks.fetching
        }
    }),
    dispatch => ({
        UIActions: bindActionCreators({
            initialize: ui.initialize,
            setHeaderTransparency: ui.setHeaderTransparency,
            setFooterVisibility: ui.setFooterVisibility
        }, dispatch),
        ExploreActions: bindActionCreators(explore, dispatch)
    })
)(ExploreRoute)
export default injectIntl(ExploreRoute);
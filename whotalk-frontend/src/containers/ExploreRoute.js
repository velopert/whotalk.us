import React, {Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ui from 'actions/ui';
import * as explore from 'actions/explore';
import {Explore} from 'components';

class ExploreRoute extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const { UIActions } = this.props;
        UIActions.initialize('explore');
        UIActions.setHeaderTransparency(false);
        UIActions.setFooterVisibility(false);
    }
    
    render() {

        const { status } = this.props;
        
        return (
            <Explore.Container>
                <Explore.LeftBox/>
                <Explore.Feeds width={ status.clientSize.width - 230  + 'px'}/>
            </Explore.Container>
        );
    }
}


ExploreRoute = connect(
    state => ({
        status: {
            clientSize: state.ui.clientSize,
            activityData: state.explore.activityData
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
export default ExploreRoute;
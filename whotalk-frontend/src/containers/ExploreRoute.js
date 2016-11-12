import React, {Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ui from 'actions/ui';
import {Explore} from 'components';


class ExploreRoute extends Component {

    componentDidMount() {
        const { UIActions } = this.props;
        UIActions.initialize('explore');
        UIActions.setHeaderTransparency(false);
        UIActions.setFooterVisibility(false);
    }
    
    render() {
        return (
            <Explore.Container>
                <Explore.LeftBox/>
                <Explore.Feeds/>
            </Explore.Container>
        );
    }
}


ExploreRoute = connect(
    state => ({
        status: {
            
        }
    }),
    dispatch => ({
        UIActions: bindActionCreators({
            initialize: ui.initialize,
            setHeaderTransparency: ui.setHeaderTransparency,
            setFooterVisibility: ui.setFooterVisibility
        }, dispatch)
    })
)(ExploreRoute)
export default ExploreRoute;
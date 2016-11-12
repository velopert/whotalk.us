import React, {Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ui from 'actions/ui';


class ExploreRoute extends Component {

    componentDidMount() {
        const { UIActions } = this.props;
        UIActions.setHeaderTransparency(false);
        UIActions.setFooterVisibility(false);
    }
    
    render() {
        return (
            <div>
                
            </div>
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
            setHeaderTransparency: ui.setHeaderTransparency,
            setFooterVisibility: ui.setFooterVisibility
        }, dispatch)
    })
)(ExploreRoute)
export default ExploreRoute;
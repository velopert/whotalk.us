// import React from 'react'; const masonryOptions = {     transitionDuration: 0
// };
import React, { Component } from 'react';
import Feed from './Feed';
const Masonry = window.Masonry;

class Feeds extends Component {
    constructor(props) {
        super(props);
        this.msnry = null;
    }

    componentDidMount() {
        this.msnry = new Masonry('.feeds', {
            itemSelector: '.feed',
            columnWidth: '.feed'
        });
    }

    componentDidUpdate(prevProps, prevState) {
        this.msnry = new Masonry('.feeds', {
            itemSelector: '.feed',
            columnWidth: '.feed'
        });
    }

    mapToFeeds = (feeds) => {
        return feeds.map(
            (feed, i) => (
                <Feed 
                    key={feed._id} 
                    type={feed.type} 
                    payload={feed.payload} 
                    index={i}
                    onFollow={this.props.onFollow}
                    onUnfollow={this.props.onUnfollow}
                    myUsername={this.props.myUsername}
                />
            )
        )
    }


    render() {

        const {width, data, isLast} = this.props;

        return (
            <div className="feeds" style={{
                width
            }}>
                <div className="masonry">
                    {this.mapToFeeds(data)}
                </div>
                {isLast ? undefined : <div className="ui active large centered inline loader"></div> }
            </div>
        );
    }
}

export default Feeds;
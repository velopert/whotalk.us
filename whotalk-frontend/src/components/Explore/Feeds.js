// import React from 'react'; const masonryOptions = {     transitionDuration: 0
// };
import React, { Component } from 'react';
import Feed from './Feed';
const Masonry = window.Masonry;

const follow = {
    followee: {
        username: 'user1',
        thumbnail: 'none',
        givenName: 'Test',
        familyName: 'User',
    },
    follower: {
        username: 'user2',
        thumbnail: 'none'
    },
    following: false,
    date: new Date(),
}

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

    do() {
        this.setState({
            data: [
                ...this.state.data,
                randomHeight()
            ]
        });
    }

    render() {

        const {width} = this.props;

        return (
            <div className="feeds" style={{
                width
            }}>
                <div className="masonry">
                    <Feed type="FOLLOW" payload={follow} />
                    <Feed type="FOLLOW" payload={follow} />
                </div>

            </div>
        );
    }
}

export default Feeds;
// const Feeds = ({width}) => {     return (         <div className="feeds"
// style={{width}}>             <div className="feeds-masonry"> <div
// className="feed"></div>                 <div className="feed"></div>    <div
// className="feed"></div>                 <div className="feed"></div>
// <div className="feed"></div>        <div className="feed"></div>
// <div className="feed"></div>        <div className="feed"></div>    <div
// className="feed"></div>           <div className="feed"></div>          <div
// className="feed"></div>        <div className="feed"></div> <div
// className="feed"></div>             </div>         </div>     ); }; export
// default Feeds;
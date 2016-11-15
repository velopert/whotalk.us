// import React from 'react'; const masonryOptions = {     transitionDuration: 0
// };
import React, {Component} from 'react';

const Masonry = window.Masonry;

function randomHeight() {
    return Math.random() * 500 + 200 + 'px'
}

const Feed = ({height}) => {
    return (
        <div className="feed">
            <div className="feed-content" style={{height}}>
                
            </div>
        </div>
    );
};

class Feeds extends Component {
    constructor(props) {
        super(props);
        this.msnry = null;
        this.state = {
            data: []
        };
        this.renderTesting = this
            .renderTesting
            .bind(this);

        this.do = this.do.bind(this);
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

    renderTesting() {
        var c = this
            .state
            .data
            .map((height, i) => (<Feed height={height} key={i}/>))

        console.log(c);
        return c;
    }

    render() {

        const {width} = this.props;

        return (
            <div className="feeds" style={{
                width
            }}>
                <div className="masonry">
                    {this.renderTesting()}
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
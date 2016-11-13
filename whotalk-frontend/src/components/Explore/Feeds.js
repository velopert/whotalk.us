// import React from 'react';

// const masonryOptions = {
//     transitionDuration: 0
// };


import React, {Component} from 'react';

class Feeds extends Component {
    render() {

        const { width } = this.props;

        return (
            <div className="feeds" style={{width}}>
                <div className="masonry">
                    <div className="feed"></div>
                    <div className="feed one"></div>
                    <div className="feed two"></div>
                    <div className="feed one"></div>
                    <div className="feed"></div>
                    <div className="feed one"></div>
                    <div className="feed"></div>
                    <div className="feed two"></div>
                    <div className="feed two"></div>
                    <div className="feed"></div>
                    <div className="feed one"></div>
                    <div className="feed"></div>
                    <div className="feed two"></div>
                    <div className="feed"></div>
                    <div className="feed one"></div>
                    <div className="feed"></div>
                    <div className="feed one"></div>
                    <div className="feed"></div> 
                </div>
            </div>
        );
    }
}

export default Feeds;
// const Feeds = ({width}) => {
//     return (
//         <div className="feeds" style={{width}}>
//             <div className="feeds-masonry">
//                 <div className="feed"></div>
//                 <div className="feed"></div>
//                 <div className="feed"></div>
//                 <div className="feed"></div>
//                 <div className="feed"></div>
//                 <div className="feed"></div>
//                 <div className="feed"></div>
//                 <div className="feed"></div>
//                 <div className="feed"></div>
//                 <div className="feed"></div>
//                 <div className="feed"></div>
//                 <div className="feed"></div>
//                 <div className="feed"></div>
//             </div>
//         </div>
//     );
// };

// export default Feeds;
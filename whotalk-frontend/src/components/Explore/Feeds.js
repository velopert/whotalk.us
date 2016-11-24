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

const chat = {
      "_id": "5837150aeb0582613db5b8d4",
      "type": "CHAT",
      "date": "2016-11-24T16:27:54.519Z",
      "payload": {
        "chat": {
          "username": "tester_blabla",
          "anonymous": false,
          "initId": "58371509eb0582613db5b8d3",
          "channel": "tester01",
          "lastId": "583715e3eb0582613db5b8ef"
        },
        "chatData": [
          {
            "_id": "58371509eb0582613db5b8d3",
            "anonymous": false,
            "username": "tester_blabla",
            "message": "이제",
            "date": "2016-11-24T16:27:53.835Z"
          },
          {
            "_id": "5837150ceb0582613db5b8d5",
            "anonymous": false,
            "username": "tester_blabla",
            "message": "잘 고쳐졌을꺼야",
            "date": "2016-11-24T16:27:56.182Z"
          },
          {
            "_id": "5837150deb0582613db5b8d6",
            "anonymous": false,
            "username": "tester_blabla",
            "message": "그래도",
            "date": "2016-11-24T16:27:57.022Z"
          },
          {
            "_id": "5837150eeb0582613db5b8d7",
            "anonymous": false,
            "username": "tester_blabla",
            "message": "그 오류를",
            "date": "2016-11-24T16:27:58.318Z"
          },
          {
            "_id": "5837150eeb0582613db5b8d8",
            "anonymous": false,
            "username": "tester_blabla",
            "message": "빨리",
            "date": "2016-11-24T16:27:58.869Z"
          },
          {
            "_id": "58371510eb0582613db5b8d9",
            "anonymous": false,
            "username": "tester_blabla",
            "message": "찾은것같다",
            "date": "2016-11-24T16:28:00.288Z"
          },
          {
            "_id": "58371512eb0582613db5b8da",
            "anonymous": false,
            "username": "tester_blabla",
            "message": "많이 헤메지않고",
            "date": "2016-11-24T16:28:02.933Z"
          },
          {
            "_id": "58371513eb0582613db5b8db",
            "anonymous": false,
            "username": "tester_blabla",
            "message": "그치",
            "date": "2016-11-24T16:28:03.542Z"
          },
          {
            "_id": "58371515eb0582613db5b8dc",
            "anonymous": false,
            "username": "tester_blabla",
            "message": "자",
            "date": "2016-11-24T16:28:05.087Z"
          },
          {
            "_id": "58371515eb0582613db5b8dd",
            "anonymous": false,
            "username": "tester_blabla",
            "message": "이제",
            "date": "2016-11-24T16:28:05.645Z"
          }
        ]
      },
      "__v": 0
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
                    <Feed type="CHAT" payload={chat.payload} />
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
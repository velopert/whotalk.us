import React, {Component} from 'react';

class Background extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showImage: false
        };
    }

    componentDidMount() {
        // fade in image after 2sec
        setTimeout(() => this.setState({showImage: true}), 2000);
    }

    render() {
        const fade = this.state.showImage ? 1 : 0;

        return (
            <div className="background">
                <div className='image' style={{opacity: fade}}></div>
            </div>
        );
    }
}

export default Background;
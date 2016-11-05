import React, { Component, PropTypes } from 'react';

const propTypes = {
    image: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
    inverted: PropTypes.bool
};

const defaultProps = {
    image: "",
    title: "title",
    test: "text\ntext",
    inverted: false
};

class InfoSection extends Component {

    render() {

        const { image, title, text, inverted } = this.props;

        const imagePosition = inverted ? 'right' : 'left';
        const infoPosition = inverted ? 'left' : 'right';
        const dark = inverted ? 'dark' : '';


        return(
            <div className={`info-section ${dark}`}>
                <div className={`image ${imagePosition}`}>
                    <img src={image} alt={title}></img>
                </div>
                <div className={`info-wrapper ${infoPosition}`}>
                    <div className="info">
                        <h1>{title}</h1>
                        <p>{text}</p>
                    </div>
                </div>
            </div>
        );
    }
}

InfoSection.propTypes = propTypes;
InfoSection.defaultProps = defaultProps;

export default InfoSection;

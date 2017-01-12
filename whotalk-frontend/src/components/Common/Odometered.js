const Odometer = window.Odometer;
import 'odometer/themes/odometer-theme-default.css';


// setup Odometer
window.odometerOptions = {
  auto: false, // Don't automatically initialize everything with class 'odometer'
  format: 'd', // Change how digit groups are formatted, and how many digits are shown after the decimal point
  duration: 3000, // Change how long the javascript expects the CSS animation to take
  theme: 'default' // Specify the theme (if you have more than one theme css file on the page)
   // Count is a simpler animation method which just increments the value,
                     // use it when you're looking for something more subtle.
};

import React, {Component} from 'react';

class Odometered extends Component {

    componentDidMount() {
        this.odometer = new Odometer({
            el: this.element
        });
        this.odometer.update(this.props.value);
        
    }
    
    componentDidUpdate(prevProps, prevState) {
        this.odometer.update(this.props.value);
    }
    
    render() {
        return (
            <div className="odometer" ref={(element)=>{this.element = element}}>
                0
            </div>
        );
    }
}

export default Odometered;
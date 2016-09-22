import React from 'react';

import { TransitionMotion, spring } from 'react-motion'
import { Match } from 'react-router';

const MatchWithFade = ({ component:Component, ...rest }) => {
  const willLeave = () => ({ zIndex: 1, opacity: spring(0) })
  return (
    <Match {...rest} children={({ matched, ...props }) => (
      <TransitionMotion
        willLeave={willLeave}
        styles={matched ? [ {
          key: props.location.pathname,
          style: { opacity: 1 },
          data: props
        } ] : []}
      >
        {interpolatedStyles => (
          <div>
            {interpolatedStyles.map(config => (
              <div
                key={config.key}
                style={{...config.style }}
              >
                <Component {...config.data}/>
              </div>
            ))}
          </div>
        )}
      </TransitionMotion>
    )}/>
  )
}
export default MatchWithFade;
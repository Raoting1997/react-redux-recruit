import React from 'react';
import logoSrc from './job.png';
import styled from 'styled-components';

class Logo extends React.Component {
    render() {
        return(
          <Pic>
              <img src={logoSrc} alt="" />
          </Pic>  
        );
    }
}

export default Logo;

const Pic = styled.div`
    margin: 20px 0;
    text-align: center;
`;

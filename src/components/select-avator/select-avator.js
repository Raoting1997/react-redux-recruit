import React from 'react';
import { Grid, List } from 'antd-mobile';
import styled from 'styled-components';

class SelectAvator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const avatorList = '1,2,3,4,5,6,7,8,9'.split(',').map((v)=> ({
            icon: require('../../../public/images/'+ v +'.jpg'),
            text: v
        }));
        const renderHeader = this.state.text ? <div><span>已经选择头像</span><Img src={this.state.icon} alt="" /></div> : '请选择头像'
        return (
            <div>
                <List renderHeader={renderHeader}>
                    <Grid data={avatorList} columnNum={3} 
                    onClick={ (v)=> { this.props.selectAvator(v.text); this.setState(v)}}
                    />
                </List>
            </div>
        );
    }
}

export default SelectAvator;

const Img = styled.img`
    text-align: center;
    height: 100px;
`;
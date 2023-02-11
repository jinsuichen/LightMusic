import React, {Component} from 'react';
import {Button, ConfigProvider} from 'antd';

import CustomizationButton from "../CustomizationButton/CustomizationButton";
import './Header.scss'

class Header extends Component {

    render() {
        const { exitProgram } = (window as any).header;

        return (
            <div className={'Header'}>
                <CustomizationButton color={'#ff4d4f'} customizationType={'tiny'} onClick={exitProgram}/>
                <CustomizationButton color={'#9B9B9B'} customizationType={'tiny'}/>
            </div>
        );
    }
}

export default Header;
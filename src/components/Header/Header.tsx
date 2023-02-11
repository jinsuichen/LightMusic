import React, {Component} from 'react';

import './Header.scss'
import {Button, ConfigProvider} from 'antd';

class Header extends Component {

    render() {
        const { exitProgram } = (window as any).header;

        return (
            <div className={'Header'}>
                <ConfigProvider theme={{ token: { colorPrimary: '#ff4d4f'} }}>
                    <Button type="primary" shape="circle" onClick={exitProgram} />
                </ConfigProvider>
                <ConfigProvider theme={{ token: { colorPrimary: '#9B9B9B'} }}>
                    <Button type="primary" shape="circle" />
                </ConfigProvider>

            </div>
        );
    }
}

export default Header;
import React, {Component} from 'react';

import './Header.scss'
import { Button } from 'antd';

class Header extends Component {
    render() {
        return (
            <div className={'Header'}>
                <Button type="primary" shape="circle" danger/>
                <Button type="primary" shape="circle" />
            </div>
        );
    }
}

export default Header;
import React, {Component} from 'react';
import { List } from "antd";

import CustomizationButton from "../../components/CustomizationButton/CustomizationButton";

import './Settings.scss'

type Props = {

}

type State = {

}

class Settings extends Component<Props, State> {
    render() {
        return (
            <div className={'Settings'}>
                <List
                    size={'small'}
                    bordered
                    pagination={{
                        align: 'center',
                        pageSize: 6,
                    }}
                    dataSource={["sasfdssssssssssssssssssssssssssssssssssssssssssssssssssd", 'sadfasd', 'yuweirt',"sasfdsd", 'sadfasd', 'yuweirt',"sasfdsd", 'sadfasd', 'yuweirt',"sasfdsd", 'sadfasd', 'yuweirt',"sasfdsd", 'sadfasd', 'yuweirt',"sasfdsd", 'sadfasd', 'yuweirt',]}
                    renderItem={(item) => (
                        <List.Item className={'ListItem'}>
                            <p className={'TextField'}>{item}</p>
                            <CustomizationButton className={'InlineButton'} type={'tiny'} danger ></CustomizationButton>
                            {/*<Button danger className={'InlineButton'} type="primary" size={'small'}>delete</Button>*/}
                        </List.Item>
                    )}
                />
                <CustomizationButton className={'AddButton'} color={'#407A52'} type={"normal"} size={'middle'}>New</CustomizationButton>
            </div>
        );
    }
}

export default Settings;
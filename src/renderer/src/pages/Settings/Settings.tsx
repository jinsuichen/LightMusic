import { Component } from 'react';
import { ConfigProvider, List } from 'antd';

import CustomizationButton from '../../components/CustomizationButton/CustomizationButton';

import './Settings.scss';

type Props = {
  pathList: Array<string>;
  handleDeletePath(path: string): void;
  handleNewPath(): void;
};

class Settings extends Component<Props, Record<string, never>> {
  render(): JSX.Element {
    const { pathList, handleDeletePath, handleNewPath } = this.props;

    return (
      <div className={'Settings'}>
        <ConfigProvider theme={{ token: { colorPrimary: '#407a52' } }}>
          <List
            size={'small'}
            bordered
            pagination={{
              align: 'center',
              pageSize: 6,
            }}
            dataSource={pathList}
            renderItem={(item): JSX.Element => (
              <List.Item className={'ListItem'}>
                <p className={'TextField'}>{item}</p>
                <CustomizationButton
                  className={'InlineButton'}
                  type={'tiny'}
                  danger
                  onClick={(): void => handleDeletePath(item)}
                ></CustomizationButton>
                {/*<Button danger className={'InlineButton'} type="primary" size={'small'}>delete</Button>*/}
              </List.Item>
            )}
          />
        </ConfigProvider>
        <CustomizationButton
          className={'AddButton'}
          color={'#407A52'}
          type={'normal'}
          size={'middle'}
          onClick={handleNewPath}
        >
          New
        </CustomizationButton>
      </div>
    );
  }
}

export default Settings;

import { Component } from 'react';
import { ConfigProvider, List } from 'antd';

import CustomizationButton from '../../components/CustomizationButton/CustomizationButton';

import './Settings.scss';

type AudioInfo = {
  source: string;
  caption: string;
  from: 'local' | 'subscribe';
};

type Props = {
  audioInfoList: Array<AudioInfo>;
  handleDeleteAudioInfo(audioInfo: AudioInfo): void;
  handleNewAudioInfo(): void;
};

class Settings extends Component<Props, Record<string, never>> {
  render(): JSX.Element {
    const { audioInfoList, handleDeleteAudioInfo, handleNewAudioInfo } = this.props;

    return (
      <div className={'Settings'}>
        <CustomizationButton
          className={'AddButton'}
          color={'#407A52'}
          type={'normal'}
          size={'middle'}
          onClick={handleNewAudioInfo}
        >
          From Local
        </CustomizationButton>

        <ConfigProvider theme={{ token: { colorPrimary: '#407a52' } }}>
          <List
            size={'small'}
            bordered
            pagination={{
              align: 'center',
              pageSize: 10,
            }}
            dataSource={audioInfoList}
            renderItem={(item): JSX.Element => (
              <List.Item className={'ListItem'}>
                <p className={'TextField'}>{item.caption}</p>
                <CustomizationButton
                  className={'InlineButton'}
                  type={'tiny'}
                  danger
                  onClick={(): void => handleDeleteAudioInfo(item)}
                ></CustomizationButton>
              </List.Item>
            )}
          />
        </ConfigProvider>
      </div>
    );
  }
}

export default Settings;

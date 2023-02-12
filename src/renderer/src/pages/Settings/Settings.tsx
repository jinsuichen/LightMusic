import { Component } from 'react'
import { ConfigProvider, List } from 'antd'

import CustomizationButton from '../../components/CustomizationButton/CustomizationButton'
const { api } = window

import './Settings.scss'

type State = {
  pathList: Array<string>
}

class Settings extends Component<Record<string, never>, State> {
  state: State = {
    pathList: []
  }

  updatePathList = (): void => {
    api.getPath().then((result) => {
      this.setState({
        pathList: result
      })
    })
  }

  handleNewPath = (): void => {
    api.addPath()
    this.updatePathList()
  }

  componentDidMount(): void {
    this.updatePathList()
  }

  render(): JSX.Element {
    const { pathList } = this.state

    return (
      <div className={'Settings'}>
        <ConfigProvider theme={{ token: { colorPrimary: '#407a52' } }}>
          <List
            size={'small'}
            bordered
            pagination={{
              align: 'center',
              pageSize: 6
            }}
            dataSource={pathList}
            renderItem={(item): JSX.Element => (
              <List.Item className={'ListItem'}>
                <p className={'TextField'}>{item}</p>
                <CustomizationButton
                  className={'InlineButton'}
                  type={'tiny'}
                  danger
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
          onClick={this.handleNewPath}
        >
          New
        </CustomizationButton>
      </div>
    )
  }
}

export default Settings

import React, { Component } from 'react'
import { Button, ConfigProvider } from 'antd'

import './CustomizationButton.scss'

type Props = {
  type: 'tiny' | 'normal' | 'icon'
  color?: string
  shape?: 'round' | 'circle' | 'default'
  size?: 'small' | 'middle' | 'large'
  icon?: React.ReactNode
  children?: React.ReactNode
  danger?: boolean
  className?: string
  onClick?:
    | (React.MouseEventHandler<HTMLAnchorElement> & React.MouseEventHandler<HTMLButtonElement>)
    | undefined
}

class CustomizationButton extends Component<Props> {
  static defaultProps: Partial<Props> = {
    color: 'white',
    shape: 'default',
    size: 'small',
    icon: undefined,
    children: undefined,
    danger: false
  }
  render(): JSX.Element {
    const { color, type, className } = this.props
    return (
      <ConfigProvider theme={{ token: { colorPrimary: color } }}>
        <Button {...this.props} className={type + 'Button ' + className} type="primary" />
      </ConfigProvider>
    )
  }
}

export default CustomizationButton

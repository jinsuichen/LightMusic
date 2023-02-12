import { Link } from 'react-router-dom'
import { Component } from 'react'

import CustomizationButton from '../CustomizationButton/CustomizationButton'

import './Header.scss'

const { api } = window

type State = {
  toPosition: string
  switchButtonColor: string
}

class Header extends Component<Record<string, never>, State> {
  state: State = {
    toPosition: 'Settings',
    switchButtonColor: '#9B9B9B'
  }

  handleClick = (): void => {
    const { toPosition, switchButtonColor } = this.state
    this.setState({
      toPosition: toPosition === 'Settings' ? 'AudioPlayer' : 'Settings',
      switchButtonColor: switchButtonColor === '#9B9B9B' ? '#407A52' : '#9B9B9B'
    })
  }

  render(): JSX.Element {
    const { exitProgram } = api

    const { toPosition, switchButtonColor } = this.state

    return (
      <div className={'Header'}>
        <CustomizationButton color={'#ff4d4f'} type={'tiny'} onClick={exitProgram} />
        <Link to={'/' + toPosition}>
          <CustomizationButton color={switchButtonColor} type={'tiny'} onClick={this.handleClick} />
        </Link>
      </div>
    )
  }
}

export default Header

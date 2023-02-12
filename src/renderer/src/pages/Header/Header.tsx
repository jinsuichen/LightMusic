import { Component } from 'react';

import CustomizationButton from '../../components/CustomizationButton/CustomizationButton';

import './Header.scss';

const { api } = window;

type Props = {
  select: Array<'close' | 'setting'>;
};

class Header extends Component<Props, Record<string, never>> {
  render(): JSX.Element {
    const { closeFocusWindow } = api;

    const { select } = this.props;
    const close: boolean = select.some((value) => value === 'close');
    const setting: boolean = select.some((value) => value === 'setting');

    return (
      <div className={'Header'}>
        {close ? (
          <CustomizationButton color={'#ff4d4f'} type={'tiny'} onClick={closeFocusWindow} />
        ) : null}
        {setting ? (
          <CustomizationButton color={'#9B9B9B'} type={'tiny'} onClick={api.createSettingsWindow} />
        ) : null}
      </div>
    );
  }
}

export default Header;

import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';
import { HashRouter} from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // close StrictMode to avoid rendering component twice
  // avoid setting interval twice
  // cannot open StrictMode!
  // <React.StrictMode>

  // Had to Replace BrowserRouter with HashRouter.
  // https://stackoverflow.com/questions/65047126/
  // https://stackoverflow.com/questions/36505404/
  <HashRouter>
    <App />
  </HashRouter>,

  // </React.StrictMode>,
);

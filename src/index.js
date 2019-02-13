import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import './index.scss';
import App from './containers/App/index';
import { store } from './stores';

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root'),
);


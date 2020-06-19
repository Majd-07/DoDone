import React from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset'; // import css library
import App from './App';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import About from './components/About';
import Navbar from './components/Navbar';

import './index.css';

ReactDOM.render(
	<Router>
		<div>
			<Navbar />
			<Route exact path='/' component={App} />
			<Route exact path='/about' component={About} />
		</div>
	</Router>,
	document.getElementById('root')
);

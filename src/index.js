import React from 'react'
import ReactDOM from 'react-dom'
import '@atlaskit/css-reset' // import css library
//import styled from 'styled-components'
//import { DragDropContext } from 'react-beautiful-dnd';
// import db from './firebaseConfig';
// import initialData from './initial-data';
// import emptyData from './emptyData';
// import Column from './Column.jsx';
// import Button from './Button';
import App from './App'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import About from './components/About'
import Navbar from './components/Navbar'

import './index.css'

ReactDOM.render(
	<Router>
		<div>
			<Navbar />
			<Route exact path='/' component={App} />
			<Route exact path='/about' component={About} />
		</div>
	</Router>,
	document.getElementById('root')
)

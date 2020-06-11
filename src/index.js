import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset'; // import css library
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import db from './firebaseConfig';
import initialData from './initial-data';
import emptyData from './emptyData';
import Column from './Column.jsx';
import Button from './Button';
import App from './App';
import './index.css';
const Container = styled.div`
	display: flex;
`;

ReactDOM.render(<App />, document.getElementById('root'));

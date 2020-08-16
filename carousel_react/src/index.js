import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Carousel from './carousel';

const pictures = [
  {
    src:'/static/1.jpg',
    alt:'1',
  },
]

ReactDOM.render(
   <Carousel pictures={pictures} aniTime={1000} keepTime={1000} width={300} height={100}/>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

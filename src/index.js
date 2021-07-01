import React from 'react';
import ReactDOM from 'react-dom';

import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useRouteMatch,
	useParams
} from "react-router-dom";

import './assets/index.css';

import ErrorBoundary from './ErrorBoundary';
import App from './Components/App.jsx';
import Home from './Components/Home.jsx';

React.lazy();

function AppRouter() {
	return (
		<Router>
			<Switch>
				<ErrorBoundary>
					<Route path="/videos/:videoId">
						<App />
					</Route>
					<Route path="/videos">
						<App />
					</Route>
					<Route exact path="/">
						<Home />
					</Route>
				</ErrorBoundary>
			</Switch>
		</Router>
	);
}

ReactDOM.render(
	<React.StrictMode>
		<AppRouter />
	</React.StrictMode>,
	document.getElementById('root')
);
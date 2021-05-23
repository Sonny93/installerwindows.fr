import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import urlify from './Utils/Urlify';

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { error: null, errorInfo: null };
	}

	componentDidCatch(error, errorInfo) {
		this.setState({
			error: error,
			errorInfo: errorInfo
		});
	}

	render() {
		if (this.state.errorInfo) {
			return (
				<div>
					<h2 style={{ textAlign: 'center' }}>Une erreur est survenue</h2>
					<p style={{ whiteSpace: 'pre-wrap', textAlign: 'center' }} dangerouslySetInnerHTML={{ __html: urlify(`Si cela se reproduit, merci de nous en informer\nhttps://discord.gg/informatique`) }}></p>
					<details style={{ whiteSpace: 'pre-wrap' }}>
						{this.state.error && this.state.error.toString()}
						<br />
						{this.state.errorInfo.componentStack}
					</details>
				</div>
			);
		}
		return this.props.children;
	}
}

ReactDOM.render(
	<React.StrictMode>
		<ErrorBoundary>
			<App />
		</ErrorBoundary>
	</React.StrictMode>,
	document.getElementById('root')
);
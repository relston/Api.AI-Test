import React from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';

class ChatInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value:""
		}
	}
	onChange(e){
		this.setState({value:e.target.value});
	}
	handleKeyPress(e) {
		if (e.key === 'Enter') { 
			this.props.handler(e.target.value);
			this.setState({value:""});
		}
	}
	render() {
		return (
			<input 
				value={this.state.value}
				onKeyPress={this.handleKeyPress.bind(this)}
				onChange={this.onChange.bind(this)}
			/>
		)
	}
}
class ChatOutput extends React.Component {
	render() {
		return (
			<textarea rows="30" value={this.props.copy.join('\n')} readOnly />
		)
	}	
}
class ChatApp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			chatlines : []
		};
	}
	handleChatInput(chattext) {
		this.state.chatlines.push("User: "+chattext);
		this.setState(this.state);
		this.getChatResponse(chattext);
	}
	getChatResponse(chattext) {
		let self = this;
		request.post('/input')
			.send({text: chattext})
			.end((err, res)=>{
				console.log(res.body.message);
				this.state.chatlines.push("Bot: "+res.body.message);
				this.setState(this.state);
			});
	}
	render() {
		return (
			<div>
				<ChatInput handler={this.handleChatInput.bind(this)} />
				<ChatOutput copy={this.state.chatlines}/>
			</div>
		)
	}	
}

ReactDOM.render(
  <ChatApp />,
  document.getElementById('root')
);
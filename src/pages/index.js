import React from 'react';
import './style.css';
import 'tachyons';

export default class MultiInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			editedname: '',
			namearray: [],
			flag: false,
			editmode: false,
			index: ''
		}
	}

	onChange = (ev) => {
		this.setState({name: ev.target.value, editmode: true});
	}

	enterpressalert = (e, textinput) => {
		var code = (e.keyCode ? e.keyCode : e.which);
		if(code === 13) {
			if(e.target.value.length === 0) {
				alert("Field can not be empty. Please fill some value.");
			}
			else {
				this.setState({namearray: this.state.namearray.concat([e.target.value]), name: ''});
			}
		}
	}

	onFormSubmit = () => {
		console.log(this.state);
	}

	onEdit = (ev, index) => {
		this.state.namearray[index] = ev.target.value;
		this.setState({namearray: this.state.namearray});
		// this.setState({editedname: ev.target.value, index: index});
	}

	onSave = (e) => {
		e.preventDefault();
		if(this.state.name.length === 0) {
			console.log("MultiInput Data", this.state.namearray);
		}
		else {
			console.log("MultiInput Data", this.state.namearray.concat([this.state.name]));
			this.setState({namearray: this.state.namearray.concat([this.state.name])});
		}

		this.setState({ editmode: 'false', namearray: [], name: ''}, 
			() => {alert("Successfully saved")
		});
	}

	onCancel = () => {
		this.state.namearray.splice(0, this.state.namearray.length);
		this.setState({namearray: this.state.namearray, editmode: 'false', name: ''});
	}

	onDelete = (index) => {
		this.state.namearray.splice(index, 1)
		this.setState({namearray: this.state.namearray});
	}

	render() {
		return (
			<div className="mt5 mb2 mb4-ns pt4 w-90 center br2 bg-white" style={{
				boxShadow: 'rgba(0,0,0,0.5) 0px 0px 8px 0px'}}>

				<div className="w-100">
					<div className="w-100 w-20-ns pl4 fl-ns">
						<p>Test</p>
					</div>

					<div className="w-100 w-80-ns fr-ns">
						{this.state.namearray.map((text, index) => (
							<div className="mt2 center user-input-wrp">
							  <br/>
							  <input 
							  	type="text" 
							  	className="inputText" 
							  	key={index}
									value={text}
									onChange={e => this.onEdit(e, index)}
							  	required/>
							  <span className="floating-label">test attribute</span>
							  <button style={{backgroundColor: 'transparent', border: 'none', color: 'grey'}} 
							  onClick={() => this.onDelete(index)}>X</button>
							</div>
						))}

						<div className="mt2 center user-input-wrp">
						  <br/>
						  <input 
						  	type="text" 
						  	className="inputText" 
						  	value={this.state.name}
								onChange={e => this.onChange(e)}
								onKeyPress={e => this.enterpressalert(e, this)}
						  	required/>
						  <span className="floating-label">test attribute</span>
						</div>
					</div>

				</div>

				<footer className="w-100 cf pv4-ns pv3 ph3 ph5-ns mt5 tc" 
					style={{backgroundColor: '#d9eef4', marginTop: '38%'}}>
					{this.state.editmode === true ? 
						<div className="w-100 w-40-ns w-30-l fr-ns">
							<button className="hover-black f6 pointer" 
								style={{backgroundColor: 'transparent', border: 'none', color: 'grey'}} 
								onClick={() => this.onCancel()}>
							CANCEL</button>
						  <button className="hover-black f6 ml3 pointer" 
						  	style={{backgroundColor: 'transparent', border: 'none', color: 'grey'}} 
						  	onClick={(e) => this.onSave(e)}>
						  SAVE</button>
						</div>
						: null
					}
				</footer>

			</div>
					
		);
	}
}
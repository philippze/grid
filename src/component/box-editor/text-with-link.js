import React, {Component, PropTypes} from 'react';

import EditorInput from './editor-input.js';

class TextWithLink extends Component {
	
	/**
	 * ------------------------------------------------
	 * lifecycle
	 * ------------------------------------------------
	 */
	constructor(props) {
		super(props);
		this.state = {
			show_link_input: props.showLinkInput,
		}
	}
	
	/**
	 * ------------------------------------------------
	 * rendering
	 * ------------------------------------------------
	 */
	render() {
		const {
			title,
			title_placeholder,
			text,
			url,
			onTextChange,
			onUrlChange,
			urlDeleteText,
			urlAddText,
		} = this.props;
		
		const {show_link_input} = this.state;
		
		return (
			<div
				className="box-editor__text-with-link"
			>
				<label
					className="text-with-link__title">
					{title}
				</label>
				
				<EditorInput
					placeholder={title_placeholder}
					type="text"
					value={text}
					classname="text-with-link__input"
				    onChange={onTextChange}
				/>
				
				<div
					className={`box-editor__url-builder ${(show_link_input)? "is-active": "is-inactive" }`}
				>
					<EditorInput
						placeholder="Title URL (for internals links, please use a relative path starting with '/'):"
						type="text"
						value={url}
						classname="url-builder__title-url"
					    onChange={onUrlChange}
					    disabled={!show_link_input}
					/>
					
					<button
						className="url-builder__button"
					    onClick={this.onToggleLink.bind(this)}
					>
						{(show_link_input)? urlDeleteText: urlAddText}
					</button>
				</div>
			</div>
		)
	}
	
	/**
	 * ------------------------------------------------
	 * events
	 * ------------------------------------------------
	 */
	onToggleLink(){
		if(this.state.show_link_input){
			this.state.value = '';
		}
		this.setState({show_link_input: !this.state.show_link_input});
	}
	/**
	 * ------------------------------------------------
	 * other functions
	 * ------------------------------------------------
	 */
}

TextWithLink.defaultProps = {
	title: null,
	title_placeholder: "Title",
	text: "",
	url: "",
	showLinkInput: false,
	urlDeleteText: "Delete Link",
	urlAddText: "Add Link",
};

TextWithLink.propTypes = {
	title: PropTypes.string,
	title_placeholder: PropTypes.string,
	text: PropTypes.string,
	url: PropTypes.string,
	onTextChange: PropTypes.func.isRequired,
	onUrlChange: PropTypes.func.isRequired,
	showLinkInput: PropTypes.bool,
	urlDeleteText: PropTypes.string,
	urlAddText: PropTypes.string,
};

export default TextWithLink;
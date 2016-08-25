import React, { Component, PropTypes } from 'react';
import { DragSource } from 'react-dnd';
import { ItemTypes } from '../../constants';

import ContainerDragPreview from '../../helper/container-drag-preview.js';


const containerSource = {
	beginDrag(props){
		console.log("begin drag");
		return {
			id: props.id,
			index: props.index,
			title: props.title,
		};
	},
	endDrag(props, monitor) {
		const item = monitor.getItem();
		const dropResult = monitor.getDropResult();
		console.log("dropped", item, dropResult);
		if (dropResult) {
			// window.alert( // eslint-disable-line no-alert
			//   `You dropped ${item.name} into ${dropResult.name}!`
			// );
		}
	}
};

function collect(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		connectDragPreview: connect.dragPreview(),
		isDragging: monitor.isDragging()
	}
}

class Container extends Component{
	constructor(props){
		super(props);
		this.state = {active: false};
	}
	componentDidMount(){
		console.log("did mount");
		const { connectDragPreview } = this.props;
		
		let result = ContainerDragPreview.create(this.state.dom.clientWidth, this.props.slots.length);
		
		result.img.onload = () => connectDragPreview(result.img);
		
		result.img.src = result.src;
		
	}
	domReady(element){
		this.state.dom = element;
		
	}
	render(){
		const class_name = "grid-container grid-contaner-"+this.props.type;
		const { connectDragSource, connectDragPreview, isDragging } = this.props;
		// if(isDragging) return null;
		return (
			<div className={class_name}
			     style={{
				     display: isDragging ? "none" : "block",
			     }}
			     ref={this.domReady.bind(this)}
			>
				
				<div className="grid-container-controls">
					<span className="grid-container-title">test{this.props.title}</span>
					{connectDragSource(
						<span
							style={{
								cursor: "move"
							}}
							className="grid-container-sorthandle hide-grid-container-editor ui-sortable-handle">
						  <i className="icon-drag" />
					  </span>
					)}
					<div className="grid-container-options">
						<span className="grid-container-options-icon">Options <i className="icon-options" /></span>
						<ul className="grid-container-options-list">
							<li className="grid-container-options-list-item" role="edit"><i className="icon-edit" /> Edit</li>
							<li className="grid-container-options-list-item" role="reuse"><i className="icon-reuse" /> Reuse</li>
							<li className="grid-container-options-list-item" role="toggleslotstyles"><i className="icon-style" /> Slot-styles</li>
							<li className="grid-container-options-list-item" role="trash"><i className="icon-trash" /> Delete</li>
						</ul>
					</div>
				</div>
				
				<div className="grid-container-content">
					<div className="grid-container-before">
						<div className="grid-container-prolog">PROLOG</div>
					</div>
					
					<div className="grid-slots-wrapper">{this.props.children}</div>
					
					<div className="grid-container-after">
						<div className="grid-container-epilog">EPILOG</div>
					</div>
				</div>
			</div>
		)
	}
}

Container.propTypes = {
	connectDragSource: PropTypes.func.isRequired,
	connectDragPreview: PropTypes.func.isRequired,
	isDragging: PropTypes.bool.isRequired,
	id: PropTypes.any.isRequired
};

export default DragSource(ItemTypes.CONTAINER, containerSource, collect)(Container);
import React from 'react';
import ThingForm from './ThingForm';
import { connect } from 'react-redux';
import axios from 'axios';

const Things = ({ things, deleteThing }) => {
	return (
		<div>
			<h1>Things</h1>
			<ul>
				{
					things.map(thing => {
						return (
							<li key={thing.id}>
								{thing.name}
								<button onClick={() => deleteThing(thing.id)}>X</button>
							</li>
						);
					})
				}
			</ul>
			<ThingForm />
		</div>
	);
};

const mapStateToProps = (state) => {
	const obj = {
		things: state.things
	}
	return obj;
}

const mapDispatchToProps = (dispatch) => {
	async function deleteThing(id) {
		await axios.delete(`api/things/${id}`);
		dispatch({ type: 'DELETE_THING', thingId: id });
	}
	const obj = {
		deleteThing
	}
	return obj;
}

export default connect(mapStateToProps, mapDispatchToProps)(Things);

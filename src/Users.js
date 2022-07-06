import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';


const Users = ({ users, deleteUser }) => {
	return (
		<div>
			<h1>Users</h1>
			<ul>
				{
					users.map(user => {
						return (
							<li key={user.id}>
								{user.name}
								<button onClick={() => deleteUser(user.id)}>X</button>
							</li>
						);
					})
				}
			</ul>
		</div>
	);
}

const mapDispatchToProps = (dispatch) => {
	async function deleteUser(id) {
		await axios.delete(`api/users/${id}`);
		dispatch({ type: 'DELETE_USER', userId: id });
	}
	const obj = {
		deleteUser
	}
	return obj;
}

const mapStateToProps = (state) => {
	const obj = {
		users: state.users
	}
	return obj
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);

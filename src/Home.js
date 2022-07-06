import React from 'react';
import { connect } from 'react-redux';

const Home = ({ users, things }) => {
	const highestThing = things.sort((a, b) => b.rank - a.rank)[0] || undefined;
	return (
		<div>
			<h1>Home</h1>
			<p>
				Here at the Acme Item Tracker Corp we have {users.length} users and {things.length} things!
			</p>
			<div>
				Current highest ranked thing {highestThing?.name?.toUpperCase()} with a rank of {highestThing?.rank}
			</div>
		</div>
	);
};

const mapSToP = (s) => {
	return {
		users: s.users,
		things: s.things
	};
};

export default connect(mapSToP)(Home);

import React from 'react';
import ThingForm from './ThingForm';
import { connect } from 'react-redux';
import axios from 'axios';

const Things = ({ things, deleteThing, changeRank }) => {
    return (
        <div>

            <h1>Things</h1>
            <ul>
                {
                    things.map(thing => {
                        return (
                            <li key={thing.id}>
                                {thing.name} Current Rank ({thing.rank})
                                <hr />
                                <button onClick={() => changeRank(thing.id, thing.rank + 1)}>+ rank for {thing.name}</button>
                                <button onClick={() => changeRank(thing.id, thing.rank - 1)}>- rank for {thing.name}</button>
                                <button onClick={() => deleteThing(thing.id)}>Delete {thing.name}</button>
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
    async function changeRank(thingId, thingRank) {
        const res = await axios.put(`/api/things/${thingId}/rank`, { rank: thingRank });
        const updatedThing = res.data;
        dispatch({ type: 'CHANGE_RANK', thingId, updatedThing });
    }
    async function deleteThing(id) {
        await axios.delete(`api/things/${id}`);
        dispatch({ type: 'DELETE_THING', thingId: id });
    }
    const obj = {
        deleteThing,
        changeRank
    }
    return obj;
}

export default connect(mapStateToProps, mapDispatchToProps)(Things);

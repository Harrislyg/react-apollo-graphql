import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link, hashHistory } from 'react-router';
import query from '../queries/fetchSongs';

class SongCreate extends Component {
    constructor(props) {
        super(props);
        this.state = { title: '' };
    }

    onSubmit(event) {
        event.preventDefault();
        this.props
            .mutate({
                variables: { title: this.state.title },
                // refetch the query to render the updated list of songs after a new song has been added
                refetchQueries: [{ query: query }]
                // Can include variables as the second param if there are any variables that we need to pass to the query
                // refetchQueries: [{ query: query, variables: variables }]
            })
            .then(() => hashHistory.push('/'));
    }

    render() {
        return (
            <div>
                <Link to="/">Back</Link>
                <h3>Create a New Song</h3>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <label>Song Title:</label>
                    <input
                        onChange={event =>
                            this.setState({ title: event.target.value })}
                        value={this.state.title}
                    />
                </form>
            </div>
        );
    }
}

const mutation = gql`
    mutation AddSong($title: String) {
        addSong(title: $title) {
            title
        }
    }
`;

export default graphql(mutation)(SongCreate);

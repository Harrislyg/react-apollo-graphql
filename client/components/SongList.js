import React, { Component } from 'react';
// graphql-tag is a helper library for us to write queries inside a component file
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import query from '../queries/fetchSongs';

class SongList extends Component {
    onSongDelete(id) {
        this.props
            .mutate({
                variables: { id: id }
                // refetchQueries: [{ query: query }]
            })
            // I can use this promise to re-render the updated list because the query to render the list of songs is associated with this component specifically
            .then(() => this.props.data.refetch());
    }

    renderSongs() {
        return this.props.data.songs.map(song => {
            return (
                <li key={song.id} className="collection-item">
                    <Link to={`/songs/${song.id}`}>
                        {song.title}
                    </Link>
                    <i
                        className="material-icons"
                        onClick={() => this.onSongDelete(song.id)}
                    >
                        delete
                    </i>
                </li>
            );
        });
    }
    render() {
        if (this.props.data.loading) {
            return <div>Loading...</div>;
        }
        return (
            <div>
                <ul className="collection">
                    {this.renderSongs()}
                </ul>
                <Link
                    to="/songs/new"
                    className="btn-floating btn-large red right"
                >
                    <i className="material-icons">add</i>
                </Link>
            </div>
        );
    }
}

// gql variable only defines the query not execute
// const query = gql`
//     {
//         songs {
//             id
//             title
//         }
//     }
// `;

const mutation = gql`
    mutation DeleteSong($id: ID) {
        deleteSong(id: $id) {
            id
            title
        }
    }
`;

export default graphql(mutation)(graphql(query)(SongList));

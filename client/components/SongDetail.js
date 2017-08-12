import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import fetchSong from '../queries/fetchSong';
import LyricCreate from './LyricCreate';
import LyricList from './LyricList';

class SongDetail extends Component {
    render() {
        // console.log(this.props);
        // Make sure if the song exist before rendering the song details
        const { song } = this.props.data;
        if (!song) {
            return <div> Loading... </div>;
        }
        return (
            <div>
                <Link to="/"> Back </Link>
                <h3>
                    {song.title}
                </h3>
                <LyricList lyrics={song.lyrics} />
                <LyricCreate songId={this.props.params.id} />
            </div>
        );
    }
}

// Example of how to pass parameters into the graphql query
export default graphql(fetchSong, {
    options: props => {
        return {
            variables: {
                id: props.params.id
            }
        };
    }
})(SongDetail);

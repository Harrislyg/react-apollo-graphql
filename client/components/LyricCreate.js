import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class LyricCreate extends Component {
    constructor(props) {
        super(props);
        this.state = { content: '' };
    }
    onSubmit() {
        event.preventDefault();
        this.props
            .mutate({
                variables: {
                    content: this.state.content,
                    songId: this.props.songId
                }
            })
            .then(() => this.setState({ content: '' }));
    }
    render() {
        return (
            <form onSubmit={this.onSubmit.bind(this)}>
                <label>Add a Lyric</label>
                <input
                    value={this.state.content}
                    onChange={event =>
                        this.setState({ content: event.target.value })}
                />
            </form>
        );
    }
}

// Include the id field in all the queries in order for Apollo Client to identify data
const mutation = gql`
    mutation AddLyricToSong($content: String, $songId: ID) {
        addLyricToSong(content: $content, songId: $songId) {
            id
            lyrics {
                id
                content
                likes
            }
        }
    }
`;

export default graphql(mutation)(LyricCreate);

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStreams } from '../../actions';

class StreamList extends React.Component
{
    componentDidMount() {
        this.props.fetchStreams();
    }

    renderAdminButton = stream => {
        if (stream.userId === this.props.currentUserId) {
            return (
                <div className="right floated content">
                    <button className="ui button primary">
                        Edit
                    </button>
                    <button className="ui button negative">
                        Delete
                    </button>
                </div>
            );
        }
    }

    renderCreateButton = () => {
        if (this.props.isSignedIn) {
            return (
                <div style={{ textAlign: 'right'}}>
                    <Link to="/streams/new" className="ui button primary">Create a new Stream</Link>
                </div>
            );
        }
    }

    renderList = () => {
        return this.props.streams.map( stream => {
            return (
                <div className="item" key={stream.id}>
                    { /* Place this button above div-content due to SemanticUI */}
                    {this.renderAdminButton(stream)}

                    <i className="large middle aligned icon camera" />
                    <div className="content">
                        {stream.title}
                        <div className="description">{stream.description}</div>
                    </div>
                </div>
            );
        });
    }

    render() {
        return (
            <div>
                <h2>Streams</h2>
                <div className="ui celled list">
                    {this.renderList()}
                </div>
                {this.renderCreateButton()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    //convert from object to array by Object.values()
    return { 
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    }
}

export default connect(
    mapStateToProps,
    { fetchStreams }
)(StreamList);
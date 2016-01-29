var React = require('react');


var StatusBar = React.createClass({

    propTypes: {
        status: React.PropTypes.string.isRequired
    },

    getDefaultProps() {
        return {
            status: 'not-set'
        }
    },

    render() {
        return (
            <header>
                <div className="row">Last updated: {this.props.status}</div>
            </header>
        )
    }

});

module.exports = StatusBar;
var React = require('react');

var StatusBar = React.createClass({

    shouldComponentUpdate(nextProps, nextState) {
        //console.log('StatusBar\'s old state: '+this.props.status + ' new state: '+nextProps.status);
        return this.props.status !== nextProps.status;
    },

    propTypes: {
        status: React.PropTypes.any.isRequired
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
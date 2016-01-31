var React = require('react');
var ReactDOM = require('react-dom');

var TableCell = React.createClass({

    shouldComponentUpdate(nextProps, nextState) {
        // deeply compare the cells[] with the newProps
        // if they are the same then return true
        return true;
    },

    getInitialState: function () {
        return {
            celldata: ""
        }
    },
    render: function () {
        return (
                <td>{this.props.celldata}</td>
        );
    }
});

module.exports = TableCell;
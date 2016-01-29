var React = require('react');
var ReactDOM = require('react-dom');

var TableCell = React.createClass({
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
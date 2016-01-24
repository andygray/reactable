var React = require('react');
var ReactDOM = require('react-dom');

var TableRow = React.createClass({
    render: function () {
        return (
            <tr>
                <td>{this.props.cell1}</td>
                <td>{this.props.cell2}</td>
                <td>{this.props.cell3}</td>
            </tr>
        );
    }
});

module.exports = TableRow;

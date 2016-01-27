var React = require('react');
var ReactDOM = require('react-dom');

var TableCell = React.createClass({
    getInitialState: function () {
        return {
            cell: ""
        }
    },
    componentDidMount: function () {

        if (this.isMounted()) {
            var cellList = this.props.cells.map(function (item, index) {
                return <TableCell celldata={item}/>
            });

            this.setState({cell: "blah"});
        }
    },
    render: function () {
        return (
                <td>{this.props.celldata}</td>
        );
    }
});

module.exports = TableCell;
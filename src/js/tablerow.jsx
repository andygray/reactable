var React = require('react');
var TableCell = require('./tablecell.jsx');
var _ = require('lodash');

var TableRow = React.createClass({

    shouldComponentUpdate(nextProps) {
        return !_.isEqual(nextProps.cells, this.props.cells);
    },

    propTypes: {
        cells: React.PropTypes.array.isRequired
    },

    getInitialState: function () {
        return {
            cells: [],
            score: 0
        };
    },

    render: function () {
        var cellList = this.props.cells.map(function (item, index) {
            return <TableCell celldata={item} key={index}/>
        });
        return (
            <tr>
                {cellList}
            </tr>
        );
    }
});

module.exports = TableRow;

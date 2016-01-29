var React = require('react');
var TableCell = require('./tablecell.jsx');

var TableRow = React.createClass({

    propTypes: {
        cells: React.PropTypes.array.isRequired
    },

    getInitialState: function () {
        return {
            cells: []
        };
    },

    componentDidMount: function () {

        if (this.isMounted()) {
            var cellList = this.props.cells.map(function (item, index) {
                return <TableCell celldata={item} key={index}/>
            });

            this.setState({cells: cellList});
        }
    },

    render: function () {
        return (
            <tr>
                {this.state.cells}
            </tr>
        );
    }
});

module.exports = TableRow;

var React = require('react');
var TableRow = require('./tablerow.jsx');
var $ = require('jquery');
/* This table
 - should pull data from the server when it initially loads
 - should have a secondary click function that reveals more info
 (by means of displaying a new row as a child with data, possibly with :firstChild or :after)

 */
var Table = React.createClass({
    getInitialState: function () {
        return {
            rows: [],
            headers: []
        };
    },
    componentDidMount: function () {
        $.getJSON(this.props.source, function (result) {
            if (this.isMounted()) {

                var rowList = result.map(function (row, index) {
                    return <TableRow
                        key={index}
                        cells={[(index + 1), row.player, row.score]}
                    />
                });

                var columnHeaders =
                    this.props.columnHeadings
                        .map(function (header, index) {
                            return ( <th key={index}>
                                {header}
                            </th>)
                        });

                this.setState({rows: rowList});
                this.setState({headers: columnHeaders});
            }
        }.bind(this));
    },
    render: function () {
        return (
            <div>
                <h1>{this.props.text}</h1>
                <table className="table table-striped">
                    <thead className="thead-inverse">
                    <tr>
                        {this.state.headers}
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.rows}
                    </tbody>
                </table>
            </div>
        );
    }
});

module.exports = Table;

var React = require('react');
var ReactDOM = require('react-dom');
var jQuert, $ = require('jquery');
var TableRow = require('./tablerow.jsx');
var _ = require('lodash');

/* This table
 - should pull data from the server when it initially loads
 - should have a secondary click function that reveals more info
 (by means of displaying a new row as a child with data, possibly with :firstChild or :after)

 */
var Table = React.createClass({
    getInitialState: function () {
        return {
            rows: []
        };
    },
    componentDidMount: function () {
        $.getJSON(this.props.source, function (result) {
            if (this.isMounted()) {

                var rowList = _.map(result, function (row, index) {
                    return <TableRow
                        key={index}
                        cell1={index + 1}
                        cell2={row.player}
                        cell3={row.score}
                    />
                });

                this.setState({rows: rowList});
            }
        }.bind(this));
    },
    render: function () {
        return (
            <div>
                <h1>{this.props.text}</h1>
                <table>
                    <thead>
                        <tr>
                            <th>{this.props.col1heading}</th>
                            <th>{this.props.col2heading}</th>
                            <th>{this.props.col3heading}</th>
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

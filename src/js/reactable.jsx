var React = require('react');
var TableRow = require('./tablerow.jsx');
var $ = require('jquery');

var io = require('socket.io-client');

var StatusBar = require('./statusbar.jsx');

/* This table
 - takes a list of columns as properties
 -
 (by means of displaying a new row as a child with data, possibly with :firstChild or :after)

 */
var Table = React.createClass({
    getInitialState() {
        return {
            rows: [],
            status: 'disconnected'
        };
    },

    getTable: function() {
        $.getJSON(this.props.source, function (result) {
            if (this.isMounted()) {

                console.log(result[0]);

                var rowList = result.map(function (row, index) {
                    return <TableRow
                        key={index}
                        cells={[(index + 1), row.player, row.score]}
                    />
                });
                var columnHeaders = this.popHeaders(result);

                this.setState({rows: rowList}, function () {
                    console.log('updated');
                });
                this.setState({headers: columnHeaders});

                console.log(this.state.rows);
            }
        }.bind(this));
    },

    componentWillMount() {

        setInterval(this.getTable, 5000);

        this.socket = io('http://localhost:8080');
        this.socket.on('connect', this.connect);
        this.socket.on('connect_err', this.disconnect);
    },

    popHeaders(result) {
        var columnHeaders;
        var toSetAsHeaders = this.props.headers;

        // check if we have headers, if we don't then use the names given to the data fields
        if (!this.props.headers) {
            toSetAsHeaders = Object.keys(result[0]);
            toSetAsHeaders.unshift("Position");
        }

        columnHeaders = toSetAsHeaders.map(function (header, index) {
            return ( <th key={index + 1}>
                {header.charAt(0).toUpperCase() + header.slice(1)}
            </th>)
        });


        return columnHeaders;
    },

    connect() {
        this.setState({status: 'connected'})
    },

    disconnect() {
        this.setState({status: 'disconnected'})
    },

    render() {
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
                <StatusBar
                    status={this.state.status}>
                </StatusBar>
            </div>
        );
    }
});

module.exports = Table;

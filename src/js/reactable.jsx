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
            headers: [],
            status: 'disconnected'
        };
    },

    componentWillMount() {
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


        this.socket = io('http://localhost:8080');
        this.socket.on('connect', this.connect);
    },

    connect() {
        this.setState({status: 'connected'})
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

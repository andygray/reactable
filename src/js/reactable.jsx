'use strict'
var React = require('react');
var TableRow = require('./tablerow.jsx');
var $ = require('jquery');
var moment = require('moment');
var io = require('socket.io-client');
var _ = require('lodash');

var StatusBar = require('./statusbar.jsx');

/* This table
 - takes a list of columns as properties
 -
 (by means of displaying a new row as a child with data, possibly with :firstChild or :after)

 */
var Table = React.createClass({
    getInitialState() {
        var initialLoadTime = (new Date()).getTime();
        return {
            rows: [],
            status: 'disconnected',
            lastUpdated: initialLoadTime
        };
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        return true;
    },

    getTable: function() {
        $.getJSON(this.props.source, function (result) {

            var rowList = result.table.map(function (row, index) {
                // TODO: remove selections and position somewhere for dynamic disclosure?
                row.selections = "somfink else";
                var cellData = _.values(row);
                return <TableRow
                    key={index}
                    cells={cellData}/>
            });
            var columnHeaders = this.popHeaders(result.table);

            this.setState({rows: rowList}, function () {
                console.log('updated');
            });
            this.setState({headers: columnHeaders});
            this.setState({lastUpdated: result.updated});
            this.setState({title: result.description});
            this.setUpdateStatus();
        }.bind(this));
    },

    setUpdateStatus() {
        let now = (new Date()).getTime();
        let newLastUpdated = now - this.state.lastUpdated;
        let lastUpdated = moment.duration(this.state.lastUpdated);
        this.setState({lastUpdated: this.state.lastUpdated});
        this.setState({status: lastUpdated.humanize()});
    },

    componentWillMount() {

        setInterval(this.getTable, 5000);
        this.getTable();
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
            //toSetAsHeaders.unshift("Position");
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
                <h1>{this.state.title}</h1>
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

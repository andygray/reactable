var React = require('react');
var ReactDOM = require('react-dom');
var jQuert, $ = require('jquery');
/* This table
 - should pull data from the server when it initially loads
 - should have a secondary click function that reveals more info
 (by means of displaying a new row as a child with data, possibly with :firstChild or :after)

 */
var Table = React.createClass({
    getInitialState: function () {
        // call server for data (currently using flat-file: ./tabledata.json)
        var url = this.props.urlForData;
        return $.getJSON(url)
            .then(function (data) {
                return {data: data};
            });
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
                    <tr>
                        <td>{this.props.data.tabledata[0].tee}</td>
                        <td></td>
                        <td></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
});

module.exports = Table;

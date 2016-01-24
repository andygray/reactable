var React = require('react');
var ReactDOM = require('react-dom');
var jQuert, $ = require('jquery');
var TableRow = require('./tablerow.jsx')

/* This table
 - should pull data from the server when it initially loads
 - should have a secondary click function that reveals more info
 (by means of displaying a new row as a child with data, possibly with :firstChild or :after)

 */
var Table = React.createClass({
    getInitialState: function () {
        return {rows: []};
    },
    componentDidMount: function() {
        // call server for data (currently using flat-file: ./tabledata.json)
        $.getJSON(this.props.source,function(result) {
            if (this.isMounted()) {

                var rowList = new Array()
                for(i in result.tabledata){
                    var cell = result.tabledata[i];
                    // each of these should actually be another React component... lazy!
                    rowList.push(<TableRow key={i}
                                            cell1={cell.tee}
                                            cell2={cell.player}
                                            cell3={cell.par}/>)
                }
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

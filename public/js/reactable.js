var React = require('react');
var ReactDOM = require('react-dom');
/* This table
    - should pull data from the server when it initially loads
    - should have a secondary click function that reveals more info
        (by means of displaying a new row as a child with data, possibly with :firstChild or :after)

*/
var Table = React.createClass({
    getInitialState: function(){
        // call server for data (currently using flat-file: ./tabledata.json)

    },
    render: function () {
        return (

            <div>
                <h1>{this.props.text}</h1>
                <p>{this.props.children}</p>
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
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
});

ReactDOM.render(
    <div>
        <Table text="League Table"
               col1heading="Position"
               col2heading="Player"
               col3heading="Points">This is the League Table</Table>
    </div>
    , document.getElementById('react-container'));
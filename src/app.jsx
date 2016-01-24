var React = require('react');
var ReactDOM = require('react-dom');
var ReactTable = require('./js/reactable.jsx')

ReactDOM.render(
    <ReactTable
        text="React Table"
        col1heading="Position"
        col2heading="Player"
        col3heading="Score"
        source="/table/56a52965d4c622243710639e">
    </ReactTable>,
    document.getElementById('react-container')
);
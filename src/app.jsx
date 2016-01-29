var React = require('react');
var ReactDOM = require('react-dom');
var ReactTable = require('./js/reactable.jsx')

ReactDOM.render(
    <ReactTable
        text="React Table"
        columnHeadings={['Position', 'Player', 'Score']}
        source="/table/56a52965d4c622243710639e">
    </ReactTable>,
    document.getElementById('react-container')
);
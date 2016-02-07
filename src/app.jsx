var React = require('react');
var ReactDOM = require('react-dom');
var ReactTable = require('./js/reactable.jsx');

ReactDOM.render(
    <ReactTable
        text="React Table"
        source="/table/56a52965d4c622243710639e"
        formatResponse={function(){
        }}>
    </ReactTable>,
    document.getElementById('react-container')
);

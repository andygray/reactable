var React = require('react');
var ReactDOM = require('react-dom');
var ReactTable = require('./js/reactable.jsx')


ReactDOM.render(
    <ReactTable
        text="React Table"
        col1heading="Tee"
        col2heading="Player"
        col3heading="Score/Par"
        source="./js/tabledata.json">
    </ReactTable>
    , document.getElementById('react-container'));
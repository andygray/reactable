var Table = React.createClass({
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
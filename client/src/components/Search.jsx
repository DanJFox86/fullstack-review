import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    }
  }

  onChange (e) {
    this.setState({
      term: e.target.value
    });
  }

  search() {
    var newTerm = this.state.term.replace(/[^A-Za-z0-9_]+/g, '');
    if (this.state.term !== newTerm) {
      alert(`Oopsie daisy, you put a naw naw character in the search field, bad kitty! Only characters and numbers and underscores. Try again and be careful! `);
      this.setState({
        term: ''
      });
    } else {
      this.props.onSearch(this.state.term, this.props.update25);
    }
  }

  render() {
    return (<div>
      <h4>Add more repos!</h4>
      Enter a github username: <input value={this.state.term} onChange={this.onChange.bind(this)}/>       
      <button onClick={this.search.bind(this)}> Add Repos </button>
    </div>) 
  }
}

export default Search;
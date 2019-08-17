import React, { component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
  }
  update25(repos) {
    console.log(`received ${repos.length} repos`);
    this.setState({
        repos
    });
  }

  componentDidMount() {
    fetch('/repos')
      .then(response => response.json())
      .then((repos) => {
        this.setState({ repos });
        console.log(`received ${repos.length} repos`);
      });
  }

  search (term, updateCB) {
    console.log(`${term} was searched.`);
    $.post('/repos', {data: term}, function(response) {
      console.log(response);
      setTimeout( () => {
        console.log('now going to get top 25')
        $.get('/repos', function(response) {
          updateCB(response)
        })
      }, 1000);
    });
    // TODO
  }

  render () {

    return (<div>
      <h1>Github Fetcher</h1>
      <Search term={this.state.term} update25={this.update25.bind(this)} onSearch={this.search.bind(this)}/>
      <RepoList repos={this.state.repos}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
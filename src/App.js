import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import CardsList from './components/CardsList';
import NewCard from './components/NewCard';
import CardView from './components/CardView';
import PostsProvider from './context/PostsProvider';

function App() {

  return (
    <PostsProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={CardsList} />
          <Route exact path="/posts/new" component={NewCard} />
          <Route exact path="/posts/:postId" component={CardView} />
        </Switch>
      </Router>
    </PostsProvider>
  );
}

export default App;

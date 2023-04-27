import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import DisplayAll from './pages/DisplayAll';
import Search from './pages/Search';
import GetDetails from './pages/CharacterDetail';
import Favorites from './pages/Favorites';

const client = new ApolloClient({
  uri:'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DisplayAll/>}></Route>
          <Route path="/Search" element={<Search/>}></Route>
          <Route path="/CharacterDetail/:id" element={<GetDetails/>}></Route>
          <Route path="/Favorites" element={<Favorites/>}></Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;

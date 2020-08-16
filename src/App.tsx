import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { API, graphqlOperation } from "aws-amplify";
import { listTodos } from './graphql/queries';
import { createTodo } from './graphql/mutations';
import "./API";

type Post = {
  id: string;
  name: string;
  description: string;
}

function App() {

  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
     const f = async () => {
       let result = await API.graphql(graphqlOperation(listTodos))
        console.log(result)
       if ("data" in result && result.data) {
         console.log(result.data)
        //const posts = result.data as ListPostsQuery;
      }
     }

     f()

     const ct = async() => {
       const item = {
        input: {
          id: "2",
          name: "graph",
          description: "aaaa"
        }
       }
       await API.graphql(graphqlOperation(createTodo, item))

     }
     ct()
  }, []);


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

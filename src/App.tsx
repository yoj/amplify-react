import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { API, graphqlOperation } from "aws-amplify";
import { listTodos } from './graphql/queries';
import { createTodo,  } from './graphql/mutations';
import { onCreateTodo  } from './graphql/subscriptions';
import "./API";

type Post = {
  id: string;
  name: string;
  description: string;
}

function App() {

  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    /* get item from DynamoDB */
    const f = async () => {
      let result = await API.graphql(graphqlOperation(listTodos))
      console.log(result)
      if ("data" in result && result.data) {
        console.log(result.data)
       //const posts = result.data as ListPostsQuery;
      }
    }

    f()

    /* create item */
    const ct = async() => {
      let unixtime = new Date().getTime() / 1000;
      const item = {
        input: {
          id: unixtime.toString,
          name: "graph",
          description: "aaaa"
        }
      }
      await API.graphql(graphqlOperation(createTodo, item))

     }
     ct()

     /* subscribe */
     const client = API.graphql(graphqlOperation(onCreateTodo))

     if ("subscribe" in client) {
      console.log(client)
      client.subscribe({
        next: (eventData) => {
          console.log(eventData)
        }
      })
     }
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

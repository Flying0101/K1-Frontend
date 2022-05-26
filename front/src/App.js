import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./App.css";
 
function App() {
  // useState för todo datan.
  const [todo, setTodo] = useState([]);

  // useState för input fältet.
  const [send, setSend] = useState("");

  // hämtar data från back-enden.
  useEffect(() => {
    axios.get("http://localhost:4000/todos")
      .then((res) => {
        setTodo(res.data)
      })
      .catch((error) => console.log(error));
    console.log("req successful");

  }, []);

  // skickar/skriver in ny data till back-enden.
  async function post() {

    const options = {
      method: 'POST',
      url: 'http://localhost:4000/todos',
      headers: { 'Content-Type': 'text/plain' },
      data: `{"id":${1 + Math.floor(Math.random() * 1000000)}, "complete": false, "task": "${send}"}`
    };

    await axios.request(options).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });

  }
  // återställer input useStaten.
  function clear() {
    setSend("");
  }

 
  //Tar bort Todon från back-enden med hjälp av IDn den skickar med.(en delete function helt enkelt)
  function deleteTask(id) {

    
    axios.delete(`http://localhost:4000/todos/${id}`);
    console.log(id);

   

  }

  // Markerar specifik todo som klar eller icke klar. 
  function completeTask(todo) {
    let bool = todo.complete
    bool = !bool;

    axios.patch(`http://localhost:4000/todos/${todo.id}`, { "complete": bool });

  }


  // Här finns allt som ska visas. 

  return (
    <div>
      <form className="app" onSubmit={clear} >

        <input type="text" placeholder="Type your task here...." value={send} onChange={(e) => setSend(e.target.value)} />

        <button type="submit" className="sheesh" onClick={() => post()}>Add</button>

      </form>
      <ul className="container">

        {todo.map((todo) => {
          return (
            <li key={todo.id}>
              <p className={todo.complete ? 'completed-task' : ''} >{todo.task}</p>
              <div>
                <button className="btnThree" onClick={() => [completeTask(todo), window.location.reload()]}>
                  done
                </button>

                <button className="btnTwo" onClick={() => [deleteTask(todo.id), window.location.reload()]} >DELETE</button>
              </div>
            </li>);
        })}
      </ul>


    </div>
  );
}


export default App;

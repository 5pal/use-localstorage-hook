import { useEffect, useState } from "react";
import "./App.css";
import { useLocalStorage } from "./hooks/useLocalStorage";

function App() {
    const key = "chat_list";
    const [content, setContent] = useState("");
    const [todos, setTodos] = useState([]);

    const { setItem, getItem, removeItem, clearItem } = useLocalStorage(key);

    const contentChangeHandler = event => {
        setContent(event.target.value);
    };

    useEffect(() => {
        setTodos(getItem());
    }, []);

    return (
        <>
            <h1>React Custom Hook</h1>
            <h2>useLocalStorage</h2>
            <h3>key : {key}</h3>
            <form
                onSubmit={ev => {
                    ev.preventDefault();
                    const newItem = {
                        id: Date.now().toString(),
                        body: content,
                    };

                    setTodos(prevTodos => {
                        const updatedTodos = [...prevTodos, newItem];
                        setItem(updatedTodos); // 상태가 업데이트된 후 로컬 스토리지 설정
                        return updatedTodos;
                    });
                    setContent("");
                }}
            >
                <input
                    placeholder="fill in the content"
                    type="text"
                    onChange={contentChangeHandler}
                    value={content}
                />

                <button type="submit">Set</button>
            </form>
            <button
                onClick={() => {
                    getItem();
                }}
            >
                Get
            </button>
            <ul>
                {todos &&
                    todos.map(todo => (
                        <div key={todo.id}>
                            <li>{todo.body}</li>
                            <button onClick={() => {}}>remove</button>
                        </div>
                    ))}
            </ul>
            <button
                onClick={() => {
                    alert("Are you sure?");
                    setTodos([]);
                    clearItem();
                }}
            >
                All Clear
            </button>
            <button onClick={() => {}}>one remove</button>
        </>
    );
}

export default App;

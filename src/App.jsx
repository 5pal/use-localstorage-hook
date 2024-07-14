import { useEffect, useState } from "react";
import "./App.css";
import { useLocalStorage } from "./hooks/useLocalStorage";

function App() {
    const KEY = "chat_list";
    const [content, setContent] = useState("");
    const [todos, setTodos] = useState([]);

    const { setItem, getItem, removeItem, clearItem } = useLocalStorage(KEY);

    const contentChangeHandler = ev => {
        setContent(ev.target.value);
    };

    const savedTodos = getItem();
    useEffect(() => {
        console.log(1);
        if (savedTodos) {
            setTodos(savedTodos);
        }
    }, []);

    return (
        <>
            <h1>React Custom Hook</h1>
            <h2>useLocalStorage</h2>
            <h3>key : {KEY}</h3>
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
                    // startTransition(() => {
                    //     setTodos(prevTodos => {
                    //         const updatedTodos = [...prevTodos, newItem];
                    //         // 상태가 업데이트된 후 로컬 스토리지 설정
                    //         setItem(updatedTodos);
                    //         return updatedTodos;
                    //     });
                    // });
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

            <ul>
                {todos.length > 0 ? (
                    todos.map(todo => (
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                            }}
                            key={todo.id}
                        >
                            <li>{todo.body}</li>
                            <div
                                style={{
                                    display: "flex",
                                    gap: "10px",
                                    width: "100%",
                                }}
                            >
                                <button style={{ width: "50%" }}>Edit</button>
                                <button
                                    style={{ width: "50%" }}
                                    onClick={() => {
                                        alert("Are you sure?");
                                        const newItems = removeItem(todo.id);

                                        setTodos(() => {
                                            const updatedTodos = newItems;
                                            setItem(updatedTodos); // 상태가 업데이트된 후 로컬 스토리지 설정
                                            return updatedTodos;
                                        });
                                    }}
                                >
                                    remove
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>no data...</p>
                )}
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
        </>
    );
}

export default App;

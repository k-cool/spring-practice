import { useState, useEffect } from "react";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  // 로컬스토리지 로드
  useEffect(() => {
    const saved = localStorage.getItem("todos");
    if (saved) setTodos(JSON.parse(saved));
  }, []);

  // 로컬스토리지 저장
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!text.trim()) return;
    setTodos([...todos, { id: Date.now(), text, done: false }]);
    setText("");
  };

  const toggleTodo = (id) => {
    setTodos(
        todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-4">Todo App</h1>

          <div className="flex gap-2 mb-4">
            <input
                className="flex-1 border rounded-lg px-3 py-2"
                placeholder="할 일을 입력하세요"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTodo()}
            />
            <button
                className="bg-black text-white px-4 rounded-lg"
                onClick={addTodo}
            >
              추가
            </button>
          </div>

          <div className="space-y-2">
            {todos.map((todo) => (
                <div
                    key={todo.id}
                    className="flex items-center justify-between border p-3 rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={todo.done}
                        onChange={() => toggleTodo(todo.id)}
                    />
                    <span
                        className={
                          todo.done ? "line-through text-gray-400" : ""
                        }
                    >
                  {todo.text}
                </span>
                  </div>

                  <button
                      className="text-red-500"
                      onClick={() => deleteTodo(todo.id)}
                  >
                    삭제
                  </button>
                </div>
            ))}
          </div>
        </div>
      </div>
  );
}
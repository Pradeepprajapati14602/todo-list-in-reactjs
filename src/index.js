import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import Category from "./component/Category";
import DataInput from "./component/DataInput";
import SearchInput from "./component/SearchInput";
import SortingCriteria from "./component/SortingCriteria";
import PriorityFilter from "./component/PriorityFilter";
import "./index.css";
// import TodoList from "./component/TodoList";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [sortingCriteria, setSortingCriteria] = useState("newest");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [date, setDate] = useState("");
  const storedTodos = JSON.parse(localStorage.getItem("todos") || "[]");

  useEffect(() => {
    const storedTodos2 = storedTodos;
    setTodos(storedTodos2);

    const storedCategories = JSON.parse(
      localStorage.getItem("categories") || "[]"
    );
    setCategories(storedCategories);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  const handleNewTodoChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleNewTodoSubmit = (event) => {
    event.preventDefault();
    // if (!newTodo.trim()) return;
    const newTodoItem = {
      id: Date.now(),
      text: newTodo.trim(),
      category: selectedCategory,
      priority: priorityFilter,
      // priority: "low",
      created: new Date(),
      date: date,
    };
    setTodos([...todos, newTodoItem]);
    setNewTodo("");
    storedTodos.push(newTodoItem);
  };

  const handleTodoDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleTodoEdit = (id, newText) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, text: newText.trim() };
        }
        return todo;
      })
    );
  };

  const handleTodoSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategorySelect = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleCategoryAdd = (event) => {
    event.preventDefault();
    const newCategory = event.target.elements.category.value.trim();
    if (!newCategory) return;
    setCategories([...categories, newCategory]);
    setSelectedCategory(newCategory);
    event.target.reset();
  };

  const handleSortingCriteriaChange = (event) => {
    setSortingCriteria(event.target.value);
  };

  const handlePriorityFilterChange = (event) => {
    setPriorityFilter(event.target.value);
  };

  const handleDate = (event) => {
    setDate(event.target.value);
  };

  const filteredTodos = todos.filter(
    (todo) =>
      (todo.text.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (!selectedCategory || todo.category === selectedCategory) &&
        (priorityFilter === "all" || todo.priority === priorityFilter)) ||
      todo.date.includes(searchTerm)
    // (todo.date===handleDate)
  );

  let sortedTodos = filteredTodos;
  if (sortingCriteria === "newest") {
    sortedTodos = [...filteredTodos].sort((a, b) => b.created - a.created);
  } else if (sortingCriteria === "oldest") {
    sortedTodos = [...filteredTodos].sort((a, b) => a.created - b.created);
  } else if (sortingCriteria === "priority") {
    sortedTodos = [...filteredTodos].sort((a, b) => {
      if (a.priority === b.priority) {
        // return a.created;
        return b.created - a.created;
      }
      return b.priority === "high" ? 1 : -1;
    });
  }

  return (
    <div class="ml-6">
      <h1 class="text-3xl font-bold">Todo List</h1>

      <form class="my-4" onSubmit={handleNewTodoSubmit}>
        <DataInput
          newTodo={newTodo}
          handleNewTodoChange={handleNewTodoChange}
        />
        <Category
          selectedCategory={selectedCategory}
          handleCategorySelect={handleCategorySelect}
          categories={categories}
        />
        <input
          class="mx-2 px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          type="date"
          value={date}
          onChange={handleDate}
        />
        <button
          class="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          type="submit"
        >
          Add
        </button>
      </form>
      <form>
        <SearchInput handleTodoSearch={handleTodoSearch} />
        <SortingCriteria
          handleSortingCriteriaChange={handleSortingCriteriaChange}
        />
        <PriorityFilter
          handlePriorityFilterChange={handlePriorityFilterChange}
        />
      </form>
      <form onSubmit={handleCategoryAdd} class="my-4">
        <input
          type="text"
          name="category"
          placeholder="Enter new category"
          class="px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          class="px-4 ml-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          type="submit"
        >
          Add category
        </button>
      </form>
      <ul className="bg-white divide-y divide-gray-200">
        {sortedTodos.map((todo) => (
          <li key={todo.id} className="px-4 py-4 sm:px-6">
            <span className="text flex items-center justify-between">{todo.text}</span>-
            <span className="category text-sm font-medium text-gray-900">{todo.category}</span>-
            <span className="priority text-sm font-medium text-gray-900">{todo.priority}</span>-
            <span className="date text-sm font-medium text-gray-900">{todo.date}</span>
            {/* <span className="created">{ todo.created}</span> */}
            <button
              className="edit-btn inline-flex ml-4 items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-700 active:bg-blue-700 transition ease-in-out duration-150"
            
              onClick={() =>
                handleTodoEdit(todo.id, prompt("Enter new text", todo.text))
              }
            >
              Edit
            </button>
            <button
              className="delete-btn ml-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:shadow-outline-red focus:border-red-700 active:bg-red-700 transition ease-in-out duration-150"
              onClick={() => handleTodoDelete(todo.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      {/* <TodoList sortedTodos={sortedTodos} handleTodoEdit={handleTodoEdit} handleTodoDelete={handleTodoDelete} /> */}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

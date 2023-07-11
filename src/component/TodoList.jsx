function TodoList(sortedTodos,handleTodoEdit,handleTodoDelete){
    return(
        <>
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
        </>
    )
}
export default TodoList;
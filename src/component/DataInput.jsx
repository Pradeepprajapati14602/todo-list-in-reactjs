function DataInput({ newTodo, handleNewTodoChange }) {
    return (
        <>
            <input
                type="text"
                value={newTodo}
                onChange={handleNewTodoChange}
                placeholder="Enter new todo"
                class="px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
        </>
    )
}
export default DataInput;
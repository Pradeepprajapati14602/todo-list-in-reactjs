function searchInput({handleTodoSearch}){
    return(
        <>
            <input class="px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          type="text"
          placeholder="Search todo"
          onChange={handleTodoSearch}
        />
        </>
    )
}
export default searchInput
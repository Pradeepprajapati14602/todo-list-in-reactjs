function priorityFilter(handlePriorityFilterChange){
    return(
        <>
        <select
        class="mx-2 px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
         value={priorityFilter} onChange={handlePriorityFilterChange}>
          <option value="all">All priorities</option>
          <option value="low">Low priority</option>
          <option value="high">High priority</option>
        </select>
        </>
    )
}
export default priorityFilter;
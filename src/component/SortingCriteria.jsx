function sortingCriteria(handleSortingCriteriaChange){
    return(
        <>
        <select
        class="mx-2 px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
         value={sortingCriteria} onChange={handleSortingCriteriaChange}>
          <option value="newest">Sort by newest</option>
          <option value="oldest">Sort by oldest</option>
          <option value="priority">Sort by priority</option>
        </select>
        </>
    )
}
export default sortingCriteria;
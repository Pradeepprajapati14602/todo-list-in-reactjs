function Category({selectedCategory,handleCategorySelect,categories}){
    return(
        <>
            <select 
            class="mx-2 px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
             value={selectedCategory} onChange={handleCategorySelect}>
          <option value="">Select category...</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        </>
    )
}
export default Category
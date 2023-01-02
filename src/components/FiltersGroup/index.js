import {BsSearch} from 'react-icons/bs'
import './index.css'

const FiltersGroup = props => {
  const {
    categoryOptions,
    ratingsList,
    changeCategory,
    changeRating,
    changeSearchTitle,
    clearFilters,
  } = props

  const onCategoryChange = e => {
    changeCategory(e.target.value)
  }

  const onRatingChange = event => {
    changeRating(event.currentTarget.value)
  }

  const onSearchChange = e => {
    if (e.key === 'Enter') {
      changeSearchTitle(e.target.value)
    }
  }

  const onClearbtnClick = () => {
    clearFilters()
  }

  return (
    <div className="filters-group-container">
      <div className="input-bar-container">
        <input
          onKeyDown={onSearchChange}
          placeholder="Search"
          type="search"
          className="input-bar"
        />
        <BsSearch className="search-icon" />
      </div>
      <h1 className="category-heading">Category</h1>
      {categoryOptions.map(each => (
        <button
          onClick={onCategoryChange}
          value={each.categoryId}
          type="button"
          className="category-btn"
        >
          {each.name}
        </button>
      ))}

      <h1 className="category-heading">Rating</h1>
      {ratingsList.map(each => (
        <button
          onClick={onRatingChange}
          value={each.ratingId}
          type="button"
          className="rating-btn"
        >
          <img
            className="star-pic"
            src={each.imageUrl}
            alt={`rating ${each.ratingId}`}
          />

          <p className="para-star">& up</p>
        </button>
      ))}

      <button
        onClick={onClearbtnClick}
        className="clear-filters-btn"
        type="button"
      >
        Clear Filters
      </button>
    </div>
  )
}

export default FiltersGroup

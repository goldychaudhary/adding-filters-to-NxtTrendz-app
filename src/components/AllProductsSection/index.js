import {Component} from 'react'

import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import FiltersGroup from '../FiltersGroup'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'

import './index.css'

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

class AllProductsSection extends Component {
  state = {
    productsList: [],
    isLoading: false,
    requestFailed: false,
    activeOptionId: sortbyOptions[0].optionId,
    title: '',
    categoryId: '',
    ratingId: '',
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({
      isLoading: true,
    })
    const jwtToken = Cookies.get('jwt_token')

    // TODO: Update the code to get products with filters applied

    const {activeOptionId, categoryId, ratingId, title} = this.state
    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&category=${categoryId}&title_search=${title}&rating=${ratingId}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    console.log(response)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      this.setState({
        productsList: updatedData,
        isLoading: false,
      })
    }
    if (response.ok === false) {
      this.setState({isLoading: false, requestFailed: true})
    }
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }

  changeCategory = categoryId => {
    this.setState({categoryId}, this.getProducts)
  }

  changeRating = ratingId => {
    this.setState({ratingId}, this.getProducts)
  }

  changeSearchTitle = value => {
    this.setState({title: value}, this.getProducts)
  }

  clearFilters = () => {
    this.setState({title: '', categoryId: '', ratingId: ''}, this.getProducts)
  }

  renderProductsList = () => {
    const {productsList, activeOptionId, requestFailed} = this.state

    if (requestFailed) {
      return (
        <div className="no-product-view-container">
          <img
            className="no-product-view-pic"
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
            alt="products failure"
          />
          <h1>Oops! Something Went Wrong</h1>
          <p>
            We are having some trouble processing your request. Please try
            again.
          </p>
        </div>
      )
    }

    if (productsList.length === 0) {
      return (
        <div className="no-product-view-container">
          <img
            className="no-product-view-pic"
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
            alt="no products"
          />
          <h1>No Products Found</h1>
          <p>We could not find any products. Try other filters.</p>
        </div>
      )
    }

    // TODO: Add No Products View
    return (
      <div className="all-products-container">
        <ProductsHeader
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          changeSortby={this.changeSortby}
        />
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  // TODO: Add failure view
  //   renderFailureView = () => (
  //     <div className="no-product-view-container">
  //       <img
  //         className="no-product-view-pic"
  //         src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
  //         alt="products failure"
  //       />
  //       <h1>Oops! Something Went Wrong</h1>
  //       <p>
  //         We are having some trouble processing your request. Please try again.
  //       </p>
  //     </div>
  //   )

  render() {
    const {isLoading, categoryId, ratingId, title} = this.state
    console.log(categoryId, ratingId, title)

    return (
      <div className="all-products-section">
        <FiltersGroup
          categoryOptions={categoryOptions}
          ratingsList={ratingsList}
          changeCategory={this.changeCategory}
          changeRating={this.changeRating}
          changeSearchTitle={this.changeSearchTitle}
          clearFilters={this.clearFilters}
        />

        {isLoading ? this.renderLoader() : this.renderProductsList()}
      </div>
    )
  }
}

export default AllProductsSection

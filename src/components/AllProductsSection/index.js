import Loader from 'react-loader-spinner'
import {Component} from 'react'
import Cookies from 'js-cookie'
import ProductCard from '../ProductCard'

import './index.css'

class AllProductsSection extends Component {
  state = {
    productsList: [],
    isLoading: true,
  }

  // call the api
  componentDidMount() {
    this.getProductsList()
  }

  // get the products list using api
  getProductsList = async () => {
    const url = 'https://apis.ccbp.in/products'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`, // for user identification purpose jwtToken is inserted to headers whether user is looged in or not
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()

    // covnvert the data snakeCase to camelCase
    const updatedData = data.products.map(product => ({
      tittle: product.tittle,
      brand: product.brand,
      price: product.price,
      id: product.id,
      imageUrl: product.image_url,
      rating: product.rating,
    }))
    this.setState({productsList: updatedData, isLoading: false}) // update the productsList where we recieve the data from the server
  }

  renderProductsList = () => {
    const {productsList} = this.state
    return (
      <div>
        <h1 className="products-list-heading">All Products</h1>
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    )
  }

  // adding spinner loader to the products list
  spinnerLoader = () => (
    <div className="sppiner-container">
      <Loader type="TailSpin" color="blue" width={50} height={50} />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return (
      <>
        <div className="loader-container">
          {isLoading ? this.spinnerLoader() : this.renderProductsList()}
        </div>
      </>
    )
  }
}

export default AllProductsSection

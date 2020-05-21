import React from 'react'
import Card from './card'

const SingleProduct = ({ product }) => {
debugger
  return (
    <div>
      <div className="">
        <h1>{product.title}</h1>
        <p>{product.commonproduct.model}</p>
      </div>
    </div>
  )
}

export default SingleProduct

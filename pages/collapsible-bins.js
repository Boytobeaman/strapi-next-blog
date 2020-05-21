import React from 'react'
import Products from '../components/products'
import Layout from '../components/layout'
import {DOMAIN, FOLDING_CRATE } from '../utils'
import { getProducts, getCategories, getProductsByCondition } from '../lib/api'

const Home = ({ products, categories }) => {
  return (
    <Layout categories={categories}>
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <h1>Strapi blog</h1>
          <Products products={products} />
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {

  let condition = {"domain":{"name": DOMAIN}, "product_identify_cat": FOLDING_CRATE}
  const products = (await getProductsByCondition(condition)) || []
  const categories = (await getCategories()) || []
  return {
    props: { products, categories },
  }
}

export default Home

import React from 'react'
import Articles from '../components/articles'
import Layout from '../components/layout'
import {DOMAIN, FOLDING_CRATE } from '../utils'
import { getArticles, getCategories, getProductsByCondition } from '../lib/api'

const Home = ({ articles, categories }) => {
  return (
    <Layout categories={categories}>
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <h1>Strapi blog</h1>
          Home page
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {

  let condition = {"domain":{"name": DOMAIN}, "product_identify_cat": FOLDING_CRATE}
  const articles = (await getProductsByCondition(condition)) || []
  console.log(`articles.length ==== ${articles.length}`)
  const categories = (await getCategories()) || []
  return {
    props: { articles, categories },
  }
}

export default Home

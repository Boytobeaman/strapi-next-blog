import React from 'react'
import Articles from '../components/articles'
import Layout from '../components/layout'
import {DOMAIN } from '../utils'
import { getArticles, getProductsByCondition } from '../lib/api'

const Home = ({ articles }) => {
  return (
    <Layout>
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <h1>Strapi blog</h1>
          Home page
        </div>
      </div>
    </Layout>
  )
}


export default Home

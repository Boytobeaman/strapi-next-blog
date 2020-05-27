import React from 'react'
import Products from '../components/products'
import Layout from '../components/layout'
import SEO from '../components/SEO/SEO';
import Link from 'next/link'
import {DOMAIN, menu } from '../utils'
import { getProducts, getCategories, getProductsByCondition } from '../lib/api'

const Home = ({ products }) => {

  // for facebook url
  let cat_link = products[0].seo_category_slug
  cat_link= `/${cat_link}/`
  // need to change
  let cat_text = menu.pallet.text
  let the_image = ``;

  return (
    <Layout>
      <section className="section product-cate-page">
        <SEO 
          thisTitleTemplate={`%s | ${cat_text} for sale`}
          title={`${cat_text}, cheap ${cat_text}, Ideal for transportation`}
          description = {`Wholesale ${cat_text}, cheap ${cat_text} for sale, Heavy Duty Export Plastic Pallets Perfect for One-Way Trips`}
          pathname = {`${cat_link}`}
          image = {the_image ? the_image : ''}
          position = '2'
          ratingValue = '4.9'
          reviewCount = '238'
          price = '97.19'
          lowPrice = '79.69'
          highPrice = '122.39'
        />
        <div className="container-fluid">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb bg-white my-2">
              <li className="breadcrumb-item">
                <Link href="/">
                  <a>Home</a>
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">{cat_text}</li>
            </ol>
          </nav>
          <Products products={products} />
        </div>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {

  let condition = {"domain":{"name": DOMAIN}, "product_identify_cat": menu.pallet.product_identify_cat}
  const products = (await getProductsByCondition(condition)) || []

  return {
    props: { products },
  }
}

export default Home

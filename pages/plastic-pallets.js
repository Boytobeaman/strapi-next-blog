import React from 'react'
import Products from '../components/products'
import Layout from '../components/layout'
import SEO from '../components/SEO/SEO'
import Link from 'next/link'
import {DOMAIN, menu } from '~/utils/common'
import { getProducts, getCategories, getProductsByCondition } from '../lib/api'

let product_identify_cat = menu.pallet.product_identify_cat

const Home = ({ products }) => {

  // for facebook url
  let cat_link = products[0].seo_category_slug
  cat_link= `/${cat_link}/`
  // need to change
  let cat_text = menu.pallet.text
  let the_image = ``;
  let nestable_plastic_pallet_slug= `nestable-plastic-pallets-series`

  let nestable_plastic_pallet = {
    id: "nestable_plastic_pallet",
    slug: nestable_plastic_pallet_slug,
    short_title: "nestable plastic pallets",
    seo_category_slug: cat_link,
    commonproduct:{
      product_model: "nestable plastic pallets series"
    },
    local_img: [
      {
        path: `imgs/pallet-wholesale.com/img/plastic-pallets/${nestable_plastic_pallet_slug}/nestable-plastic-pallets-1.jpeg`
      }
      
    ]

  }
  if(!products.find(i => i.id === nestable_plastic_pallet.id)){
    products.push(nestable_plastic_pallet)
  }

  

  return (
    <Layout>
      <section className="section product-cate-page">
        <SEO 
          thisTitleTemplate={`%s | ${cat_text} for sale`}
          title={`${cat_text}, cheap ${cat_text} supplier, Ideal for transportation`}
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
          <div className="bg-white p-3">
            <h2 className="h5">Heavy Duty Plastic Pallet Features & Benefits</h2>
            <ul>
              <li>Easy cleaning and visual inspection</li>
              <li>Hygiene</li>
              <li>Convenience of 4-way entry</li>
              <li>Hot-stamp or molded-in logo</li>
              <li>Suitability for bar code and RFID tracking</li>
              <li>Interrupted perimeter lip option</li>
            </ul>
          </div>
          <Products 
            product_identify_cat={product_identify_cat} 
            products={products}
            type="vertical"
          />
        </div>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {

  let condition = {"domain":{"name": DOMAIN}, "product_identify_cat": product_identify_cat}
  const products = (await getProductsByCondition(condition)) || []

  return {
    props: { products },
  }
}

export default Home

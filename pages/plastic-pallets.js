import React from 'react'
import Products from '../components/products'
import Layout from '../components/layout'
import SEO from '../components/SEO/SEO'
import Link from 'next/link'
import Image from 'next/image'
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
                  Home
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

          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-3xl font-bold text-center mb-10">Plastic Pallet Applications</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-gray-700">
                <div className="bg-gray-100 p-6 rounded-lg shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">Warehousing</div>
                <div className="bg-gray-100 p-6 rounded-lg shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">Logistics &amp; Transport</div>
                <div className="bg-gray-100 p-6 rounded-lg shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">Export Shipping</div>
                <div className="bg-gray-100 p-6 rounded-lg shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">Food &amp; Pharma</div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mt-12">
                <div className="prose prose-sm max-w-none">
                  <h3 className="text-2xl font-bold mb-6 text-gray-800">Plastic Pallet Usage and Handling Guidelines</h3>
                  <p className="text-gray-700 mb-4">Plastic pallets must be protected from direct sunlight to prevent premature aging and reduced service life.</p>
                  
                  <p className="text-gray-700 mb-4">Dropping or throwing heavy objects onto plastic pallets from a height is strictly prohibited. Goods must be placed evenly on the pallet and should not be concentrated in one area or loaded eccentrically. When carrying heavy loads, ensure the pallet is placed on a flat surface to prevent deformation caused by uneven support.</p>
                  
                  <p className="text-gray-700 mb-4">Throwing or dropping plastic pallets from elevated positions is strictly forbidden, as strong impacts may cause cracking or structural damage.</p>
                  
                  <p className="text-gray-700 mb-4">When using manual or hydraulic forklifts, ensure correct operation in accordance with the pallet structure. Forklift forks must be fully inserted into the pallet openings and evenly loaded to extend pallet service life. Avoid striking the sides of the pallet with the forklift, as this may result in breakage or cracking.</p>
                  
                  <p className="text-gray-700">When pallets are used on shelving systems, only rackable pallets designed for shelving may be used. Load capacity depends on the shelf structure, and overloading is strictly prohibited.</p>
                </div>
                
                <div className="bg-blue-50 rounded-lg shadow-md">
                  <Image 
                    src="/imgs/pallet-wholesale.com/img/plastic-pallets/plastic-pallet-application.jpg" 
                    alt="Plastic Pallet Handling" 
                    width={400}
                    height={300}
                    layout="responsive"
                  />
                </div>
              </div>
              

            </div>
          </section>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {

  let condition = {"domain":{"name": DOMAIN}, "product_identify_cat": product_identify_cat}
  const products = (await getProductsByCondition(condition)) || []

  return {
    props: { products },
  }
}

export default Home

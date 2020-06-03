import React from 'react'
import Products from '../components/products'
import Layout from '../components/layout'
import SEO from '../components/SEO/SEO'
import Link from 'next/link'
import {DOMAIN, menu } from '../utils'


const AboutUs = ({ products }) => {

  // for facebook url
  let cat_link = menu.about.url
  let cat_text = menu.about.text
  

  return (
    <Layout>
      <section className="section">
        <SEO 
          title={`About us, plastic products supplier`}
          description = {`Wholesale description`}
          pathname = {`${cat_link}`}
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
        </div>
      </section>
      
    </Layout>
  )
}


export default AboutUs

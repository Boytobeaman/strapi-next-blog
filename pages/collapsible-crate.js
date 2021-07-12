import React from 'react'
import Products from '../components/products'
import Layout from '../components/layout'
import SEO from '../components/SEO/SEO'
import Link from 'next/link'
import Image from 'next/image'
import {DOMAIN, menu } from '~/utils/common'
import { platform_root } from '~/config/globalVariable'
import { getWebsiteProductsByCategory, graphqlFetchAPI } from '../lib/api'

import styled from 'styled-components';

const SectionWrapper = styled.div`
  .banner-section.first{
    position: relative;
    .img-wrapper{
      text-align: right;
      padding-top: 60px;
      background-color: rgba(0,0,0,0.5);
    }
    .text-wrapper{
      color: #fff;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      padding: 20px;
      background-color: rgba(0,0,0,0.6);
      max-width: 650px;
      >h2{
        font-size: 1.75rem;
      }
    }
    @media (max-width: 575.98px) {
      .text-wrapper{
        color: #fff;
        padding: 20px;
        background-color: rgba(0,0,0,0.5);
        position: unset;
        top: unset;
        transform: inherit;
        >h2{
          font-size: 1rem;
        }
      }
    }
  }

`;

let product_identify_cat = menu.foldingCrate.product_identify_cat

const Home = ({ products, catConfig }) => {

  // for facebook url
  let cat_link = products[0].seo_category_slug
  cat_link= `/${cat_link}/`
  // need to change
  let cat_text = menu.foldingCrate.text
  let the_image = ``;
  

  return (
    <Layout>
      <SectionWrapper>
        <section className="section product-cate-page">
          <SEO 
            thisTitleTemplate={`%s | ${cat_text} for sale`}
            title={`${cat_text}, cheap ${cat_text} supplier, Ideal for transportation`}
            description = {`Wholesale ${cat_text}, cheap ${cat_text} for sale, Heavy Duty Plastic Foldable Box supplier`}
            pathname = {`${cat_link}`}
            image = {the_image ? the_image : ''}
            position = '3'
            ratingValue = '4.69'
            reviewCount = '208'
            price = '12.19'
            lowPrice = '10.69'
            highPrice = '15.39'
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
            <div className="banner-section first">
              <div className="img-wrapper">
                <Image
                  src={`/imgs/folding-crates-series.png`}
                  alt={`folding crates`}
                  width={1100}
                  height={430}
                  sizes={`(max-width: 575.98px) 480px,(max-width: 767.98px) 800px,1100px`}
                />
              </div>
              <div className="text-wrapper">
                <h2 className="h6">Heavy Duty Plastic Collapsible Crate</h2>
                <ul>
                  <li>Easy cleaning and visual inspection</li>
                  <li>Environmentally friendly as it is reuseable</li>
                  <li>Ventilation design, air holes are evenly distributed</li>
                  <li>Suitable for daily tasks and storage, both indoors and out</li>
                  <li>Great for moving, as a makeshift laundry basket, a toy organizer for the kids</li>
                </ul>
                <p className="d-none d-lg-block">
                  The vented collapsible crate is terrific for dormitories, kitchens, and garages. These folding crates are the perfect storage when you need them, and fold up to store when you do not.
                </p>
                <p>
                  We are a professional foldable crate manufauturer, MOQ is 200 pieces, competitive price for foldable plastic crates, do not hesitate to send us a inquiry!
                </p>
              </div>
              
            </div>
            <Products
              product_identify_cat={product_identify_cat} 
              products={products}
              catConfig={catConfig}
              type="vertical"
            />
          </div>
        </section>
      </SectionWrapper>
      
    </Layout>
  )
}

export async function getStaticProps() {

  const productsRes = await getWebsiteProductsByCategory(menu.foldingCrate.web_pro_cat_id)
  let products =[];
  if(productsRes && productsRes.data.length > 0){
    products = productsRes.data
  }

  let catConfigRes = await graphqlFetchAPI(
    `query websiteProductCategory($id: ID!) {
        websiteProductCategory(id: $id){
          show_attributes_config
        }
      }
    `,
    { variables: { id: menu.foldingCrate.web_pro_cat_id } },
    `${platform_root}/graphql`
  )
  let catConfig = {}
  if(catConfigRes && catConfigRes.websiteProductCategory){
    catConfig = catConfigRes.websiteProductCategory
  }

  console.log(`catConfig = ${catConfig.data}`)

  return {
    props: { 
      products,
      catConfig
    },
  }
}

export default Home

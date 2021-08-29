import React from 'react'
import Products from '../components/products'
import Layout from '../components/layout'
import SEO from '../components/SEO/SEO'
import Link from 'next/link'
import Image from 'next/image'
import {DOMAIN, DOMAIN_ID, menu, productTagsRoute } from '~/utils/common'
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
      top: 85%;
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

let product_identify_cat = menu.foldingBin.product_identify_cat

const Home = ({ products, catConfig, website_product_tags }) => {

  // for facebook url
  let cat_link = products[0].seo_category_slug
  cat_link= `/${cat_link}/`
  // need to change
  let cat_text = menu.foldingBin.text
  let the_image = ``;
  

  return (
    <Layout>
      <SectionWrapper>
        <section className="section product-cate-page">
          <SEO 
            thisTitleTemplate={`%s | ${cat_text} for sale`}
            title={`${cat_text}, cheap ${cat_text} supplier, collapsible plastic storage bins`}
            description = {`Wholesale ${cat_text}, cheap ${cat_text} for sale, Heavy Duty collapsible plastic storage bins supplier`}
            pathname = {`${cat_link}`}
            image = {the_image ? the_image : ''}
            position = '4'
            ratingValue = '4.69'
            reviewCount = '208'
            price = '9.89'
            lowPrice = '6.69'
            highPrice = '11.39'
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
                  alt={`folding bins`}
                  width={1100}
                  height={430}
                  sizes={`(max-width: 575.98px) 480px,(max-width: 767.98px) 800px,1100px`}
                />
              </div>
              <div className="text-wrapper">
                <h2 className="h6">Collapsible plastic bins</h2>
              </div>
              
            </div>


            <Products
              product_identify_cat={product_identify_cat} 
              products={products}
              catConfig={catConfig}
              website_product_tags={website_product_tags}
              type="vertical"
            />


          </div>
        </section>
      </SectionWrapper>
      
    </Layout>
  )
}

export async function getStaticProps() {

  const productsRes = await getWebsiteProductsByCategory(menu.foldingBin.web_pro_cat_id)
  let products =[];
  if(productsRes && productsRes.data.length > 0){
    products = productsRes.data
  }

  let catConfigRes = await graphqlFetchAPI(
    `query websiteProductCategory($id: ID!, $DOMAIN_ID: ID!) {
        websiteProductCategory(id: $id){
          show_attributes_config
          before_loop_content_html
          after_loop_content_html
        }
        
        website(id: $DOMAIN_ID){
          website_product_tags{
            name
            id
            slug
            website_products{
              id
            }
          }
        }
      }
    `,
    { variables: { 
      id: menu.foldingBin.web_pro_cat_id,
      DOMAIN_ID
    } },
    `${platform_root}/graphql`
  )
  let catConfig = {}
  if(catConfigRes && catConfigRes.websiteProductCategory){
    catConfig = catConfigRes.websiteProductCategory
  }

  let website_product_tags = []
  if(catConfigRes?.website?.website_product_tags){
    website_product_tags = catConfigRes.website.website_product_tags.filter(i => i.website_products.length > 0)
    website_product_tags.forEach(i => {
      i.href = `/${productTagsRoute}/${i.slug}/`
    })
  }


  return {
    props: { 
      products,
      catConfig,
      website_product_tags
    },
    revalidate: 3600,
  }
}

export default Home

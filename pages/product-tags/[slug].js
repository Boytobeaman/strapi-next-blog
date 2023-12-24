import React from 'react'
import Products from '../../components/products'
import Layout from '../../components/layout'
import SEO from '../../components/SEO/SEO';
import Link from 'next/link'
import {DOMAIN, menu,DOMAIN_ID, productTagsRoute} from '~/utils/common'
import { platform_root } from '~/config/globalVariable'
import {compact, uniq, kebabCase,startCase } from 'lodash';
import { getProducts, getCategories, getProductsByCondition, graphqlFetchAPI } from '~/lib/api'


let _ = {
  compact,
  uniq,
  kebabCase,
  startCase
}

const Home = ({ products, productTag, slug, website_product_tags }) => {

  // for facebook url
  let cat_link = slug
  cat_link= `/${productTagsRoute}/${cat_link}/`
  // need to change
  let cat_text = productTag.name
  let the_image = ``;

  return (
    <Layout>
      <section className="section product-cate-page">
        <SEO 
          thisTitleTemplate={`%s | ${cat_text} for sale`}
          title={`${cat_text}, cheap ${cat_text}, ${cat_text} wholesale`}
          description = {`Wholesale ${cat_text}, cheap ${cat_text} for sale, ${cat_text} supplier, high quality ${cat_text}`}
          pathname = {`${cat_link}`}
          image = {the_image ? the_image : ''}
          // position = '4'
          // ratingValue = '4.9'
          // reviewCount = '258'
          // price = '96.99'
          // lowPrice = '80.99'
          // highPrice = '120.39'
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
          <Products 
            // product_identify_cat={product_identify_cat} 
            products={products}
            website_product_tags={website_product_tags}
            type="vertical"
          />
        </div>
      </section>
    </Layout>
  )
}




export async function getStaticPaths() {

  let tagRes = await graphqlFetchAPI(
    `query content($where: JSON!) {
        websiteProductTags(where: $where){
          id
          name
          slug
        }
      }
    `,
    { variables: { 
      where:{
        // id: menu.foldingCrate.web_pro_cat_id,
        website: DOMAIN_ID
      }

    } },
    `${platform_root}/graphql`
  )



  let productTags = [];
  if(tagRes?.websiteProductTags){
    productTags = tagRes?.websiteProductTags
  }

console.log(productTags)
  
  return {
    paths: productTags.map(productTag => {

      return {
        params: {
          slug: productTag.slug
        }
      }
    }),
    fallback: false
  }
}



export async function getStaticProps({params}) {

  let slug = params.slug
  let tagRes = await graphqlFetchAPI(
    `query content($where: JSON!, $whereAll: JSON!) {
        allWebsiteProductTags:websiteProductTags(where: $whereAll){
          name
          id
          slug
          website_products{
            id
          }
        }
        websiteProductTags(where: $where){
          id
          name
          slug
          website_products{
            id
            slug
            description
            title
            twitter_title
            twitter_description
            twitter_image
            facebook_title
            facebook_description
            facebook_image
            seo_description
            seo_category_slug
            links
            backlinks
            website_product_category{
              show_attributes_config
              slug
            }
            product{
              id
              product_model
              images{
                url
                formats
              }
              all_attributes
              videos{
                name
                url
              }
            }
          }
        }
      }
    `,
    { variables: { 
      where:{
        slug,
        website: DOMAIN_ID
      },
      whereAll:{
        website: DOMAIN_ID
      }
    } },
    `${platform_root}/graphql`
  )

  let thisTagProducts = []

  console.log(JSON.stringify(tagRes))
  if(tagRes?.websiteProductTags[0]?.website_products){
    thisTagProducts = tagRes?.websiteProductTags[0]?.website_products
  }
  let productTag = tagRes.websiteProductTags[0]


  let website_product_tags = []
  if(tagRes?.allWebsiteProductTags){
    website_product_tags = tagRes.allWebsiteProductTags.filter(i => i.website_products.length > 0)
    website_product_tags.forEach(i => {
      i.href = `/${productTagsRoute}/${i.slug}/`
    })
  }

  return {
    props: { 
      products: thisTagProducts, 
      slug, 
      productTag,
      website_product_tags
    },
    revalidate: 3600,
  }
}

export default Home

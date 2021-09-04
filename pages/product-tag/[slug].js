import React from 'react'
import Products from '../../components/products'
import Layout from '../../components/layout'
import SEO from '../../components/SEO/SEO';
import Link from 'next/link'
import {DOMAIN, menu, productTagRoute} from '~/utils/common'
import {compact, uniq, kebabCase,startCase } from 'lodash';
import { getProducts, getCategories, getProductsByCondition } from '../../lib/api'


let _ = {
  compact,
  uniq,
  kebabCase,
  startCase
}

const Home = ({ products,productTag, slug }) => {

  // for facebook url
  let cat_link = slug
  cat_link= `/${productTagRoute}/${cat_link}/`
  // need to change
  let cat_text = productTag
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
          // position = '3'
          // ratingValue = '4.7'
          // reviewCount = '218'
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
          />
        </div>
      </section>
    </Layout>
  )
}




export async function getStaticPaths() {
  let productTags = [];
  let condition = {"domain":{"name": DOMAIN}}
  const allProducts = (await getProductsByCondition(condition)) || []

  allProducts.forEach(product => {
    if(product.tags){
      productTags = productTags.concat(product.tags.trim().split(","))
    }

  })

  // Eliminate duplicate tags and false value
  productTags = _.compact(_.uniq(productTags))

  //get rid of space in began or end of each tag
  productTags.forEach((item, i) => {
    productTags[i] = item.trim()
  })

  
  return {
    paths: productTags.map(productTag => {

      return {
        params: {
          slug: `${_.kebabCase(productTag)}`
        },
      }
    }),
    fallback: false,
  }
}



export async function getStaticProps({params}) {


  let slug = params.slug
  let productTag = _.startCase(slug).toLowerCase();

  let tag_regex = new RegExp(`\\b${productTag}\\b`, "gi");

  console.log(`products tag_regex  ====${tag_regex}`)
  let condition = {"domain":{"name": DOMAIN}}

  const allProducts = (await getProductsByCondition(condition)) || []

  let thisTagProducts = []
  allProducts.forEach(product => {
    if(product.tags && tag_regex.test(product.tags)){
      thisTagProducts.push(product)
    }

  })


  return {
    props: { products: thisTagProducts, slug, productTag},
  }
}

export default Home

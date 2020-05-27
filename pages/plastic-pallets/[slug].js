import SingleProduct from '../../components/singleProduct'
import { getCategory, getCategories, getProduct, getProductsByCondition } from '../../lib/api'
import Layout from '../../components/layout'
import {DOMAIN, menu } from '../../utils'
import Link from 'next/link'

const Product = ({ product, categories }) => {
  return (
    <Layout categories={categories}>
      <div className="">
        <SingleProduct product={product} />
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  let condition = {"domain":{"name": DOMAIN}, "product_identify_cat": menu.pallet.product_identify_cat}
  const products = (await getProductsByCondition(condition)) || []
  // console.log(`JSON.stringify(products) ==== ${JSON.stringify(products)}`)
  return {
    paths: products.map(product => ({
      params: {
        slug: product.slug
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  console.log(`product  ====== ${JSON.stringify(params)}`)
  let condition = {"domain":{"name": DOMAIN}, "product_identify_cat": menu.pallet.product_identify_cat, "slug": params.slug}
  const product = (await getProductsByCondition(condition))[0] || {}
  
  console.log(`product ====== ${JSON.stringify(product)}`)
  return {
    props: { product, categories:[] },
  }
}

export default Product

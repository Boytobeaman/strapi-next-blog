import PlatformSingleProduct from '~/components/PlatformSingleProduct'
import { getCategory, getCategories, getProduct, getProductsByCondition,getWebsiteProductsByCategory, getWebsiteProduct } from '../../lib/api'
import Layout from '~/components/layout'
import {DOMAIN, menu } from '~/utils/common'
import { product_cat_mapping } from "~/config/globalVariable"

const Product = ({ product, categories }) => {
  return (
    <Layout categories={categories}>
      <div className="">
        <PlatformSingleProduct
          product_identify_cat={menu.foldingBin.product_identify_cat}
          product={product} 
        />
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {

  const productsRes = await getWebsiteProductsByCategory(menu.foldingBin.web_pro_cat_id)
  let products =[];
  if(productsRes && productsRes.data.length > 0){
    products = productsRes.data
  }

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
  
  const slug = params.slug
  let productRes = await getWebsiteProduct(menu.foldingBin.web_pro_cat_id, slug)
  let product={}
  if(productRes && productRes.data.length > 0){
    product = productRes.data[0]
  }

  return {
    props: { 
      product, 
      categories:[] 
    },
    revalidate: 3600
  }
}

export default Product

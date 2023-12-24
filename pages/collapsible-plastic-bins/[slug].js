import PlatformSingleProduct from '~/components/PlatformSingleProduct'
import { getCategory, getCategories, getProduct, getProductsByCondition,getWebsiteProductsByCategory, getWebsiteProduct, graphqlFetchAPI } from '../../lib/api'
import Layout from '~/components/layout'
import {DOMAIN, menu } from '~/utils/common'
import { product_cat_mapping, platform_root } from "~/config/globalVariable"
import { sampleSize } from "lodash"

const Product = ({ product, categories, randomRelatedProducts, catConfig }) => {
  return (
    <Layout categories={categories}>
      <div className="">
        <PlatformSingleProduct
          product_identify_cat={menu.foldingBin.product_identify_cat}
          product={product} 
          randomRelatedProducts={randomRelatedProducts}
          catConfig={catConfig}
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

export async function getStaticProps({ params}) {

  const {slug} = params;
  
  //获取分类全部产品
  const productsRes = await getWebsiteProductsByCategory(menu.foldingBin.web_pro_cat_id)
  let products =[];
  if(productsRes && productsRes.data.length > 0){
    products = productsRes.data
  }

  //获取分类配置
  let catConfigRes = await graphqlFetchAPI(
    `query websiteProductCategory($id: ID!) {
        websiteProductCategory(id: $id){
          show_attributes_config
        }
      }
    `,
    { variables: { id: menu.foldingBin.web_pro_cat_id } },
    `${platform_root}/graphql?token=${process.env.TOKEN}`
  )
  let catConfig = {}
  if(catConfigRes && catConfigRes.websiteProductCategory){
    catConfig = catConfigRes.websiteProductCategory
  }



  //获取相关产品
  let allCatProductsExcludeThis = products.filter(i => i.slug !== slug);
  let thisProductIndex = products.findIndex(i => i.slug === slug)
  let allProductLength = allCatProductsExcludeThis.length;
  let endProductIndex = thisProductIndex + 6;

  if(endProductIndex > allProductLength - 1){
    endProductIndex = allProductLength
  }
  let startProductIndex = endProductIndex - 6;
  let randomRelatedProducts = allCatProductsExcludeThis.slice(startProductIndex, endProductIndex)


  let product = products.find(i => i.slug === slug)

  return {
    props: { 
      product, 
      randomRelatedProducts,
      catConfig,
      categories:[] 
    },
    revalidate: 3600
  }
}

export default Product

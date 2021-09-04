import React from 'react'
import Card from './card'
import Link from 'next/link'
import ProductDetailTemplateCat from '../components/ProductDetailTemplateCat';
import { escape2Html } from '~/utils/common'
import  WebsiteProductTag from '~/components/websiteProductTag'
import { cloneDeep } from "lodash"

import styled from 'styled-components';
const SectionWrapper = styled.div`
  .website-product-tags{
    background-color: #fff;
    padding: 15px 10px;
    margin: 10px 15px;
    width: 100%;
  }

`;

const Products = ({ products, catConfig={}, website_product_tags=[], ...otherProps }) => {

  const { type } = otherProps

  let allProductWrapClass=''
  let sigleProductColumnClass=''
  if(type === "vertical"){
    allProductWrapClass=`row`
    sigleProductColumnClass = `col-6 col-xs-6 col-sm-4 col-md-3 col-lg-2`
  }

  //过滤掉 product 中删除的产品， website-product 中对应的就无法显示
  let cleanProducts = products.filter(product => !(!product.commonproduct && !product.product))


  return (
    <SectionWrapper>
      
      <div className="product-category">
        {catConfig.before_loop_content_html && (
          <section className="category-description before-loop-content bg-white p-3">
            <div dangerouslySetInnerHTML={{ __html: escape2Html(catConfig.before_loop_content_html) }} />
          </section>
        )}

        <div className={`all-products-wrap ${allProductWrapClass}`}>
          {cleanProducts.map((product, index) => {

            let short_title = product.short_title
            if(!product.commonproduct){
              product.commonproduct = product.product.all_attributes
            }
            if(!product.commonproduct.product_model && !product.commonproduct.model){
              product.commonproduct.product_model = product.product.product_model
            }
            product.commonproduct.short_title = short_title
            product.commonproduct.images = product.local_img ? product.local_img : product.product.images


            //针对 product tag 页面，show_attributes_config 信息是从每一个产品里面取得，源头是这个产品对应的产品分类的show_attributes_config
            //product category 页面 是直接从产品分类中获取

            let thisCatConfig = cloneDeep(catConfig);
            if(product?.website_product_category?.show_attributes_config){
              thisCatConfig.show_attributes_config = product.website_product_category.show_attributes_config
            }

            return (
              <>
                {(website_product_tags.length && index  % 12 === 0) ? (
                  <section className="website-product-tags" key={product.slug}>
                    {website_product_tags.map(website_product_tag => <WebsiteProductTag {...website_product_tag} />)}
                  </section>
                ):null}
                <div
                  className={`${sigleProductColumnClass}`}
                  key={product.slug}
                >
                  <div className="cat-desc-element-wrap single-product-wrap">
                    <Link href={`/${product.seo_category_slug}/${encodeURIComponent(product.slug)}`}>
                      <a className="cat-product-link">
                        <ProductDetailTemplateCat 
                          infodata={product.commonproduct}
                          catConfig={thisCatConfig}
                          {...otherProps}
                        />
                      </a>
                    </Link>
                  </div>
                </div>
              </>
            )
          })}
        </div>


        {catConfig.after_loop_content_html && (
          <section className="category-description after-loop-content bg-white p-3">
            <div dangerouslySetInnerHTML={{ __html: escape2Html(catConfig.after_loop_content_html) }} />
          </section>
        )}
      </div>
    </SectionWrapper>
  )
}

export default Products

import React from 'react'
import Card from './card'
import Link from 'next/link'
import ProductDetailTemplateCat from '../components/ProductDetailTemplateCat';

const Products = ({ products, ...otherProps }) => {

  const { type } = otherProps

  let allProductWrapClass=''
  let sigleProductColumnClass=''
  if(type === "vertical"){
    allProductWrapClass=`row`
    sigleProductColumnClass = `col-6 col-xs-6 col-sm-6 col-md-4 col-lg-3`
  }
  return (
    <div>
      
      <div className="uk-child-width-1-2" data-uk-grid>
        <div className={`all-products-wrap ${allProductWrapClass}`}>
          {products.map(product => {

            let short_title = product.short_title
            product.commonproduct.short_title = short_title
            product.commonproduct.images = product.local_img

            return (
              <div
                className={`${sigleProductColumnClass}`}
                key={product.slug}
              >
                <div className="cat-desc-element-wrap single-product-wrap">
                  <Link href={`/${product.seo_category_slug}/${encodeURIComponent(product.slug)}`}>
                    <a className="cat-product-link">
                      <ProductDetailTemplateCat 
                        infodata={product.commonproduct}
                        {...otherProps}
                      />
                    </a>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Products

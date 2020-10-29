import React from 'react'
import Card from './card'
import Link from 'next/link'
import ProductDetailTemplateCat from '../components/ProductDetailTemplateCat';

const Products = ({ products }) => {


  return (
    <div>
      
      <div className="uk-child-width-1-2" data-uk-grid>
        <div>
          {products.map(product => {

            let short_title = product.short_title
            product.commonproduct.short_title = short_title
            product.commonproduct.images = product.local_img

            return (
              <div
                className="cat-desc-element-wrap"
                key={product.slug}
              >
                <div className="col-xs-12">
                  <Link href={`/${product.seo_category_slug}/${encodeURIComponent(product.slug)}`}>
                    <a className="cat-product-link">
                      <ProductDetailTemplateCat 
                        infodata={product.commonproduct}
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

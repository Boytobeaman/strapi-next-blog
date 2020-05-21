import React from 'react'
import Card from './card'
import Link from 'next/link'

const Products = ({ products }) => {


  return (
    <div>
      <div className="uk-child-width-1-2" data-uk-grid>
        <div>
          {products.map(product => {
            return (
              <div key={product.id}>
                <Link href={`/${product.seo_category_slug}/[id]`} as={`/${product.seo_category_slug}/${product.id}`}>
                  <a>{product.title}</a>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Products

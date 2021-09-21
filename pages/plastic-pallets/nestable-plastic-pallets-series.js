import React, { useState } from 'react'
import PlatformSingleSeriesProduct from '../../components/PlatformSingleSeriesProduct'
import InquiryForm from '~/components/InquiryForm';
import { getCategory, getCategories, getProduct, getProductsByCondition, getProductAttributesByCategory, getProductsByCategory } from '../../lib/api'
import Layout from '../../components/layout'
import {DOMAIN, menu, mmtoinch, kgtolbs } from '~/utils/common'
import { platform_root, attributes_path, products_path } from '~/config/globalVariable'
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter  } from 'reactstrap';



const Product = (props) => {

  const { series_attributes, series_products } = props;
  const [modal, setModal] = useState(false)

  const toContactUs = (e,product_model,p_img) => {
    e.preventDefault();
    localStorage.setItem("from_url", window.location.href)
    localStorage.setItem("model", product_model)
    localStorage.setItem("p_img", p_img)
    // navigateTo(contact_url)
    setModal(true)
    return false
  }

  const toggle = () => {
    setModal(!modal)
  }

  let slug = `nestable-plastic-pallets-series`
  let short_title = `nestable plastic pallets`
  let title = `nestable plastic pallets, cheap nestable pallets wholesale`
  let description = `nestable plastic pallets, cheap nestable pallets wholesale, half size nestable plastic pallet supplier`


  let seo_category = `plastic pallets`
  let seo_category_slug = menu.pallet.url;
  if(seo_category_slug.startsWith("/")){
    seo_category_slug = seo_category_slug.slice(1)
  }
  if(seo_category_slug.endsWith("/")){
    seo_category_slug = seo_category_slug.slice(0, -1)
  }

  let path_prefix = `/imgs/pallet-wholesale.com/img/plastic-pallets/nestable-plastic-pallets-series/`
  let series_images=[
    {
      url: `${path_prefix}nestable-plastic-pallets.mp4`,
      type : "video"
    },
    {
      url: `${path_prefix}nestable-plastic-pallets-1.jpeg`,
      type : "image"
    },
    {
      url: `${path_prefix}nestable-plastic-pallets-2.jpeg`,
      type : "image"
    },
    {
      url: `${path_prefix}nestable-plastic-pallets-3.jpeg`,
      type : "image"
    },
    {
      url: `${path_prefix}nestable-plastic-pallets-4.jpeg`,
      type : "image"
    },
    {
      url: `${path_prefix}nestable-plastic-pallets-5.jpeg`,
      type : "image"
    },
    {
      url: `${path_prefix}nestable-plastic-pallets-6.jpeg`,
      type : "image"
    }
  ]


  let rightContent=(
    <div className="bg-white p-3">
      <h1 className="h4 text-capitalize mb-3">{short_title}</h1>
      <h4>HDPE/PP material (made with new material)</h4>

      <h5>How long is your delivery time?</h5>
      <p>Generally it is 3-5 days if the goods are in stock. or it is 5-7 days if the goods are not in stock, it is according to
      quantity.</p>

      <h5>Do you provide samples ? is it free or extra ?</h5>
      <p>Yes, we could offer the sample for free charge but do not pay the cost of freight.</p>

      <h5>What is your terms of payment ?</h5>
      <p>Payment less than 5000USD, 100% in advance. Payment greater than 5000USD, 30% T/T in advance ,balance against copy of B/L.
If you have another question, pls feel free to contact us</p>

      <h5>Do you provide related sourcing service?</h5>
      <p>Yes, storage & material handling products is totally different with some other products. Sometimes you can not buy just from one supplier for a full container load. We have many good related products partner resources, we can help you to combine a full container load shipment.</p>
      
      <h5>Do you provide customized service ?</h5>
      <p>Yes, we can offer you customized logo, logo printing, customized package, customized color for our exist product line. Also we'd like to do customized design, tooling making and plastic injection together, you can get a one-stop service for a customized plastic parts.</p>

    </div>
  )

  let bottomContent=(
    <div className="bg-white p-3">
      <h4>Products series list</h4>

      <Table striped bordered responsive>
        <thead>
          <tr>
            <th>Model</th>
            <th>Action</th>
            <th>Image</th>
            <th>Size L*W*H</th>
            <th>Dynamic load(T)</th>
            <th>Static load(T)</th>
            <th>Weight</th>
          </tr>
        </thead>
        <tbody>
          {series_products.map(series_product => {

            let image = ''
            if(series_product?.images[0]?.url){
              image = series_product?.images[0]?.url
            }
            if(series_product?.images[0]?.formats?.small?.url){
              image = series_product?.images[0]?.formats?.small?.url
            }
            let all_attributes = series_product.all_attributes
            let product_model = series_product.product_model

            let size_mm = `${all_attributes.product_length} x ${all_attributes.product_width} x ${all_attributes.product_height} (mm)`
            let size_inch  = `${(all_attributes.product_length * mmtoinch).toFixed(2)} x ${(all_attributes.product_width * mmtoinch).toFixed(2)} x ${(all_attributes.product_height * mmtoinch).toFixed(2)} (inch)`
            return  <tr key={series_product.id}>
                      <td>{product_model}</td>
                      <td>
                        <Button 
                          color="danger" 
                          size="sm"
                          onClick={(e)=>toContactUs(e,product_model,image)}
                        > Inquiry</Button>
                      </td>
                      <td>{image ? <img style={{maxWidth: 180}} src={image}></img> : null}</td>
                      <td>
                        {size_mm} 
                        <hr/>
                        {size_inch} 
                      </td>
                      <td>{all_attributes.dynamic_load}</td>
                      <td>{all_attributes.static_load}</td>
                      <td>{all_attributes.weight} (KG) <hr/> {(all_attributes.weight * kgtolbs).toFixed(2)} (lbs) </td>
                    </tr>
          })}
        </tbody>
      </Table>

      <p>
        The nestable plastic pallet provides fantastic protection for goods and functions well in extreme climatic conditions. It has advanced design that provides improved support for goods and is perfect for crates and bins. 
        Also, this pallet has feet that are designed specifically to prevent them from sticking to ice.
      </p>
    </div>
  )

  return (
    <Layout >
      <div className="">
        <PlatformSingleSeriesProduct
          slug={slug}
          title={title}
          twitter_title={title}
          facebook_title={title}
          short_title={short_title}
          seo_category={seo_category}
          seo_category_slug={seo_category_slug}
          series_attributes={series_attributes}
          series_images={series_images}
          description={description}
          twitter_description={description}
          facebook_description={description}
          rightContent={rightContent}
          bottomContent={bottomContent}
        />
        <Modal isOpen={modal} toggle={toggle} className={props.className} backdrop="static">
          <ModalHeader toggle={toggle}>Contact us & Inquiry <span className="text-danger"></span></ModalHeader>
          <ModalBody>
            <InquiryForm />
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" className="btn-sm" onClick={toggle}>Close</Button>
          </ModalFooter>
        </Modal>
      </div>
    </Layout>
  )
}


export async function getStaticProps() {


  let product_category_id = `6140ada1deb35774eb6388cf`
  const product_cat_attributes = await getProductAttributesByCategory(product_category_id)
  const product_cat_products = await getProductsByCategory(product_category_id)

  
  return {
    props: { 

      series_attributes: product_cat_attributes.data,
      series_products: product_cat_products.data
    },
  }
}

export default Product

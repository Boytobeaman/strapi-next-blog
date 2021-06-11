import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Articles from '../components/articles'
import Layout from '../components/layout'
import SEO from '../components/SEO/SEO'
import KeenSlider from '../components/keenSlider'
import {DOMAIN, menu} from '../utils'
import { getArticles, getProductsByCondition } from '../lib/api'

const Home = ({ articles }) => {


  let contentArray =[
    {
      link_to: menu.pallet.url,
      className: 'w-100',
      content: <Image alt={menu.pallet.text} src={`/imgs/home/main-slider-plastic-pallets.png`} width="1200" height="500" layout="responsive"></Image>
    },
    {
      link_to: menu.pallet.url,
      className: 'w-100',
      content: <Image alt={menu.palletBox.text} src={`/imgs/home/main-slider-pallet-box.jpg`} width="1200" height="500" layout="responsive"></Image>
    },
    {
      className: 'w-100',
      content: <Image alt={`moving totes`} src={`/imgs/home/main-slider-nesting-crates.jpg`} width="1200" height="500" layout="responsive"></Image>,
    }
  ]
  return (
    <Layout>
      <SEO 
        title={`plastic pallets, heavy-duty industrial plastic pallet for sale`}
        description = {`Wholesale plastic pallets, Our solutions cover all standard pallet dimensions.We offer all types of high quality plastic pallets for sale.`}
      />
      <div className="home-page">
        <section className="section">
          <div className="">
            <KeenSlider
              autoplay={true}
              contentArray={contentArray}
            />
          </div>
        </section>
        <section className="bg-dark home-cat-pic pt-4 pb-5">
          <h2 className="text-center p-4 text-white">Products Categories</h2>
          <div className="row mx-0">
            <div className="col-sm-3">
              <Link href={menu.pallet.url}>
                <a className="nav-link text-white font-weight-bold pb-0">
                  <Image 
                    alt={menu.pallet.text} 
                    src={`/imgs/plastic-pallets.jpg`} 
                    width="300" 
                    height="250"
                    layout="responsive"
                  />
                  <p className="home-page-cat-text text-center">
                    Plastic Pallets
                  </p>
                </a>
              </Link>
            </div>
            <div className="col-sm-3">
              <Link href={menu.palletBox.url}>
                <a className="nav-link text-white font-weight-bold pb-0">
                  <Image 
                    alt={menu.palletBox.text} 
                    src={`/imgs/plastic-pallet-boxes-b.jpg`} 
                    width="300" 
                    height="250"
                    layout="responsive"
                  />
                  <p className="home-page-cat-text text-center">
                    Plastic Pallet Boxes
                  </p>
                  <div className="d-none">
                    each reusable Plastic Pallet Boxes is designed to protect your product and reduce handling costs.
                    containers are available in light-duty, medium-duty and heavy-duty designs to meet any requirement.
                  </div>
                </a>
              </Link>
            </div>
            <div className="col-sm-3">
              <a className="nav-link text-white font-weight-bold pb-0" href="https://www.movingboxsale.com/folding-crates/" target="_blank">
                <Image 
                  alt={`Plastic Folding Crates`} 
                  src={`/imgs/folding-crates.jpg`} 
                  width="300" 
                  height="250"
                  layout="responsive"
                />
                <p className="home-page-cat-text text-center">
                  Folding Crates
                </p>
              </a>
            </div>
            <div className="col-sm-3">
            <a className="nav-link text-white font-weight-bold pb-0" href="https://www.movingboxsale.com/moving-bins/" target="_blank">
              <Image 
                alt={`Plastic Moving Bins`} 
                src={`/imgs/plastic-moving-crates.jpg`} 
                width="300" 
                height="250"
                layout="responsive"
              />
              <p className="home-page-cat-text text-center">
                Plastic Moving Bins
              </p>
            </a>
            </div>
            
          </div>
        </section>
        <section className="bg-light product-customization">
          <div className="row mx-0">
            <div className="col-sm-5">
              <Image 
                alt={`Plastic moving boxes customization`} 
                src={`/imgs/plastic-moving-boxes-customization-grey.png`} 
                width="500" 
                height="500"
                layout="responsive"
              />
            </div>
            <div className="col-sm-7">
              <div className="center-y-parent h-100">
                <div className="center-y-child invalid-xs p-3">
                  <h2 className="mb-4 font-weight-bold">Products Customization Service</h2>
                  <h5>Custom service according to your specific demand</h5>
                  <p>
                    We also offer shipping plastic pallets in all standard pallet sizes, designed for every product or service imaginable. 
                    offering custom pallet solutions for moving, storing or displaying products at every point along your supply chain! 
                  </p>
                  <p>
                    OEM service are designed to provide you with customized services by predicting your desires and needs.
                  </p>
                  <p>
                   Plastic pallets protect your product during picking, assembly, processing, storage and distribution in a wide variety of industries including food and beverage, primary packaging, retail distribution, automotive, pharmaceutical, and many others. 
                  </p>
                  <Link href={menu.contact.url}>
                    <a className="btn btn-danger btn-lg active" role="button" aria-pressed="true">
                      Contact Us
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="manufacturering-equipment py-5 bg-color-a text-white">
          <div className="row mx-0">
            <div className="col-sm-6">
              <div className="center-y-parent h-100">
                <div className="center-y-child invalid-xs p-3">
                  <h2 className="mb-4 font-weight-bold">Manufacturering Equipment</h2>
                  <h5>Well-equipped with 22 sets 30ton-1600ton injection molding machine</h5>
                  <p>
                    MOQ as 300pcs, flash leadtime as 7-10 days
                  </p>
                  <Image 
                    alt={`Plastic crates manufacturer equipment`} 
                    src={`/imgs/crates-manufacturer-equipment-b.png`} 
                    width="600" 
                    height="200"
                    layout="responsive"
                  />
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <Image 
                alt={`Plastic crates manufacturer equipment`} 
                src={`/imgs/crates-manufacturer-equipment-a.jpg`} 
                width="600" 
                height="470"
                layout="responsive"
              />
            </div>
          </div>
        </section>
        <section className="factory-img py-5 bg-light">
          <div className="row mx-0">
            <div className="col-sm-7">
              <div className="center-y-parent h-100">
                <div className="center-y-child invalid-xs p-3">
                  <h2>Plastic Pallets Manufacturer & Supplier</h2>
                  <ul>
                    <li>Wholesale Pricing</li>
                    <li>Quality assurance</li>
                    <li>Light, space-saving, and reliable</li>
                  </ul>
                  <div className="text-left">
                    <h6>Pallets intended for moderate reuse applications. Depending on the style of plastic pallet, some models are much lighter weight, and thus are easier to handle than wood pallets, plastic pallets that can be used for various industries and applications. </h6>
                    <p>Plastic pallets are an economic, environmental and efficient alternative to wood pallets or skids.</p>
                    <p>Consider stackable plastic pallets when your typical product loads are very heavy, and you need to stack-load products in your warehouse operations.</p>
                    <p>These plastic pallets reduce storage and transportation costs. The consistent lightweight design facilitates handling and makes these plastic pallets optimal carriers for export.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-5 pr-0">
              <Image 
                alt={`Plastic crates manufacturer`} 
                src={`/imgs/plastic-crate-manufacture-factory.jpg`} 
                width="520" 
                height="330"
                layout="responsive"
              />
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}


export default Home

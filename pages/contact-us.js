import React from 'react'
import Layout from '../components/layout'
import InquiryForm from "../components/InquiryForm";
import SEO from '../components/SEO/SEO'
import Link from 'next/link'
import {
  DOMAIN,
  menu,
  cdn_img_thumbnail,
  contact_email,
  inquiry_handle_base_url,
  inquiry_handle_app_name,
  inquiry_handle_inquiry_url,
  inquiry_handle_email_url,
  contact_phone_one,
  contact_phone_two,
} from '~/utils/common';


const ContactUs = ({ products }) => {

  // for facebook url
  let cat_link = menu.contact.url
  let cat_text = menu.contact.text
  

  return (
    <Layout>
      <section className="section">
        <SEO 
          title={`About us, plastic pallets products supplier`}
          description = {`Wholesale description`}
          pathname = {`${cat_link}`}
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
          <div className="content p-3 bg-white">
            <h2 className="h4">Contact us & Inquiry <span className="text-danger"></span></h2>
            <div className="row">
              <div className="col-md-6">
                <InquiryForm />
              </div>
              <div className="col-md-6">
                <h5>Reliable Plastic Pallet and Crates Manufacturer</h5>
                <div className="mb-1">
                  <p>Looking for durable, cost-effective plastic pallets, plastic bulk containers,plastic crates or other plastic products for your business? Our experienced team is ready to deliver timely support and tailored solutions to meet your needs.</p>
                
                </div>
                <h5>For wholesale orders</h5>
                <div className="mb-1">
                  <p>we keep consistent inventory of standard products for quick dispatch. To maximize production efficiency and shipping cost savings, kindly provide your product specifications, order quantities, and desired delivery schedule for an accurate and timely quotation.</p>
                
                </div>
                <h5>Our location:</h5>
                <div className="alert alert-secondary" role="alert">
                  <p className="mb-0">Room 1405, No.28 Moyu Road</p>
                  <p className="mb-0">Anting county,Jiading District, Shanghai, China</p>
                </div>
                

                

              </div>
            </div>

            
          </div>
          <section className='bg-white py-5'>
            <div className="container-fluid">
              <div className="">
                <h2 className="fw-bold display-6 text-center mb-5">
                  We Take Pride In Our Expertise In
                </h2>
              </div>
              <div className="row g-4">
                {/* In-House Manufacturing */}
                <div className="col-md-4 text-center">
                  <div className="shadow-sm rounded overflow-hidden mb-4">
                    <img
                      src="/imgs/contact/high-quality-plastic-pallets-manufacturing.jpg"
                      alt="In-house manufacturing of plastic pallets and plastic containers"
                      className="img-fluid"
                    />
                  </div>
                  <h3 className="h5 fw-semibold mb-3">
                    In-House Manufacturing
                  </h3>
                  <p className="text-muted">
                    We manufacture plastic pallets, plastic bins, and bulk containers
                    in-house using advanced injection molding and automated production
                    lines. This ensures consistent quality, cost efficiency, and
                    sustainable manufacturing for logistics and warehousing applications.
                  </p>
                </div>
                {/* Quality Control */}
                <div className="col-md-4 text-center">
                  <div className="shadow-sm rounded overflow-hidden mb-4">
                    <img
                      src="/imgs/contact/quality-control-of-plastic-pallets.jpg"
                      alt="Quality control inspection for plastic pallets and storage containers"
                      className="img-fluid"
                    />
                  </div>
                  <h3 className="h5 fw-semibold mb-3">
                    Quality Control
                  </h3>
                  <p className="text-muted">
                    From raw material inspection to load capacity and impact resistance
                    testing, our quality control process includes multiple checkpoints
                    to ensure every plastic pallet and storage container meets
                    international quality and safety standards.
                  </p>
                </div>
                {/* OEM / ODM */}
                  <div className="col-md-4 text-center">
                    <div className="shadow-sm rounded overflow-hidden mb-4">
                      <img
                        src="/imgs/contact/quality-control-of-plastic-pallets.jpg"
                        alt="OEM ODM plastic manufacturing services"
                        className="img-fluid"
                      />
                    </div>
                    <h3 className="h5 fw-semibold mb-3">
                      OEM / ODM
                    </h3>
                    <p className="text-muted">
                      We provide flexible OEM and ODM plastic manufacturing services,
                      offering custom sizes, colors, branding, and functional designs.
                      Our solutions help businesses launch market-ready plastic products
                      tailored to specific industry requirements.
                    </p>
                  </div>

              </div>
            </div>
          </section>
        </div>
      </section>
      
    </Layout>
  )
}


export default ContactUs

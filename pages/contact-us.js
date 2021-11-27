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
          title={`About us, plastic products supplier`}
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
                <h5>Our services:</h5>
                <div className="mb-1">
                  <ul className="list-group">
                    <li className="list-group-item">
                      Add customer logo on the crate.
                    </li>
                    <li className="list-group-item">
                      We could customize color for the crate, regular color is blue, grey.
                    </li>
                    <li className="list-group-item">
                      MOQ for bulk order: Normally 300 pcs, but could be negotiated in circumstance
                    </li>
                  </ul>
                
                </div>
                <h5>Our location:</h5>
                <div className="alert alert-secondary" role="alert">
                  <p className="mb-0">Room 1405, No.28 Moyu Road</p>
                  <p className="mb-0">Anting county,Jiading District, Shanghai, China</p>
                </div>
                
                <h5>Call us: </h5>
                <div className="alert alert-secondary" role="alert">
                  <p className="mb-0">{contact_phone_one}</p>
                  <p className="mb-0">{contact_phone_two}</p>
                </div>
                
                
                <h5>Email: </h5>
                <p>
                  <a className="btn btn-secondary" href={`mailto:${contact_email}?subject=Inquiry about your plastic crate`}>{contact_email}</a>
                </p>
              </div>
            </div>
            <div>
              <div className="col">
                If you have any concerns or queries related to our products or our work, kindly contact us via the email address provided. 
                You can also call us on our phone number, during work hours. We will come in contact with you as soon as possible
              </div>
            </div>
          </div>
        </div>
      </section>
      
    </Layout>
  )
}


export default ContactUs

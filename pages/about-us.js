import React from 'react'
import Image from 'next/image'
import Layout from '../components/layout'
import SEO from '../components/SEO/SEO'
import KeenSlider from '../components/keenSlider'
import Link from 'next/link'
import {DOMAIN, menu } from '../utils'


const AboutUs = ({ products }) => {

  // for facebook url
  let cat_link = menu.about.url
  let cat_text = menu.about.text


  let contentArray =[
    {
      className: "w-100",
      content: <Image alt={`cooperate brand`} src={`/imgs/about-us-cooperate-brand.jpg`} width="1200" height="500" />,
      link_to: '',
    },
    {
      className: "w-100",
      content: <Image alt={`our customers`} src={`/imgs/about-us-with-customers.jpg`} width="1200" height="500" />,
      link_to: ''
    },
    {
      className: "w-100",
      content: <Image alt={`plastic products certifications`} src={`/imgs/about-us-certifications.jpg`} width="1200" height="500" />,
      link_to: ''
    }
  ]
  

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
        </div>
      </section>
      <section className='mb-3'>
        <KeenSlider
          autoplay={true}
          contentArray={contentArray}
        />
      </section>
      <div className="container-fluid">
        <section className='my-5 border bg-light'>
          <div className="text-center mb-4 border-bottom h5 py-3">Why choose us</div>
          <div className="row mx-0">
            <div className="col-md-3 col-sm-6">
              <div className="why-choose-us one">
                <div className="why-header">
                  Raw material
                </div>
                <div className="why-text">
                  100% virgin PP/PE,<br />
                  Eco-firendly
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="why-choose-us two">
                <div className="why-header">
                  Quality assurance
                </div>
                <div className="why-text">
                  Every box will be inspected<br />
                  before shipment
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="why-choose-us three">
                <div className="why-header">
                  After service
                </div>
                <div className="why-text">
                  One year free replacement<br />
                  (No-human damages)
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="why-choose-us four">
                <div className="why-header">
                  Trade assurance
                </div>
                <div className="why-text">
                  Protect your orders<br />
                  from payment to delivery
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="container-fluid">
        <section className='my-5 border bg-light faq'>
          <div className="text-center mb-4 border-bottom h5 py-3">FAQ</div>
          <div className="row mx-0">
            <div className="col-sm-12">
              <div className="question-wrap">
                <div className="question">
                  Are you a factory, is custom service available?
                </div>
                <div className="answer">
                  Yes, we are a factory based in Shanghai, China and authenticated by TUV.
                </div>
              </div>
              <div className="question-wrap">
                <div className="question">
                  Can I order a sample to check quality?
                </div>
                <div className="answer">
                  Yes, sample will be free but you take the delivery cost.
                </div>
              </div>
              <div className="question-wrap">
                <div className="question">
                  What's your MOQ for bulk order?
                </div>
                <div className="answer">
                  Normally we start from 300pcs.
                </div>
              </div>
              <div className="question-wrap">
                <div className="question">
                  What's your regular colors and can I do custom color?
                </div>
                <div className="answer">
                  Regular colors are blue and grey,MOQ for custom color: 500pcs.
                </div>
              </div>
              <div className="question-wrap">
                <div className="question">
                  Do you support logo branding?
                </div>
                <div className="answer">
                  Yes, we support OEM and ODM service.
                </div>
              </div>
              <div className="question-wrap">
                <div className="question">
                  Which package methods are available?
                </div>
                <div className="answer">
                  Export wooden pallet packing, canton packing or nude packing for space saving purpose.
                </div>
              </div>
              <div className="question-wrap">
                <div className="question">
                  What's your term of payment?
                </div>
                <div className="answer">
                  We support T/T, L/C at sight and Paypal for sample.
                </div>
              </div>
              <div className="question-wrap">
                <div className="question">
                  How long does it take for production?
                </div>
                <div className="answer">
                  7~15 working days after we receive your deposit.
                </div>
              </div>
              <div className="question-wrap">
                <div className="question">
                  How can I protect my rights if we meet quality issue?
                </div>
                <div className="answer">
                  To benefit buyers, we can draw up a Alibaba trade assurance order.
                  Go to <a href="https://shjiajiu.en.alibaba.com/" target="_blank">our Alibaba store</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="container-fluid">
        <section className='my-5 border bg-light map'>
          <div className="text-center mb-0 border-bottom h5 py-3">Contact</div>
          <div className="row mx-0">
            <div className="position-relative w-100">
              <div className="bg-img"></div>
              <div className="position-absolute map-overlay">
                <div className="d-flex align-items-center justify-content-center h-100">
                  <div className="col-sm-8 text-center p-3 content">
                    <h6 className="py-3 h4">If you interested in our products and service, please don't hesitate to contact us</h6>
                    <Link href={menu.contact.url}>
                      <a className="btn btn-danger btn-lg active" role="button" aria-pressed="true">
                        Contact Us
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}


export default AboutUs

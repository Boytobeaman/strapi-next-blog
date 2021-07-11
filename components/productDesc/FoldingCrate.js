
import React from 'react'
import { cdn_url } from '~/utils/common';
// import { useStaticQuery, graphql } from 'gatsby';
// import Img from 'gatsby-image';
import Image from 'next/image'

import collapsiblApplicationA from '~/public/imgs/collapsible-plastic-vegetable-crates-application.jpg'
import collapsiblApplicationB from '~/public/imgs/collapsible-crates-application.jpg'
import collapsiblApplicationC from '~/public/imgs/foldable-crates-delivery.png'
import collapsiblApplicationD from '~/public/imgs/collapsible-crates-produce-process.jpg'

export default function Description(props) {
  // const imgs = useStaticQuery(graphql`
  //   query{
  //     p1: file(relativePath: {eq: "collapsible-plastic-crates-show.jpg"}) {
  //       childImageSharp {
  //         fluid {
  //           ...GatsbyImageSharpFluid
  //         }
  //       }
  //     }
  //     p2: file(relativePath: {eq: "collapsible-plastic-vegetable-crates-application.jpg"}) {
  //       childImageSharp {
  //         fluid {
  //           ...GatsbyImageSharpFluid
  //         }
  //       }
  //     }
  //   }
  // `)

  return (
    <div className="product-detail-description common-folding-crate p-3">
      <div className="row mb-1 no-gutters">
        <div className="col-sm-6">
          <div className="cat-desc-section h-100">
            <h1 className="cat-desc-top-title h4 my-4">Collapsible Plastic Crates</h1>
            <ul>
              <li>Collapsible & Stackable & Durable</li>
              <li>ventilated, multiple heights, returnable, efficient packing.</li>
              <li>100% New PP material.</li>
              <li>SUPER EASY TO WASH & REUSE</li>
              <li>BUILT AMAZINGLY STRONG TO LAST</li>
              <li>Foldable and stackable to maximize truck and store space.</li>
              <li>SUPPORTS ALL TYPES OF ITEMS</li>
            </ul>
            <p className="d-none d-lg-block mb-0 h6">
              These collapsible, reusable plastic crates are Efficient, Economical and Environmentally friendly,
              they can help reduce shipping and storage expenses.
            </p>
          </div>
        </div>
        <div className="col-sm-6">
          <video controls className='w-100 h-100'>
            <source src={`${cdn_url}/static/video/collapsible-crate.mp4`} type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>
        </div>
      </div>
      <div>
        <div className="section-title h4 my-4">Plastic collapsible crates application</div>
        <Image src={collapsiblApplicationB} alt="foldable boxes application" />
        <Image src={collapsiblApplicationA} alt="collapsible crates application" />
        <Image src={collapsiblApplicationD} alt="collapsible crates heavy duty" />
        <div className="section-title h4 my-4">Package & delivery</div>
        <Image src={collapsiblApplicationC} alt="collapsible crates application" />
      </div>
    </div>
  );
}
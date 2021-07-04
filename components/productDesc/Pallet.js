import React from 'react'
import { cdn_url } from '~/utils/common';
// import { useStaticQuery, graphql } from 'gatsby';
// import Img from 'gatsby-image';

export default function Description(props) {
  // const imgs = useStaticQuery(graphql`
  //   query{
  //     p1: file(relativePath: {eq: "plastic-pallet-boxes-show.jpg"}) {
  //       childImageSharp {
  //         fluid {
  //           ...GatsbyImageSharpFluid
  //         }
  //       }
  //     }
  //     p2: file(relativePath: {eq: "plastic-pallet-boxes-application.jpg"}) {
  //       childImageSharp {
  //         fluid {
  //           ...GatsbyImageSharpFluid
  //         }
  //       }
  //     }
  //   }
  // `)
  return (
    <div className="product-detail-description common-plastic-pallet-boxes">
      <div className="row mb-1 no-gutters">
        <div className="col-sm-6">
          <div className="cat-desc-section h-100">
            <h1 className="cat-desc-top-title h4 my-4">Plastic Pallets</h1>
            <ul>
              <li>Made of 100% new version of HDPE and PP</li>
              <li>4 way entry points with forklifts/2 way entry points with pallet jack</li>
              
            </ul>
            <p className="d-none d-lg-block mb-0 h6">
              Rackable plastic pallets are heavy duty due to a high load capacity they handle. <br/>
              The combination of HDPE material and robust design makes our pallets the perfect choice for any application. This is irrespective of your industry – electronics, petroleum, food, pharmaceutical, etc.
            </p>
            <p>
              Our plastic pallets are manufactured from high-density polyethylene which makes them durable, sturdy and long-lasting. 
              Due to their material, they are resistant to weather, corrosion, chemicals, and most other environmental damage. 
              The added advantage is that when they are not in use, they can be stored away very easily because of their reversible and stackable pallet design. 
              We have a variety of available plastic pallets for sale. We can also manufacture custom plastic pallet sizes based on customer's needs on-demand
            </p>
            <p className="mt-1">
              These <strong>Plastic Pallets</strong> are stackable for efficient storage. Made of high-density virgin polyethylene for long life. Plastic Pallets are maintenance free and safer to handle than wooden pallets. <br/>
              Plastic Skids Pallets are ideal for export, pharmaceutical, medical, and food applications.
            </p>
          </div>
        </div>
        <div className="col-sm-6">
          <video controls className='w-100 h-100'>
            <source src={`/video/plastic-pallets.mp4`} type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>
        </div>
      </div>
      
    </div>
  );
}
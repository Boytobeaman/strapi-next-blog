
import React from 'react'
import { cdn_url } from '../../utils';
// import { useStaticQuery, graphql } from 'gatsby';
// import Img from 'gatsby-image';

export default function Description(props) {
  // const imgs = useStaticQuery(graphql`
  //   query{
  //     p1: file(relativePath: {eq: "moving-bin-application.jpg"}) {
  //       childImageSharp {
  //         fluid {
  //           ...GatsbyImageSharpFluid
  //         }
  //       }
  //     }
  //     p2: file(relativePath: {eq: "moving-bin-show.jpg"}) {
  //       childImageSharp {
  //         fluid {
  //           ...GatsbyImageSharpFluid
  //         }
  //       }
  //     }
  //   }
  // `)
  return (
    <div className="product-detail-description common-moving-bins p-3">
      <div className="row">
        <div className="col-sm-6">
          <h4 className="description-title">
          FEATURE: 
          </h4>
          <ul>
            <li>Ergonomically designed handgrips for comfortable handling.</li>
            <li>Nested freely when empty and stacked steadily when full and close.</li>
            <li>Textured and flat base against slipping to increase the friction for strong stability when stacking.</li>
            <li>The customer’s logo can be applied onto the container by screen printing, hot stamping and tampo printing.</li>
            <li>Reinforced ribs on sidewalls for increasing the load capacity and reducing the possibility of sidewalls deformity.</li>
            <li>Heavily reinforced hinge to fix the lids and container for superior safety and stability.</li>
          </ul>
        </div>
        <div className="col-sm-6">
        <video width="100%" height="" controls>
          <source src={`${cdn_url}/static/moving-bin-feature.mp4`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        </div>
      </div>
      {/* <div>
        <div className="section-title h4 my-4">Plastic moving crates application</div>
        <Img
          fluid={imgs.p1.childImageSharp.fluid}
          alt='Plastic moving crates'
        />
      </div>
      <Img
        fluid={imgs.p2.childImageSharp.fluid}
        alt='plastic moving boxes'
      /> */}
    </div>
  );
}
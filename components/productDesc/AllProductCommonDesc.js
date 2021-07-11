
import React from 'react'
// import { useStaticQuery, graphql } from 'gatsby';
// import Img from 'gatsby-image';
import Image from 'next/image'
import pic1  from '~/public/imgs/plastic-crates-production-process.jpg'

export default function Description(props) {
  // const imgs = useStaticQuery(graphql`
  //   query{
  //     p1: file(relativePath: {eq: "plastic-crates-production-process.jpg"}) {
  //       childImageSharp {
  //         fluid {
  //           ...GatsbyImageSharpFluid
  //         }
  //       }
  //     }
  //   }
  // `)

  return (
    <div className="all-product-common-desc p-3">
      <h4 className="section-title my-4">Production process</h4>
      <Image src={pic1} alt="plastic crates produce process" />
    </div>
  );
}
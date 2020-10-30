import React from 'react'
import Image from 'next/image'
import Articles from '../components/articles'
import Layout from '../components/layout'
import KeenSlider from '../components/keenSlider'
import {DOMAIN, menu} from '../utils'
import { getArticles, getProductsByCondition } from '../lib/api'

const Home = ({ articles }) => {


  let contentArray =[
    {
      link_to: menu.pallet.url,
      className: 'w-100',
      content: <Image alt={menu.pallet.text} src={`/imgs/home/main-slider-plastic-pallets.png`} width="1200" height="500"></Image>
    },
    {
      link_to: menu.pallet.url,
      className: 'w-100',
      content: <Image alt={menu.palletBox.text} src={`/imgs/home/main-slider-pallet-box.jpg`} width="1200" height="500"></Image>
    },
    {
      className: 'w-100',
      content: <Image alt={`moving totes`} src={`/imgs/home/main-slider-nesting-crates.jpg`} width="1200" height="500"></Image>,
    }
  ]
  return (
    <Layout>
      <div className="home-page">
        <section className="section">
          <div className="">
            <KeenSlider
              autoplay={true}
              contentArray={contentArray}
            />
          </div>
        </section>
      </div>
    </Layout>
  )
}


export default Home

import React from 'react'
import Card from './card'
import Link from 'next/link'
import Image from 'next/image'
import { kebabCase } from 'lodash'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import SEO from '~/components/SEO/SEO';
import Products from '~/components/products'

import InquiryForm from '../components/InquiryForm';
import KeenSlider from '../components/keenSlider'
import Content, { HTMLContent } from '../components/Content'
import NestingBox from './productDesc/NestingBox'
import PalletBox from './productDesc/PalletBox'
import Pallet from './productDesc/Pallet'
import StackingCrate from './productDesc/StackingCrate'
import FoldingCrate from './productDesc/FoldingCrate'
import AllProductCommonDesc from './productDesc/AllProductCommonDesc'
import { 
  menu,
  mmtoinch, 
  kgtolbs, 
  ltogal,
  productTagsRoute
} from '~/utils/common'

import { throttle } from "lodash"

class SingleProduct extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      inquiryBtnClass: '',
    };

    this.toggle = this.toggle.bind(this);
  }

  toContactUs(e,product_model,p_img){
    e.preventDefault();
    localStorage.setItem("from_url", window.location.href)
    localStorage.setItem("model", product_model)
    localStorage.setItem("p_img", p_img)
    // navigateTo(contact_url)
    this.setState({
      modal: true
    });
    return false
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  listenScrollEvent = e => {
    if (window.scrollY > 450) {
      this.setState({inquiryBtnClass: 'scrolled'})
    } else {
      this.setState({inquiryBtnClass: ''})
    }
  }

  throttledScrollEvent = throttle(this.listenScrollEvent, 800);

  componentDidMount() {
    window.addEventListener('scroll', this.throttledScrollEvent)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.throttledScrollEvent)
  }

  render(){


    const {
      slug,
      seo_category,
      seo_category_slug,
      series_images,
      product_identify_cat,
      short_title,
      title,
      twitter_title,
      facebook_title,
      description,
      twitter_description,
      facebook_description,
      rightContent,
      bottomContent
    } = this.props



    let parentLevelLink = `/${seo_category_slug}/`
    let thisProductLink = `/${seo_category_slug}/${slug}/`

    let parentLevelLinkText = seo_category
    // const PostContent = contentComponent || Content

    // if(tags){
    //   tags = tags.split(",")
    // }

    let contentArray = series_images.map(item => {

      if(item.type === 'video'){
        return {
          content: <video width="600" height="600" controls>
                    <source src={item.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
        }
      }
      return {
        content: <Image alt={short_title} key={item.url} src={`${item.url}`} width={600} height={600}></Image>
      } 
    });

    let thumbnailContentArray = series_images.map(item => {


      if(item.type === 'video'){
        return  <div className="thumbnail-video-wrap">
                  <video width="100" height="100" >
                    <source src={item.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="play"></div>
                </div>
        
        
      }

      return <Image alt={short_title} key={item.url} src={`${item?.formats?.thumbnail?.url ? item?.formats?.thumbnail?.url : item.url}`} width={100} height={100}></Image>
    });


    console.log(`product_identify_cat=== ${product_identify_cat}`)

    let onlyImages = series_images.filter(item => item.type === "image")

    // return <div>hello world</div>

    return (
      <section className="section container-fluid product-detail-single">
        <SEO 
          title={title}
          short_title={short_title}
          twitter_title = {twitter_title}
          facebook_title = {facebook_title}
          description = {description}
          twitter_description = {twitter_description}
          facebook_description = {facebook_description}
          pathname = {thisProductLink}
          image = {onlyImages[0] ? onlyImages[0].url : ''}

        />
        <div className="product-detail-single-layout-wrap">
          <div className="product-detail-single-content-wrap">
          <div className="product-detail-single-content">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb bg-white my-2">
                  <li key={1} className="breadcrumb-item">
                    <Link href="/">
                      <a>
                        Home
                      </a>
                    </Link>
                  </li>
                  <li key={2} className="breadcrumb-item">
                    <Link href={parentLevelLink}>
                      <a>
                        {parentLevelLinkText}
                      </a>
                    </Link>
                  </li>
                  <li key={3} className="breadcrumb-item active" aria-current="page">{short_title}</li>
                </ol>
              </nav>
              <div className="row" itemScope itemType="http://schema.org/Product">
                {onlyImages.map((item,index)=>(
                  <link itemProp="image" key={index} href={item.url} />
                ))}
                <div className="col-sm-6">
                  <KeenSlider
                    autoplay={true}
                    contentArray={contentArray}
                    thumbnailContentArray={thumbnailContentArray}
                  />
                 
                </div>
                <div className="col-sm-6">
                  {rightContent}
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-sm-12">
                  {bottomContent}
                </div>
              </div>
              
              
            </div>
          </div>
        </div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} backdrop="static">
          <ModalHeader toggle={this.toggle}>Contact us & Inquiry <span className="text-danger"></span></ModalHeader>
          <ModalBody>
            <InquiryForm />
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" className="btn-sm" onClick={this.toggle}>Close</Button>
          </ModalFooter>
        </Modal>
      </section>
    )
  }
  
}

export default SingleProduct

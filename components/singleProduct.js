import React from 'react'
import Card from './card'
import Link from 'next/link'
import Image from 'next/image'
import { kebabCase } from 'lodash'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import SEO from '../components/SEO/SEO';

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
  productTagRoute
} from '~/utils/common'

class SingleProduct extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      inquiryBtnClass: '',
    };

    this.toggle = this.toggle.bind(this);
  }

  toContactUs(e,model,p_img){
    e.preventDefault();
    localStorage.setItem("from_url", window.location.href)
    localStorage.setItem("model", model)
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

  componentDidMount() {
    window.addEventListener('scroll', this.listenScrollEvent)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.listenScrollEvent)
  }

  render(){
    let {
      slug,
      content,
      contentComponent,
      description,
      twitter_description,
      facebook_description,
      backlinks,
      tags,
      title,
      facebook_title,
      twitter_title,
      short_title,
      product_identify_cat,
      local_img,
      static_load,
      dynamic_load,
      seo_category,
      seo_category_slug
    } = this.props.product;

    const {
      model,
      external_long,
      external_width,
      external_height,
      internal_long,
      internal_width,
      internal_height,
      folded_height,
      volumn,
      weight,
    } = this.props.product.commonproduct;


    let parentLevelLink = `/${seo_category_slug}/`
    let thisProductLink = `/${seo_category_slug}/${slug}/`
    let parentLevelLinkText = seo_category
    const PostContent = contentComponent || Content

    if(tags){
      tags = tags.split(",")
    }
    let images = local_img.map(item => {

      return {
        original: `/${item.path}`,
        // thumbnail: require(`../public/${item.path}?resize&size=200`).src,
        // srcSet: require(`../public/${item.path}?resize&sizes[]=300&sizes[]=600&sizes[]=1000`).srcSet,
        originalAlt: short_title,
        thumbnailAlt: seo_category
      }
    });
    let contentArray = local_img.map(item => {

      return {
        content: <Image alt={short_title} src={`/${item.path}`} width="600" height="600"></Image>
      } 
    });

    let thumbnailContentArray = local_img.map(item => {

      return <Image alt={short_title} src={`/${item.path}`} width="100" height="100"></Image>
    });



    return (
      <section className="section container-fluid product-detail-single">
        <SEO 
          title={title}
          twitter_title = {twitter_title}
          facebook_title = {facebook_title}
          description = {description}
          twitter_description = {twitter_description}
          facebook_description = {facebook_description}
          pathname = {thisProductLink}
          image = {images ? images[0].original : ''}

        />
        <div className="product-detail-single-layout-wrap">
          <div className="product-detail-single-content-wrap">
          <div className="product-detail-single-content">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb bg-white my-2">
                  <li className="breadcrumb-item">
                    <Link href="/">
                      <a>
                        Home
                      </a>
                    </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link href={parentLevelLink}>
                      <a>
                        {parentLevelLinkText}
                      </a>
                    </Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">{short_title}</li>
                </ol>
              </nav>
              <div className="row" itemScope itemType="http://schema.org/Product">
                {images.map((item,index)=>(
                  <link itemProp="image" key={index} href={item.original} />
                ))}
                <div className="col-sm-6">
                  <KeenSlider
                    autoplay={true}
                    contentArray={contentArray}
                    thumbnailContentArray={thumbnailContentArray}
                  />
                  <div className="col-sm-6" itemProp="offers" itemScope itemType="http://schema.org/AggregateOffer">
                    <meta itemProp="availability" itemType="http://schema.org/ItemAvailability" content="http://schema.org/InStock"/>
                    {static_load?(
                      <React.Fragment>
                        <meta itemProp="lowPrice" content="89.69" /> 
                        <meta itemProp="highPrice" content="120.79" /> 
                      </React.Fragment>
                    ):(
                      <React.Fragment>
                        <meta itemProp="lowPrice" content="5.69" /> 
                        <meta itemProp="highPrice" content="17.89" /> 
                      </React.Fragment>
                    )}
                    <meta itemProp="priceCurrency" content="USD" />  
                    <meta itemProp="priceValidUntil" content="2027-11-05" />  
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="product-spec-table-wrap bg-white p-3">
                    <h1 className="title text-capitalize single-product-title h4" itemProp="name">
                        {short_title}
                    </h1>
                    <table className="table table-hover table-bordered single-product-attr">
                      <caption>
                          <button className={`btn btn-lg btn-danger btn-block product-inquiry ${this.state.inquiryBtnClass}`} onClick={(e)=>this.toContactUs(e,model,images[0].original)}>Request a Free Quote</button>
                      </caption>
                      <tbody>
                          <tr>
                            <td>
                              <h6>Product Model</h6>
                            </td>
                            <td className="product-model">
                              <span className="mm pull-left value" itemProp="productID">{model}</span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <h6>External Dimensions</h6>
                              <span>(L * W * H)</span>
                            </td>
                            <td className="external-dimension">
                              <span className="mm pull-left value">{external_long} X {external_width} X {external_height}</span>
                              <span className="pull-right">mm</span>
                              <hr className="w-100 mt-4 mb-0" />
                              <span className="inch pull-left value">{(external_long * mmtoinch).toFixed(2)} X {(external_width * mmtoinch).toFixed(2)} X {(external_height * mmtoinch).toFixed(2)}</span>
                              <span className="pull-right">in</span>
                            </td>
                          </tr>
                          {internal_long && (
                            <tr>
                              <td>
                                <h6>Internal Dimensions</h6>
                                <span>(L * W * H)</span>
                              </td>
                              <td className="internal-dimension">
                                <span className="mm pull-left value" itemProp="Dimensions(mm)">{internal_long} X {internal_width} X {internal_height}</span>
                                <span className="pull-right">mm</span>
                                <hr className="w-100 mt-4 mb-0" />
                                <span className="inch pull-left value" itemProp="Dimensions(inch)">{(internal_long * mmtoinch).toFixed(2)} X {(internal_width * mmtoinch).toFixed(2)} X {(internal_height * mmtoinch).toFixed(2)}</span>
                                <span className="pull-right">in</span>
                              </td>
                            </tr>
                          )}
                          
                          {folded_height && (
                            <tr>
                              <td>
                                <h6>Folded Height</h6>
                              </td>
                              <td className="internal-dimension">
                                <meta itemProp="folded height" content={`${folded_height} mm`} />
                                <span className="mm pull-left value">{folded_height}</span>
                                <span className="pull-right">mm</span>
                                <hr className="w-100 mt-4 mb-0" />
                                <span className="inch pull-left value">{(folded_height * mmtoinch).toFixed(2)}</span>
                                <span className="pull-right">in</span>
                              </td>
                            </tr>
                          )}
                          {weight && (
                            <tr>
                              <td>
                                <h6>Weight</h6>
                              </td>
                              <td className="internal-dimension">
                                <meta itemProp="weight" content={`${weight} kg`} />
                                <span className="kg pull-left value">{weight}</span>
                                <span className="pull-right">kg</span>
                                <hr className="w-100 mt-4 mb-0" />
                                <span className="lbs pull-left value">{(weight * kgtolbs).toFixed(2)}</span>
                                <span className="pull-right">lbs</span>
                              </td>
                            </tr>
                          )}
                          {volumn && (
                            <tr>
                              <td>
                                <h6>Volumn</h6>
                              </td>
                              <td className="internal-dimension">
                                <meta itemProp="volumn" content={`${volumn} L`} />
                                <span className="liters pull-left value">{volumn}</span>
                                <span className="pull-right">Liters</span>
                                <hr className="w-100 mt-4 mb-0" />
                                <span className="gallon pull-left value">{(volumn * ltogal).toFixed(2) }</span>
                                <span className="pull-right">Us gallon</span>
                              </td>
                            </tr>
                          )}
                          {static_load && dynamic_load && (
                            <tr>
                              <td>
                                <h6>Load capacity</h6>
                              </td>
                              <td className="internal-dimension">
                                <meta itemProp="static load" content={`${static_load} T`} />
                                <meta itemProp="dynamic load" content={`${dynamic_load} T`} />
                                <span className="liters pull-left value">{static_load}</span>
                                <span className="pull-right">Static (T)</span>
                                <hr className="w-100 mt-4 mb-0" />
                                <span className="gallon pull-left value">{dynamic_load}</span>
                                <span className="pull-right">Dynamic (T)</span>
                              </td>
                            </tr>
                          )}
                      </tbody>
                    </table>
                    {tags && tags.length ? (
                      <div style={{ marginTop: `1rem` }}>
                        <h4>Tags</h4>
                        <ul className="taglist">
                          {tags.map(tag => (
                            <li key={tag + `tag`}>
                              <Link href={`/${productTagRoute}/${kebabCase(tag)}/`}><a>{tag}</a></Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                    <HTMLContent className="bk-links" content={backlinks} />
                    <meta itemProp="description" content={description} />
                  </div>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-sm-12">
                  <div className="bg-white p-3">
                    <PostContent className="post-description single-product" content={content} />
                    {
                      menu.foldingCrate && product_identify_cat === menu.foldingCrate.product_identify_cat &&(
                        <FoldingCrate />
                      )
                    }
                    {
                      menu.nestingBox && product_identify_cat === menu.nestingBox.product_identify_cat &&(
                        <NestingBox />
                      )
                    }
                    {
                      menu.stackingCrate && product_identify_cat === menu.stackingCrate.product_identify_cat &&(
                        <StackingCrate />
                      )
                    }
                    {
                      menu.palletBox && product_identify_cat === menu.palletBox.product_identify_cat &&(
                        <PalletBox />
                      )
                    }
                    {
                      menu.pallet && product_identify_cat === menu.pallet.product_identify_cat &&(
                        <Pallet />
                      )
                    }
                    <AllProductCommonDesc />
                  </div>
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

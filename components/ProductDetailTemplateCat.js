
import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Image from 'next/image'

import InquiryForm from '~/components/InquiryForm';
import {
  mmtoinch,
  kgtolbs,
  ltogal,
  cdn_img_thumbnail
} from '~/utils/common';

// import myImg from './a.jpg'


class ProductDetailTemplateCat extends React.Component {
  constructor(props){
    super(props);
    this.toContactUs = this.toContactUs.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      modal: false
    };

  }
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }
  
  toContactUs(e,model,p_img){
    e.preventDefault();
    localStorage.setItem("from_url", window.location.href)
    localStorage.setItem("model", model)
    localStorage.setItem("p_img", p_img)
    this.setState({
      modal: true
    });
    // navigateTo(contact_url)
    return false
  }

  render() {

    const { infodata } = this.props;
    let {
      title,
      short_title,
      model,
      product_model,
      external_long,
      external_width,
      external_height,
      internal_long,
      internal_width,
      internal_height,
      volumn,
      weight,
      images,
      category,
      post_title_slug
    } = infodata;

    let cat_image_url=''
    let srcSet=''
    let placeholderImg=''
    let the_image;
    if (images && images.length > 0 ) {
      the_image = images[0].path ? images[0].path : images[0].url
      if(the_image.indexOf("http") !== 0 && the_image.indexOf("/") !== 0){
        the_image=`/${the_image}`
      }
      
    }else{
      cat_image_url = cdn_img_thumbnail
      placeholderImg = cdn_img_thumbnail
    }

    if(!model){
      model = product_model
    }
    let { show_attributes_config } = this.props.catConfig



    if(show_attributes_config){
      show_attributes_config = JSON.parse(show_attributes_config)
      //取每个value的值
      show_attributes_config.forEach(element => {
        let value = element.value_content;
        let all_variable = value.match(/\${(.+?)}/ig);
        if(all_variable && all_variable.length){
          all_variable.forEach(v_item => {
            let this_variable = /\${(.+?)}/ig.exec(v_item)[1]
            let parsed_value = infodata[this_variable]
            element.value_content = element.value_content.replace(v_item, parsed_value)
          })
        }
        
      });
    }

    return (
      <div className="product-wrap">
        {
          this.props.type === 'vertical' ?
            (
              <div className="product-wrap">
                <div className="product-img-wrap-vertical">
                  {the_image && (

                        <Image
                          src={`${the_image}`}
                          className="vertical-img"
                          alt={short_title}
                          height={260}
                          width={260}
                        />
                    )}
                </div>
                <div className="px-2 pt-2 pb-0">
                  <h2 title={short_title} className="product-title h6 text-capitalize text-truncate mb-0">{short_title}</h2>
                </div>
                <div className="contact-model px-2">
                  <span className="badge badge-info product-model mr-3" title={model}>
                    <span className="d-none d-sm-block">Model: {model}</span>
                    <span className="d-block d-sm-none">{model}</span>
                  </span>
                  <span className="btn btn-danger float-right product-cat-inquiry btn-sm" onClick={(e)=>this.toContactUs(e,model,cat_image_url)}>Inquiry</span>
                </div>
                {show_attributes_config && (
                  <div className="woo-acf-metas p-2">
                    {show_attributes_config.map(item => (
                      <div key={item.key_content} className={`acf-item ${item.class ? item.class : ""}`}>
                        <div className="item-key">{item.key_content}</div>
                        <div className="item-value">{item.value_content}</div>
                      </div>
                    ))}
                    
                  </div>
                )}
                
              </div>
            )
          :
          (
            <div className="product-wrap">
              <div className="clearfix d-block d-sm-none">
                <h2 title={short_title} className="product-title text-capitalize text-truncate mb-0 p-2 h5 border-bottom">{short_title}</h2>
                <span className="btn btn-danger btn-sm pull-right float-right product-cat-inquiry" onClick={(e)=>this.toContactUs(e,model,cat_image_url)}>Inquiry</span>
                <span className="badge badge-info product-model mr-3">Model: {model}</span>
              </div>
              <div className="product-img-wrap">
                
                {the_image && (
                    <Image
                      src={`${the_image}`}
                      alt={short_title}
                      width={200}
                      height={200}
                    />
                )}
                
              </div>
              <div className="product-right">
                <div className="product-name">
                  <div className="col-sm-12 py-1 clearfix d-none d-sm-block">
                    <h2 title={short_title} className="product-title text-capitalize text-truncate mb-0 pl-1 d-inline-block">{short_title}</h2>
                    <span className="btn btn-danger pull-right float-right product-cat-inquiry" onClick={(e)=>this.toContactUs(e,model,cat_image_url)}>Inquiry</span>
                    <span className="badge badge-info product-model mr-3">Model: {model}</span>
                  </div>
                </div>
                <div className="product-attributes">
                  <div className="row no-gutters">
                    <div className="col-sm-7">
                      <div className="row no-gutters">
                        <div className="col-sm-6 border-right border-white external-dimension">
                          <div className="table-head bb-2-white">External Dimensions</div>
                          <div className="product-val-mm">
                            <span className="value">{external_long} X {external_width} X {external_height}</span>
                            <span className="pull-right float-right">mm</span>
                          </div>
                          <div className="product-val-inch">
                            <span className="value">{(external_long * mmtoinch).toFixed(2)} X {(external_width * mmtoinch).toFixed(2)} X {(external_height * mmtoinch).toFixed(2)}</span>
                            <span className="pull-right float-right">in</span>
                          </div>
                        </div>
                        <div className="col-sm-6 border-right border-white internal-dimension d-none d-sm-block">
                          <div className="table-head bb-2-white">Internal Dimensions</div>
                          <div className="product-val-mm">
                            <span className="value">{internal_long} X {internal_width} X {internal_height}</span>
                            <span className="pull-right float-right">mm</span>
                          </div>
                          <div className="product-val-inch">
                            <span className="value">{(internal_long * mmtoinch).toFixed(2)} X {(internal_width * mmtoinch).toFixed(2)} X {(internal_height * mmtoinch).toFixed(2)}</span>
                            <span className="pull-right float-right">in</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-5 d-none d-sm-block">
                      <div className="row no-gutters">
                        <div className="col-sm-6 border-right border-white weight">
                          <div className="table-head bb-2-white">Weight</div>
                          <div className="product-val-mm">
                            <span className="value">{weight}</span>
                            <span className="pull-right float-right">kg</span>
                          </div>
                          <div className="product-val-inch">
                            <span className="value">{(weight * kgtolbs).toFixed(2)}</span>
                            <span className="pull-right float-right">lbs</span>
                          </div>
                        </div>
                        <div className="col-sm-6 volumn">
                          <div className="table-head bb-2-white">Volume</div>
                          <div className="product-val-mm">
                            <span className="value">{volumn}</span>
                            <span className="pull-right float-right">Liters</span>
                          </div>
                          <div className="product-val-inch">
                            <span className="value">{(volumn * ltogal).toFixed(2)}</span>
                            <span className="pull-right float-right">Us gallon</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        }
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} backdrop="static">
          <ModalHeader toggle={this.toggle}>Contact us & Inquiry <span className="text-danger"></span></ModalHeader>
          <ModalBody>
            <InquiryForm />
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" className="btn-sm" onClick={this.toggle}>Close</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default ProductDetailTemplateCat
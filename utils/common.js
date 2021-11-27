export const mmtoinch = 0.03937;
export const kgtolbs = 2.20462262;
export const ltogal = 0.26417;
export const contact_url = '/contact/';
export const inquiry_handle_base_url = 'https://api.50d.top';
export const inquiry_api_success_code = 0;
export const inquiry_handle_app_name = '/DEMO_APP';
export const inquiry_handle_inquiry_url = '/inquiry/new';
export const inquiry_handle_email_url = '/email/templateEmail';
export const company_name = 'joinplastic';
export const remote_ip_url = 'https://api.db-ip.com/v2/free/self';

export const DOMAIN='pallet-wholesale.com'
export const DOMAIN_ID='6049912ccd49034b14b71f85'
export const siteUrl='https://www.pallet-wholesale.com'
export const twitterUsername='@PalletBoxSale'
export const facebookAppID=''
export const productBrand='Joinplastic'
export const contact_email = 'inquiry@joinplastic.com';
export const contact_phone_one = '(+86)021-59117621';
export const contact_phone_two = '(+86)13671889020';
export const facebook_url = 'https://www.facebook.com/movingbox.sale.1';
export const twitter_url = 'https://twitter.com/movingboxsale';
export const cdn_url = 'https://cdn.movingboxsale.com';
export const cdn_loading_img = `${cdn_url}/static/loading.gif`;
export const cdn_img_thumbnail = `${cdn_url}/static/noimage_thumbnail.png`;
export const defaultTitle = `pallet wholesale`;
export const defaultDescription = `pallet wholesale description`;



export const menu = {
  home:{
    url:'/',
    text: 'Home',
    showInUi: true
  },
  foldingCrate:{
    url: '/collapsible-crate/',
    text: 'Collapsible Crate',
    product_identify_cat: 'folding crate',
    web_pro_cat_id: "60dfbe4b2aa35750e66f8ebf",
    showInUi: true
  },
  foldingBin:{
    url: '/collapsible-plastic-bins/',
    text: 'Collapsible Plastic Bins',
    product_identify_cat: 'folding bin',
    web_pro_cat_id: "60eb130112677727cd9bc52a",
    showInUi: true
  },
  nestingBox:{
    url: '/distribution-containers/',
    text: 'Distribution Containers',
    product_identify_cat: 'nesting box',
    showInUi: false
  },
  stackingCrate:{
    url: '/euro-containers/',
    text: 'Euro Containers',
    product_identify_cat: 'stacking crate',
    showInUi: false
  },
  pallet:{
    url: '/plastic-pallets/',
    text: 'Plastic Pallets',
    product_identify_cat: 'pallet',
    showInUi: true
  },
  palletBox:{
    url: '/bulk-storage-containers/',
    text: 'Bulk Storage Containers',
    product_identify_cat: 'pallet box',
    showInUi: true
  },
  contact:{
    url: '/contact-us/',
    text: 'Contact Us',
    showInUi: true
  },
  about:{
    url: '/about-us/',
    text: 'About Us',
    showInUi: true
  }
}



export const footerConfig={
  friendlyLink:[
    // {
    //   href: "https://www.plastic-tote.com/",
    //   className: "footer-friendly-link",
    //   target:"_blank",
    //   rel: "noopener",
    //   text: "plastic totes on sale",
    // },
    // {
    //   href: "https://www.bulk-containers.com/",
    //   className: "footer-friendly-link",
    //   target:"_blank",
    //   rel: "noopener",
    //   text: "bulk plastic containers wholesale",
    // },
    // {
    //   href: "https://www.vegcrates.com/",
    //   className: "footer-friendly-link",
    //   target:"_blank",
    //   rel: "noopener",
    //   text: "plastic fruit crates wholesale",
    // },
    // {
    //   href: "https://www.joinplastic.com/product-category/bottle-crate/",
    //   className: "footer-friendly-link",
    //   target:"_blank",
    //   rel: "noopener",
    //   text: "plastic beer bottle crates",
    // },

  ],
  footerCopyright: `${(new Date()).getFullYear()} © pallet-wholesale.com ©  All Rights Reserved.`
}


export const productTagRoute = "product-tag";
export const productTagsRoute = "product-tags";




export function throttle(fn, time){
  let oldTime = 0

  
  //不能return 箭头函数，
  //箭头函数没有自己的this
  //Does not have arguments, or new.target keywords
  //箭头函数 Not suitable for call, apply and bind methods
  return function() {
    let nowTime = (new Date()).getTime();
    if(nowTime - oldTime > time){

      fn.call(this, ...arguments)
      
      oldTime = nowTime
    }
  }

}

//HTML标签转义（< -> &lt;）
export function html2Escape(sHtml) {
  return sHtml.replace(/[<>&"]/g, function(c) {
    return { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c];
  });
}

//HTML标签反转义（&lt; -> <）
export function escape2Html(str) {
  var arrEntities = { lt: '<', gt: '>', nbsp: ' ', amp: '&', quot: '"' };
  return str.replace(/&(lt|gt|nbsp|amp|quot);/gi, function(all, t) {
    return arrEntities[t];
  });
}
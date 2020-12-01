import React from 'react'
import Image from 'next/image'
import { 
  contact_email,
  facebook_url,
  twitter_url,
  footerConfig
} from '../utils'

export default class Footer extends React.Component{

  render() {
    return (
      <footer className="footer w-100 position-absolute bg-secondary py-3" style={{ bottom: '0' }}>
        <div className="footer-logo text-center my-2">
          <Image alt="moving crates stack logo" src={`/imgs/logo-stack.png`} width="100" height="80"></Image>
        </div>
        <div className="footer-social pt-2">
          <a title="facebook" href={facebook_url} target="_blank" rel="nofollow noopener" className="footer-social-link">
            <figure className="icon icon-fb"></figure>
          </a>
          <a title="twitter" href={twitter_url} target="_blank" rel="nofollow noopener" className="footer-social-link">
            <figure className="icon icon-tw"></figure>
          </a>
          <a title="email" href={`mailto:${contact_email}?subject=Inquiry about your products`} rel="nofollow noopener" className="footer-social-link">
            <figure className="icon icon-em"></figure>
          </a>
        </div>
        <div className="friendly-link">
          {footerConfig.friendlyLink && (
            <>
              {footerConfig.friendlyLink.map( item => {
                let {text, ...attr} = item;
                return <a {...attr}>{ text }</a>
              })}
            </>
          )}
        </div>
        <div className="copy-right text-center py-3 px-1">
          <span className="text-white">{footerConfig.footerCopyright ? footerConfig.footerCopyright : ""}</span>
        </div>
      </footer>
    )
  }
}

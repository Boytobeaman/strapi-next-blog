import Head from 'next/head'
import Nav from './nav'
import MainNavbar from '../components/MainNavbar'
import Footer from './Footer'

const Layout = ({ children }) => {
  let parentLevelLink = ''
  if(children && children.props && children.props.parentLevelLink){
    parentLevelLink = children.props.parentLevelLink
  }
  return (
    <div className="layout-wrap position-relative">
      <Head>
        <title>Strapi blog</title>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Staatliches"
        />
      </Head>
      <MainNavbar parentLevelLink={parentLevelLink} />
      <div className="main-body">{children}</div>
      <Footer />
    </div>
  )
}

export default Layout

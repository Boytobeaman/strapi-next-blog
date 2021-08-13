import Head from 'next/head'
import Nav from './nav'
import MainNavbar from '../components/MainNavbar'
import Footer from './Footer'

const Layout = ({ children }) => {

  return (
    <div className="layout-wrap position-relative">
      <Head>
        <title>Strapi blog</title>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Staatliches"
        />
      </Head>
      <MainNavbar />
      <div className="main-body">{children}</div>
      <Footer />
    </div>
  )
}

export default Layout

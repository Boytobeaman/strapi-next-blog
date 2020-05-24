import Head from 'next/head'
import Nav from './nav'
import MainNavbar from '../components/MainNavbar'
import Footer from './Footer'

const Layout = ({ children }) => (
  <>
    <Head>
      <title>Strapi blog</title>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Staatliches"
      />
    </Head>
    <MainNavbar />
    {children}
    <Footer />
  </>
)

export default Layout

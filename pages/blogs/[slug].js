import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { Pagination, Input, Menu, Row, Col, Card, Breadcrumb } from "antd";

import Layout from '~/components/layout'
// import qs from "qs";
import {
  pageConfig,
  getPageParamsByContext,

  dynamicSuppliersPath,
} from "~/lib/utils";
import Head from "next/head";

import slugify from "slugify";



import {DOMAIN, menu,DOMAIN_ID, productTagsRoute, blog_path} from '~/utils/common'
import { platform_root } from '~/config/globalVariable'
import { getProducts, getCategories, getProductsByCondition, graphqlFetchAPI } from '~/lib/api'


const { Search } = Input;
const { SubMenu } = Menu;
const { Meta } = Card;





const Home = ({ errors, pageData }) => {
  const router = useRouter();

  if (errors) {
    return <div>error to get data</div>;
  }


  const { datasource, search} = pageData;
  if( datasource.length === 0 ){
    return <div>error to get data</div>;
  }


  // const onPageChange = (page, pageSize) => {
  //   console.log(`${page}`, `${pageSize}`);

  //   let oldQueryObj = router.query;

  //   let queryObj = {
  //     page,
  //     limit: pageSize,
  //   };
  //   queryObj = Object.assign(oldQueryObj, queryObj);

  //   router.push({
  //     pathname: blog_path,
  //     query: queryObj,
  //   });
  // };

  const onSearch = (value) => {
    let queryObj = router.query;
    queryObj.page = pageConfig.defaultPage;
    if (value) {
      queryObj.search = value;
    } else {
      delete queryObj.search;
    }
    router.push({
      pathname: blog_path,
      query: queryObj,
    });
  };



  return (
    <Layout>
      <Head>
        <title>{datasource[0].title}</title>
        <meta name="Description" content={datasource[0].title + ' wholesale & supplier'} />
      </Head>
      <div className="container p-3">
        <div className="d-flex justify-content-center p-2">
          <Search
            placeholder="Search blogs"
            defaultValue={search}
            allowClear
            size="large"
            onSearch={onSearch}
            style={{ width: 400 }}
          />
        </div>
        
        <div
          className="p-3 bg-white m-2"
        >
          <Breadcrumb
            items={[
              {
                title: <Link href="/">Home</Link>,
              },
              {
                title: <Link href={blog_path}>Blogs</Link>,
              },
              {
                title: datasource[0].title,
              },
            ]}
          />
          <h1 className="text-capitalize my-4">{datasource[0].title}</h1>
          <div dangerouslySetInnerHTML={{ __html: datasource[0].content }} />
        </div>
       
      </div>
    </Layout>
  );
};


export async function getServerSideProps(context) {

  let slug = context.query.slug;

  try {


    let ArticleRes = await graphqlFetchAPI(
      `query content($where: JSON!) {
        websiteArticles(where: $where){
          id
          title
          seo_title
          description
          publish_datetime
          slug
          content
        }
      }
      `,
      {
        variables: { 
          where:{
            website: DOMAIN_ID,
            slug
          }
        } 
      },
      `${platform_root}/graphql?token=${process.env.TOKEN}`
    )

    console.log(ArticleRes)

    let articles = ArticleRes?.websiteArticles;


   

    let pageData = {
      datasource: articles,
    };

    return {
      props: { pageData }, // will be passed to the page component as props
    };
  } catch (errors) {
    console.log(errors);

    return {
      props: { errors: "error" }, // will be passed to the page component as props
    };
  }
}

export default Home;

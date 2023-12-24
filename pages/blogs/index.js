import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { Pagination, Input, Menu, Row, Col, Card } from "antd";
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

  const { datasource, search, pagination } = pageData;

  const { page, pageSize } = pagination;
  const total = pageData.pagination.total;

  const current = router.pathname;

  const onPageChange = (page, pageSize) => {
    console.log(`${page}`, `${pageSize}`);

    let oldQueryObj = router.query;

    let queryObj = {
      page,
      limit: pageSize,
    };
    queryObj = Object.assign(oldQueryObj, queryObj);

    router.push({
      pathname: blog_path,
      query: queryObj,
    });
  };

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
        <title>{`Blogs page of ${DOMAIN}`}</title>
        <meta name="Description" content={`latest blogs page of ${DOMAIN}, get the latest news of plastic folding crates, collapsible crates`} />
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
          {datasource.map((dataObj) => {
            return (
              <div key={dataObj.id}>
                <Link
                  href={`${blog_path}/${dataObj.slug}`}
                >
                  <h3 className="article-title text-info text-capitalize cursor-pointer h4 p-3 mb-0">{dataObj.title}</h3>
                  
                </Link>
              </div>
            );
          })}
        </div>
        <Pagination
          showTotal={(total, range) =>
            `show ${range[0]}-${range[1]} of ${total} items`
          }
          onChange={onPageChange}
          current={page}
          total={total}
          pageSize={pageSize}
        />
      </div>
    </Layout>
  );
};


export async function getServerSideProps(context) {
  if (!context?.query?.limit) {
    // es result default to 100 record
    context.query.limit = 10;
  }
  let { _page, _limit, _start, _search } = getPageParamsByContext(context);

  try {
    let pagination = {
      page: _page,
      pageSize: _limit,
    };

    let ArticleRes = await graphqlFetchAPI(
      `query content($where: JSON!, $limit: Int, $start: Int) {
        websiteArticles(where: $where, start: $start, limit: $limit, sort:"publish_datetime:DESC"){
          id
          title
          seo_title
          description
          publish_datetime
          slug
        }
        websiteArticleCount(where: $where)
      }
      `,
      {
        variables: { 
          where:{
            // id: menu.foldingCrate.web_pro_cat_id,
            website: DOMAIN_ID,
            content_contains: _search || ''
          },
          start: _start,
          limit: _limit,
        } 
      },
      `${platform_root}/graphql?token=${process.env.TOKEN}`
    )

    console.log(ArticleRes)

    let articles = ArticleRes?.websiteArticles;
    let total = ArticleRes?.websiteArticleCount;


   

    let pageData = {
      datasource: articles,
    };
    //search 不在后端返回中，因此从这里加上
    pageData.search = _search;
    pagination.total = total;
    pageData.pagination = pagination;

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

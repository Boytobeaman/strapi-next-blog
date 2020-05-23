async function fetchAPI(query, { variables } = {}) {
  const res = await fetch(`https://customer.50d.top/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }

  return json.data
}

export async function getArticles() {
  // const data = await fetchAPI(`query Articles {
  //   articles {
  //     id
  //     title
  //     category {
  //       id
  //       name
  //     }
  //     image {
  //       url
  //     }
  //   }
  // }`)
  const data={
    articles: []
  }
  return data.articles
}

export async function getArticle(id) {
  // const data = await fetchAPI(
  //   `query Articles($id: ID!) {
  //   article(id: $id) {
  //     id
  //     title
  //     content
  //     image {
  //       url
  //     }
  //     category {
  //       id
  //       name
  //     }
  //     published_at
  //   }
  // }`,
  //   { variables: { id } }
  // )
  const data={
    article: []
  }

  return data.article
}

export async function getCategories() {
  // const data = await fetchAPI(`query Categories {
  //   categories {
  //     id
  //     name
  //   }
  // }`)
  const data={
    categories: []
  }
  return data.categories
}

export async function getCategory(id) {
//   const data = await fetchAPI(
//     `query Category($id: ID!) {
//     category(id: $id) {
//       id
//       name
//       articles {
//         id
//         title
//         content
//         image {
//           url
//         }
//         category {
//           id
//           name
//         }
//       }
//     }
//   }
// `,
//     { variables: { id } }
//   )
  const data={
    category: []
  }

  return data.category
}


export async function getProductsByCondition( condition) {
  const data = await fetchAPI(`query Websiteseometas($where: JSON) {
    websiteseometas(where:$where) {
      id
      title
      slug
      tags
      seo_category
      seo_category_slug
      product_identify_cat
      description
      seo_description
      twitter_description
      twitter_image
      twitter_title
      facebook_description
      facebook_image
      facebook_title
      backlinks
      short_title
      commonproduct{
        model
        dynamic_load
        external_height
        external_long
        external_width
        internal_width
        internal_long
        internal_height
        volumn
        weight
        static_load
        static_load
        dynamic_load
      }
    }
  }`,
  { variables: { "where": condition} }
  )
  return data.websiteseometas
}

export async function getProduct(domain, slug) {
  const data = await fetchAPI(
    `query Websiteseometa($domain: String!, $slug: String!) {
    websiteseometa(domain:{name: $domain}, slug: $slug) {
      id
      title
      slug
      tags
      seo_category
      seo_category_slug
      product_identify_cat
      description
      seo_description
      twitter_description
      twitter_image
      twitter_title
      facebook_description
      facebook_image
      facebook_title
      backlinks
      short_title
      commonproduct{
        model
        dynamic_load
        external_height
        external_long
        external_width
        internal_width
        internal_long
        internal_height
        volumn
        weight
        static_load
        static_load
        dynamic_load
      }
    }
  }
`,
    { variables: { domain, slug } }
  )
  return data.websiteseometa
}

export async function getProductCategory(id) {
  const data = await fetchAPI(
    `query Category($id: ID!) {
    category(id: $id) {
      name
      articles {
        id
        title
        content
        image {
          url
        }
        category {
          id
          name
        }
      }
    }
  }
`,
    { variables: { id } }
  )
  return data.category
}
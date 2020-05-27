    
import React from 'react';
import Head from 'next/head'

export default ({
  pageUrl = null,
  type = null,
  title = null,
  description = null,
  image = null,
  appID = null,
}) => (
  <Head>
    {pageUrl && <meta property="og:url" content={pageUrl} />}
    {type && <meta property="og:type" content={type} />}
    {title && <meta property="og:title" content={title} />}
    {description && <meta property="og:description" content={description} />}
    {image && <meta property="og:image" content={image} />}
    {appID && <meta property="fb:app_id" content={appID} />}
  </Head>
);
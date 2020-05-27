import React from 'react';
import Head from 'next/head'

export default ({
  cardType = 'summary_large_image',
  username = null,
  title = null,
  description = null,
  image = null,
}) => (
  <Head>
    <meta name="twitter:card" content={cardType} />
    {username && <meta name="twitter:creator" content={username} />}
    {title && <meta name="twitter:title" content={title} />}
    {description && <meta name="twitter:description" content={description} />}
    {image && <meta name="twitter:image" content={image} />}
  </Head>
);
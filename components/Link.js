import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default ({ href, children }) => {
  const router = useRouter()

  let className = children.props.className || ''
  // actural path
  console.log(`router.pathname === ${router.pathname}`)

  // href of a link
  console.log(`href === ${href}`)
  // home page
  if (router.pathname == "/" && href === "/" ) {
    className = `${className} active`
  }

  // 设置路由到 某分类下产品时，此分类菜单高亮激活状态
  if (href != "/" && (router.pathname.indexOf(href) > -1 || `${router.pathname}/`.indexOf(href) > -1) ) {
    className = `${className} active`
  }

  return <Link href={href}>{React.cloneElement(children, { className })}</Link>
}
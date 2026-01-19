import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default ({ href, children, ...props }) => {
  const router = useRouter()

  let className = children?.props?.className || ''
  
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

  // If children is an anchor tag, extract its content and pass className
  if (children?.type === 'a') {
    return (
      <Link href={href} {...props}>
        {React.cloneElement(children, { className })}
      </Link>
    )
  }

  // Otherwise, pass children through normally
  return (
    <Link href={href} className={className} {...props}>
      {children}
    </Link>
  )
}
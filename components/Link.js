import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default ({ href, children }) => {
  const router = useRouter()

  let className = children.props.className || ''
  console.log(`router.pathname === ${router.pathname}`)
  console.log(`href === ${href}`)
  if (router.pathname === href) {
    className = `${className} active`
  }

  return <Link href={href}>{React.cloneElement(children, { className })}</Link>
}
import React from 'react'
import SectionWrapper from "./style"
import Link from 'next/link'

const Index = (props) => {
  
  const {name, href} = props;

  return(
    <SectionWrapper>
      <div className="product-tag">
        {href ? (
          <Link href={href}>
            {name}
          </Link>
        ):
        <span>{name}</span>
        }
      </div>
    </SectionWrapper>
  )
}


export default Index
import React from 'react'
import SectionWrapper from "./style"


const Index = (props) => {
  
  const {name, href} = props;

  return(
    <SectionWrapper>
      <div className="product-tag">
        {href ? (
          <a href={href} target="_blank">{name}</a>
        ):
        <span>{name}</span>
        }
      </div>
    </SectionWrapper>
  )
}


export default Index
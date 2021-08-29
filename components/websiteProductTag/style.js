import styled from 'styled-components';

const SectionWrapper = styled.div`
  display: inline-block;
  :not(:last-child){
    margin-right: 10px;
  }
  .product-tag{
    a{
      background-color: #f1f3f4;
      border-radius: 100px;
      color: #202124;
      padding: 10px 15px;
      display: inline-block;
      margin: 5px;
      &:hover{
        text-decoration: underline;
      }
    }
  }

`;

export default SectionWrapper
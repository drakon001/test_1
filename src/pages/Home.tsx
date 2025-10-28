import { Link } from 'react-router-dom'
import styled from 'styled-components';


const Container = styled.div`
  margin-top: 20px;
`;

const TopLink = styled(Link)`
  margin-right: 10px;
`

export function Home() {
  return (
    <Container>
        <TopLink to="/page2">Go to Page2</TopLink>
        <Link to="/page3">Go to Page3</Link>
    </Container>
  )
}
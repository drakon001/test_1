import { Link } from 'react-router-dom'


export function Home() {
  return (
    <>
      <div style={{ marginTop: '20px' }}>
        <Link to="/page2" style={{ marginRight: '10px' }}>
          Go to Page2
        </Link>
        <Link to="/page3">
          Go to Page3
        </Link>
      </div>
    </>
  )
}
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { routes } from './routes'

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          {Object.entries(routes).map(([path, Component]) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
        </Routes>
    </BrowserRouter>
  )
}

export default App


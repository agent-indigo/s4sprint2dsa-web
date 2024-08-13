import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import {Container} from 'react-bootstrap'
import {Provider} from 'react-redux'
import ToastContainer from 'react-bootstrap'
import store from './store'
import Header from './components/Header'
import Footer from './components/Footer'
import AddTreePage from './pages/AddTreePage'
import TreePage from './pages/TreePage'
import TreesPage from './pages/TreesPage'
import 'bootswatch/dist/united/bootstrap.css'
import 'react-toastify/dist/ReactToastify.css'
const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Header/>
      <main className="py-3">
        <Container>
          <Routes>
            <Route
              path='/trees'
              element={<TreesPage/>}
              index={true}
            />
            <Route
              path='/trees/add'
              element={<AddTreePage/>}
            />
            <Route
              path='/trees/?_id'
              element={<TreePage/>}
            />
          </Routes>
        </Container>
      </main>
      <Footer/>
      <ToastContainer/>
    </BrowserRouter>
  </Provider>
)
export default App
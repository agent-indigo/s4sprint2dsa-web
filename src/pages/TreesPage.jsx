import {useState, useEffect} from 'react'
import {Button, Col, Form, Row, Table} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {FaTrash, FaArrowUp, FaArrowDown, FaList, FaTree, FaCheckDouble} from 'react-icons/fa'
import {toast} from 'react-toastify'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {useGetAllQuery, useDeleteMutation} from '../slices/treesApiSlice'
import {Helmet} from 'react-helmet'
const TreesPage = () => {
  const {data: trees, isLoading, isError, error, refetch} = useGetAllQuery()
  const [selectedTrees, setSelectedTrees] = useState(null)
  const [allTrees, setAllTrees] = useState([])
  const [sortCriteria, setSortCriteria] = useState({field: 'createdAt', order: 'desc'})
  const [deleteTree, {isLoading: deleting}] = useDeleteMutation()
  const sortHandler = (field, order) => setSortCriteria({field, order})
  const deleteHandler = async _id => {
    try {
      const response = await deleteTree(_id).unwrap()
      refetch()
      toast.success(response.message)
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }
  const bulkDeleteHandler = async () => {
    try {
      await Promise.all(selectedTrees.map(_id => deleteTree(_id).unwrap()))
      refetch()
      setSelectedTrees([])
      toast.success('Trees deleted.')
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }
  useEffect(
    () => setAllTrees(trees || []),
    [trees]
  )
  if (isLoading) {
    return (
      <>
        <Helmet>
          <title>Processing... | Data Trees</title>
        </Helmet>
        <Loader/>
      </>
    )
  } else if (isError) {
    return (
      <>
        <Helmet>
          <title>Error | Data Trees</title>
        </Helmet>
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      </>
    )
  } else {
    const sortedTrees = [...trees].sort((a, b) => {
      const orderFactor = sortCriteria.order === 'asc' ? 1 : -1
      if (a[sortCriteria.field] < b[sortCriteria.field]) {
        return -1 * orderFactor
      } else if (a[sortCriteria.field] > b[sortCriteria.field]) {
        return 1 * orderFactor
      } else {
        return 0
      }
    })
    const checkAllHandler = event => event.target.checked ? setSelectedTrees(allTrees.map(tree => tree._id)) : setSelectedTrees([])
    return (
      <>
        <Helmet>
          <title>List | Data Trees</title>
        </Helmet>
        <h1><FaList/><FaTree/> Trees</h1>
        <Row className='mb-3'>
          <Col sm={12}>
            <Button
              type='button'
              variant='danger'
              disabled={selectedTrees.length === 0}
              onClick={bulkDeleteHandler}
            >
              <FaTrash/> Delete selected
            </Button>
          </Col>
        </Row>
        <Table striped hover responsive>
          <thead>
            <tr>
              <th>
                <FaCheckDouble/>
                <Form.Check
                  type='checkbox'
                  checked={selectedTrees.length > 0}
                  onChange={event => checkAllHandler(event)}
                />
              </th>
              <th>
                Created
                <div className="d-flex">
                  <Link
                    to={'#'}
                    onClick={() => sortHandler('createdAt', 'asc')}
                  >
                    <FaArrowUp/>
                  </Link>
                  <Link
                    to={'#'}
                    onClick={() => sortHandler('createdAt', 'desc')}
                  >
                    <FaArrowDown/>
                  </Link>
                </div>
              </th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {sortedTrees.map(tree => (
              <tr key={tree._id}>
                <td>
                  <Form.Check
                    type='checkbox'
                    checked={selectedTrees.includes(tree._id)}
                    onChange={event => {
                      const _id = tree._id
                      event.target.checked ? setSelectedTrees([...selectedTrees, _id]) : setSelectedTrees(selectedTrees.filter(id => id !== _id))
                    }}
                  />
                </td>
                <td>
                  <Link to={`/trees?_id=${tree._id}`}>
                    {tree._id}
                  </Link>
                </td>
                <td>
                  <Button
                    type='button'
                    variant='danger'
                    className='p-auto text-white'
                    disabled={deleting}
                    onClick={() => deleteHandler(tree._pk)}
                  >
                    <FaTrash/> Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    )
  }
}
export default TreesPage
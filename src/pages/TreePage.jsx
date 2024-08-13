import {
  useLocation,
  useNavigate
} from 'react-router-dom'
import {
  Card,
  CardBody,
  CardText,
  CardGroup,
  Row,
  Col,
  Button
} from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {toast} from 'react-toastify'
import {Helmet} from 'react-helmet'
import {
  useGetByIdQuery,
  useDeleteByIdMutation
} from '../slices/treesApiSlice'
import {
  FaList,
  FaTree,
  FaTrash
} from 'react-icons/fa'
const TreePage = () => {
  const {search} = useLocation()
  const queryParams = new URLSearchParams(search)
  const _id = queryParams.get('_id')
  const {
    data: tree,
    isLoading,
    isError,
    error
  } = useGetByIdQuery(_id)
  const [nodes] = tree
  const [
    deleteTree,
    {isLoading: deleting}
  ] = useDeleteByIdMutation()
  const navigate = useNavigate()
  const handleDelete = async _id => {
    try {
      await deleteTree(_id).unwrap()
      navigate(`/trees?_id=${_id}`)
      toast.success('Tree deleted.')
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }
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
    return (
      <>
        <Helmet>
          <title>
            {tree.createdAt} | Data Trees
          </title>
        </Helmet>
        <Row className='mb-3'>
          <Col
            sm={10}
            className='d-flex align-items-center'
          >
            <h1><FaList/><FaTree/> {tree.createdAt}</h1>
          </Col>
          <Col
            sm={2}
            className='d-flex align-items-center'
          >
            <Button
              type='button'
              variant='danger'
              disabled={deleting}
              onClick={handleDelete}
            >
              <FaTrash/> Delete
            </Button>
          </Col>
        </Row>
        <CardGroup className='mb-4'>
          {nodes && nodes.map(node => (
            <Card className='mb-3 text-center'>
              <CardBody>
                <CardText className='mb-2'>
                  {node._id && `ID: ${node._id}`}
                </CardText>
                <CardText className='mb-2'>
                  {node.value && `Value: ${node.value}`}
                </CardText>
                <CardText className='mb-2'>
                  {node.height && `Height: ${node.height}`}
                </CardText>
                <CardText className='mb-2'>
                  {node.left._id && `Left: ${node.left._id}`}
                </CardText>
                <CardText className='mb-2'>
                  {node.right._id && `Right: ${node.right._id}`}
                </CardText>
              </CardBody>
            </Card>
          ))}
        </CardGroup>
      </>
    )
  }
}
export default TreePage
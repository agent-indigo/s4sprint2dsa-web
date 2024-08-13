import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {Button, Form} from 'react-bootstrap'
import {
  FaList,
  FaTree,
  FaTimes,
  FaCheck,
  FaTrash,
  FaPlus
} from 'react-icons/fa'
import {Helmet} from 'react-helmet'
import {toast} from 'react-toastify'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import {useAddMutation} from '../slices/treesApiSlice'
const AddTreePage = () => {
  const [values, setValues] = useState([])
  const [add, {isLoading}] = useAddMutation()
  const navigate = useNavigate()
  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const response = await add({values}).unwrap()
      navigate(`/trees/${response._id}`)
      toast.success(response.message)
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }
  const addValue = (
    index,
    event
  ) => setValues([...values][index] = event.target.value)
  const removeValue = index => setValues(values.filter((
    _,
    i
  ) => i !== index))
  const handleKeyPress = event => {
    event.preventDefault()
    if (event.key === 'Tab') {
      setValues([...values, ''])
    } else if (event.key === 'Enter') {
      handleSubmit(event)
    }
  }
  return isLoading ? (
    <>
      <Helmet>
        <title>Processing... | Data Trees</title>
      </Helmet>
      <Loader/>
    </>
  ) : (
    <>
      <Helmet>
        <title>Add Data Tree | Data Trees</title>
      </Helmet>
      <FormContainer>
        <h1><FaList/><FaTree/> Add data tree</h1>
        <Form
          onSubmit={handleSubmit}
          className='py-1'
        >
          {values.map((value, index) => (
            <Form.Group
              controlId={`value-${index}`}
              key={index}
              className='py-1'
            >
              <Form.Control
                type='text'
                value={value}
                onChange={event => addValue(index, event)}
                onKeyDown={event => handleKeyPress(index, event)}
                autoFocus={index === values.length - 1}
              />
              {values.length > 1 && (
                <Button
                  type='button'
                  variant='danger'
                  onClick={() => removeValue(index)}
                >
                  <FaTrash/> Delete
                </Button>
              )}
            </Form.Group>
          ))}
          <Button
            type='button'
            variant='primary'
            onClick={addValue}
            className='p-auto text-white'
          >
            <FaPlus/> Add Value
          </Button> <Button
            type='submit'
            variant='success'
            className='p-auto text-white'
            disabled={isLoading || values.length === 0}
          >
            <FaCheck/> Save
          </Button> <Button
            type='button'
            variant='danger'
            className='p-auto text-white'
            disabled={isLoading}
            onClick={() => navigate('/trees/list')}
          >
            <FaTimes/> Cancel
          </Button>
          {isLoading && <Loader/>}
        </Form>
      </FormContainer>
    </>
  )
}
export default AddTreePage
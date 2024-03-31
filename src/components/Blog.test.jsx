import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('without click, renders only title any author', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Testy McTestFace',
    likes: 666,
    url: 'www.test.com'
  }
  

  render(<Blog blog={blog} />)


  const element = screen.getByText(`${blog.title} ${blog.author}`)
  expect(element).toBeDefined()

  const url = screen.queryByText(`${blog.url}`)
  expect(url).toBeNull()
})

test('with click also renders URL and likes', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Testy McTestFace',
    likes: 666,
    url: 'www.test.com'
  }
  const mockHandler = vi.fn()

  render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const element = screen.getByText(`${blog.title} ${blog.author}`)
  expect(element).toBeDefined()

  const url = screen.getByText(`${blog.url}`)
  expect(url).toBeDefined()

  const likes = screen.getByText(`likes ${blog.likes}`)
  expect(likes).toBeDefined()

})

test('if like clicked twice, event handler called twice', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Testy McTestFace',
    likes: 666,
    url: 'www.test.com'
  }
  const mockHandler = vi.fn()

  render(<Blog blog={blog} giveLike={mockHandler} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)

})
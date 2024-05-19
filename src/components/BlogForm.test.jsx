import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('form calls handler with correct data', async () => {
    const mockHandler = vi.fn()

    render(<BlogForm createBlog={mockHandler} />)

    const user = userEvent.setup()

    const title = screen.getByPlaceholderText('write title here...')
    const author = screen.getByPlaceholderText('write author here...')
    const url = screen.getByPlaceholderText('write url here...')
    const sendButton = screen.getByText('create')

    const test_title = 'test blog'
    const test_author = 'testy mctestface'
    const test_url = 'www.test.com'

    await user.type(title, test_title)
    await user.type(author, test_author)
    await user.type(url, test_url)
    await user.click(sendButton)

    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0]).toStrictEqual({
        title: test_title,
        url: test_url,
        author: test_author,
    })
})

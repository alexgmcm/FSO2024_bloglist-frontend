import blogService from '../services/blogs'
import { useState } from 'react'
import {  Form, Button } from 'react-bootstrap'

const BlogForm = ({ createBlog }) => {
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [title, setTitle] = useState('')

    const handleCreate = (event) => {
        event.preventDefault()
        createBlog({ title: title, url: url, author: author })
        setAuthor('')
        setTitle('')
        setUrl('')
    }

    return (
        <div>
            <h2>Create new</h2>
            <Form onSubmit={handleCreate}>
            <Form.Group>
            <Form.Label>title:</Form.Label>
                    <Form.Control
                        data-testid="title"
                        type="text"
                        value={title}
                        name="Title"
                        placeholder="write title here..."
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </Form.Group>
                <Form.Group>
                <Form.Label>author:</Form.Label>
                    <Form.Control
                        data-testid="author"
                        type="text"
                        value={author}
                        name="Author"
                        placeholder="write author here..."
                        onChange={({ target }) => setAuthor(target.value)}
                    />
               </Form.Group>
                <Form.Group>
                <Form.Label>url:</Form.Label>
                    <Form.Control
                        data-testid="url"
                        type="text"
                        value={url}
                        name="URL"
                        placeholder="write url here..."
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">create</Button>
            </Form>
        </div>
    )
}

export default BlogForm

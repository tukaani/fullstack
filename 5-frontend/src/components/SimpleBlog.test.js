import React from 'react'
import { shallow } from 'enzyme'
import Simpleblog from './Simpleblog'

describe.only('<Simpleblog />', () => {
  it('renders content', () => {
    const blog = {
      title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
      author: 'king',
      url: 'url',
      likes:666
    }

    const blogComponent = shallow(<Simpleblog blog={blog} />)
    const headDiv = blogComponent.find('.head')
    const likesDiv = blogComponent.find('.likes')

    expect(headDiv.text()).toContain(blog.title)
    expect(headDiv.text()).toContain(blog.author)
    expect(likesDiv.text()).toContain(blog.likes)
  })

  it('clicking twice', () => {
    const blog = {
        title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
        author: 'king',
        url: 'url',
        likes:666
      }

      const mockHandler = jest.fn()
      const BlogComponent = shallow(
        <Simpleblog
            blog={blog}
            onClick={mockHandler}
        />
      )
      const button = BlogComponent.find('button')
        button.simulate('click')
        button.simulate('click')

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})
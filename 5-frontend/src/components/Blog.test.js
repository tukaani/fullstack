import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'


describe.only('<Blog />', () => {
  it('after clicking name the details are displayed', () => {
    const blog = {
      title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
      author: 'king',
      url: 'url',
      likes:666
    }
    const user = {username:'asd'}

    const blogComponent = shallow(<Blog blog={blog} user={user}/>)
    const nameDiv = blogComponent.find('.nameDiv')
    expect(nameDiv.text()).toContain(blog.title)
    nameDiv.simulate('click')

    const contentDiv = blogComponent.find('.contentDiv')

    expect(contentDiv.text()).toContain(blog.title)
    
    expect(contentDiv.text()).toContain(blog.likes)
    expect(contentDiv.text()).toContain(blog.url)
  })
})

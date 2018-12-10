import React from 'react'
import { mount } from 'enzyme'
import Blog from './Blog'
import App from '../App'
jest.mock('../services/blogs')
import blogService from '../services/blogs'

describe('<App />', () => {
    let app
    const user = {
        username: 'tester',
        token: '1231231214',
        name: 'Teuvo Testaaja'
      }
      
      //localStorage.setItem('loggedBlogappUser', null)
  
    describe('when user is not logged', () => {
      beforeEach(() => {
        // luo sovellus siten, että käyttäjä ei ole kirjautuneena
        
        app = mount(<App />)
        
      })
  
      it('only login form is rendered', () => {
        //console.log(localStorage.getItem('loggedBlogAppUser'))
        
        
        app.update()
        // localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
        // console.log(localStorage.getItem('loggedBlogappUser'))
        
        const loginDiv = app.find('.loginDiv')
        
        expect(loginDiv.text()).toContain('Kirjaudu')
        // ...
      })
    })
  
    describe('when user is logged', () => {
      beforeEach(() => {
        localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
        app = mount(<App />)
        // luo sovellus siten, että käyttäjä on kirjautuneena
      })
  
      it('all notes are rendered', () => {
        app.update()
        const blogComponents = app.find(Blog)
        console.log('blog perkele', blogComponents)
        expect(blogComponents.length).toEqual(blogService.blogs.length)
        // ...
      })
    })
  })
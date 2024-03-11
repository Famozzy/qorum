import React from 'react'
import Wrapper from './Wrapper'
import AppNavigation from '../components/app/AppNavigation'

const stories = {
  title: 'AppNavigation',
  component: AppNavigation
}

const TemplateStory = (args) => (
  <Wrapper states={args}>
    <AppNavigation />
  </Wrapper>
)

const LoggedIn = TemplateStory.bind({})
const LoggedOut = TemplateStory.bind({})

LoggedIn.args = {
  authUser: { id: 'user-1' }
}

export { LoggedIn, LoggedOut }
export default stories

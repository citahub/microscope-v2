import { createHashHistory } from 'history'

const history = createHashHistory({
  basename: process.env.PUBLIC_URL
})

export default history

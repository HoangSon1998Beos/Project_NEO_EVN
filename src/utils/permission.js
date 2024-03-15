import router from '../router'

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token')

  if (!token && to.path === '/') {
    return next({ path: '/home' })
  }

  if (token && (to.path === '/' || to.name === 'Login')) {
    return next({ name: 'Home' })
  }

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!token) {
      return next({
        name: 'Login',
      })
    }
  }

  return next()
})

const { Router } = require('express')
const router = Router()

/**
 * Get all users
 */
router.get('/', (req, res) => {
  return res.json('All users sent')
})

/**
 * Get a specific user
 */
router.get('/:id', (req, res) => {
  if (req.params.id === 'U0001') {
    return res.json('User U0001 found')
  }
  return res.status(404).json('User not found')
})

/**
 * Add user
 */
router.post('/', (req, res) => {
  const { username, password } = req.body
  if (username && password) {
    return res.status(201).json('User created')
  }
  res.status(400).json('User not created')
})

module.exports = router

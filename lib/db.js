require('dotenv').config()
const mysql = require('serverless-mysql')

const config = {
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS
}

const db = mysql({config: config})

exports.query = async query => {
  try {
    const results = await db.query(query)
    await db.end()
    return results
  } catch (error) {
    console.error(error)
  }
}

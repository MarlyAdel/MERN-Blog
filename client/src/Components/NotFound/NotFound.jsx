import React from 'react'
import { Link } from 'react-router-dom'
import './NotFound.css'

export default function NotFound() {
  return (
    <>
    <section className="not-found">
        <div className="not-found-title">404</div>
        <h1 className="not-found-text">Page Not Found</h1>
        <Link to={"/"} className='not-found-link'>
          Go To Home Page
        </Link>
    </section>
    </>
  )
}

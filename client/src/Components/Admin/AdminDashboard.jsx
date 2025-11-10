import React from 'react'
import './Admin.css'
import AdminSidebar from './AdminSidebar'
import AdminMain from './AdminMain'

export default function Admin() {
  return (
    <>
    <section className="admin-dashboard">
       <AdminSidebar/>

       <AdminMain/>
    </section>
    </>
  )
}

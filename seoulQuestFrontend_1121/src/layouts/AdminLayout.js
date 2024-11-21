import React from 'react'
import '../components/admin/Admin.css'
import SideBar from '../components/admin/ui/SideBar';
import AdminBasicMenu from '../components/admin/menus/AdminBasicMenu';

const AdminLayout = ({ children }) => {
  return (
    <div className='flex flex-col min-h-screen'>
      <AdminBasicMenu />
      <main className='flex flex-grow pt-16'>
        <SideBar />
        {children}
      </main>
    </div>
  );
}

export default AdminLayout
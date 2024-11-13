// import React, { useState } from 'react'
// import Graph from './ui/Graph'
// import Widget from './ui/Widget'
// import { useAdminMovePages } from './hooks/useAdminMovePages'

// function AdminMainComponents() {
//     const { moveToOrder } = useAdminMovePages()
//     const [widgetCol, setWidgetCol] = React.useState('md:grid-cols-5')
//     const [pendingCol, setPendingCol] = React.useState('md:grid-cols-3')
//     const [graphColnVis, setGraphColnVis] = React.useState('md:visible')
//     const [gridCol, setGridCol] = React.useState('w-full')

//     React.useEffect(() => {
//         const handleResize = () => {
//             if (window.innerWidth <= 1024) {
//                 setWidgetCol('sm:grid-cols-2 w-[500px]')
//                 setPendingCol('sm:grid-cols-1 h-[400px] w-[450px]')
//                 setGraphColnVis('sm:invisible')
//                 setGridCol('w-[450px]')
//             } else if (window.innerWidth <= 768) {
//                 setWidgetCol('xs:grid-cols-1')
//             } else {
//                 setWidgetCol('md:grid-cols-5')
//                 setPendingCol('md:grid-cols-3')
//                 setGraphColnVis('md:visible')
//                 setGridCol('w-full')
//             }
//         }

//         handleResize();

//         window.addEventListener('resize', handleResize);

//         return () => window.removeEventListener('resize', handleResize)
//     })

//     return (
//         <div className='dashboard items-center p-8 bg-gray-100 w-full'>
//             <div className={`grid ${widgetCol} gap-4 mb-8`}>
//                 <Widget onClick={() => moveToOrder()} title='오늘 판매량' value='123' />
//                 <Widget title='투어 예약' value='123' />
//                 <Widget title='상품 판매량' value='123' />
//                 <Widget title='오늘 유저 수' value='123' />
//                 <Widget title='새 유저 수' value='123' />
//             </div>

//             <div className='flex flex-wrap gap-8'>
//                 {/* Left Section: Pending, Inventory & Customer Inquiries */}
//                 <div className="flex-1 space-y-6 min-w-[386px]">
//                     <div className={`${pendingCol} p-4 bg-white shadow-md rounded-lg`}>
//                         <h3 className="font-bold text-lg mb-2">Pending</h3>
//                         <div className="grid md:grid-cols-2 sm:grid-cols-1 h-40 gap-4">
//                             <div className='flex flex-col justify-between w-44'>
//                                 <h4 className="font-semibold">Orders</h4>
//                                 <p>5 Pending <br />Orders</p>
//                                 <button className="mt-2 bg-blue-500 text-white w-[169px] bottom-0 px-4 py-2 rounded">Approve <br /> Orders</button>
//                             </div>
//                             <div className='flex flex-col justify-between'>
//                                 <h4 className="font-semibold">Reservations</h4>
//                                 <p>8 Pending <br /> Reservations</p>
//                                 <button className="mt-2 bg-blue-500 text-white w-[169px] bottom-0 px-4 py-2 rounded">Approve Reservations</button>
//                             </div>
//                         </div>
//                     </div>

//                     <div className={`${gridCol} p-4 bg-white shadow-md rounded-lg`}>
//                         <h3 className="font-bold text-lg mb-2">Inventory Levels</h3>
//                         <p>Current Inventory: 1,200 items</p>
//                     </div>

//                     <div className={`${gridCol} p-4 bg-white shadow-md rounded-lg`}>
//                         <h3 className="font-bold text-lg mb-2">Customer Inquiries</h3>
//                         <p>15 Customer Inquiries</p>
//                         <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">View Inquiries</button>
//                     </div>

//                     {/* Quick Actions under Customer Inquiries */}
//                     <div className={`${gridCol} p-4 bg-white shadow-md rounded-lg`}>
//                         <h3 className="font-bold text-lg mb-2">Quick Actions</h3>
//                         <div className="grid grid-cols-1 gap-4">
//                             <button className="bg-green-500 text-white px-4 py-2 rounded">Create New Product</button>
//                             <button className="bg-green-500 text-white px-4 py-2 rounded">Create New Tour</button>
//                             <button className="bg-blue-500 text-white px-4 py-2 rounded">Approve Pending Reservations/Orders</button>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Right Section: Graphs */}
//                 <div className={`flex-1 space-y-6 md:col-span-2 ${graphColnVis} w-full`}>
//                     <div className="p-4 bg-white shadow-md rounded-lg">
//                         <h3 className="font-bold text-lg mb-2">Sales Overview</h3>
//                         <Graph />
//                     </div>

//                     <div className="p-4 bg-white shadow-md rounded-lg">
//                         <h3 className="font-bold text-lg mb-2">Trend - Popular Tour & Product</h3>
//                         <Graph />
//                     </div>
//                 </div>
//             </div>
//         </div >
//     )
// }

// export default AdminMainComponents

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, ResponsiveContainer } from 'recharts';
import { Settings, Bell, LogOut, GridIcon, Briefcase, Calendar, FileText, BarChart2, Users, MessageSquare, Search, MoreVertical, Plus } from 'lucide-react';

const weeklyData = [
    { name: 'Mon', applications: 80, shortlisted: 60, rejected: 20, onHold: 10 },
    { name: 'Tue', applications: 75, shortlisted: 55, rejected: 20, onHold: 15 },
    { name: 'Wed', applications: 90, shortlisted: 65, rejected: 20, onHold: 10 },
    { name: 'Thu', applications: 70, shortlisted: 50, rejected: 20, onHold: 15 },
    { name: 'Fri', applications: 85, shortlisted: 60, rejected: 25, onHold: 10 },
    { name: 'Sat', applications: 95, shortlisted: 70, rejected: 20, onHold: 15 },
    { name: 'Sun', applications: 80, shortlisted: 55, rejected: 25, onHold: 10 },
];

const timeData = Array.from({ length: 13 }, (_, i) => ({
    time: `${(i + 8) % 12 || 12}${i + 8 < 12 ? 'AM' : 'PM'}`,
    value: 25 + Math.random() * 50
}));

const AdminMainComponents = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <div className="w-64 bg-white p-6 border-r">
                <div className="flex items-center gap-2 mb-8">
                    <div className="w-8 h-8 bg-purple-600 rounded-lg"></div>
                    <span className="text-xl font-bold">Applify.</span>
                </div>

                <nav className="space-y-4">
                    <div className="flex items-center gap-3 text-purple-600 bg-purple-50 p-3 rounded-lg">
                        <GridIcon size={20} />
                        <span>Dashboard</span>
                    </div>
                    {[
                        { icon: <Briefcase size={20} />, label: 'Jobs' },
                        { icon: <Calendar size={20} />, label: 'Schedule' },
                        { icon: <FileText size={20} />, label: 'Documents' },
                        { icon: <BarChart2 size={20} />, label: 'Statistics' },
                        { icon: <Users size={20} />, label: 'Community' },
                        { icon: <MessageSquare size={20} />, label: 'Messages' },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 text-gray-500 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                            {item.icon}
                            <span>{item.label}</span>
                        </div>
                    ))}
                </nav>

                <div className="mt-auto pt-8">
                    <div className="flex items-center gap-3 text-gray-500 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                        <LogOut size={20} />
                        <span>Logout</span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search"
                                className="pl-10 pr-4 py-2 bg-purple-50 rounded-lg w-64"
                            />
                            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                        </div>
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                            <Settings size={20} />
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-gray-500 mb-2">Total Applications</h3>
                                <p className="text-3xl font-bold">5672</p>
                                <p className="text-green-500 text-sm">+74% Inc</p>
                            </div>
                            <div className="w-16 h-16 bg-purple-100 rounded-full"></div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-gray-500 mb-2">Shortlisted Candidates</h3>
                                <p className="text-3xl font-bold">3045</p>
                                <p className="text-yellow-500 text-sm">+40% Inc</p>
                            </div>
                            <div className="w-16 h-16 bg-yellow-100 rounded-full"></div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-gray-500 mb-2">Rejected Candidates</h3>
                                <p className="text-3xl font-bold">1055</p>
                                <p className="text-red-500 text-sm">+46% Dec</p>
                            </div>
                            <div className="w-16 h-16 bg-red-100 rounded-full"></div>
                        </div>
                    </div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-xl">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-semibold">Statistics of Active Applications</h3>
                            <select className="bg-purple-50 px-4 py-2 rounded-lg">
                                <option>Week</option>
                            </select>
                        </div>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={weeklyData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Bar dataKey="applications" fill="#7C3AED" />
                                <Bar dataKey="shortlisted" fill="#FCD34D" />
                                <Bar dataKey="rejected" fill="#EF4444" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="bg-white p-6 rounded-xl">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-semibold">Applications Received Time</h3>
                            <select className="bg-purple-50 px-4 py-2 rounded-lg">
                                <option>Today</option>
                            </select>
                        </div>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={timeData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="time" />
                                <YAxis />
                                <Line type="monotone" dataKey="value" stroke="#EF4444" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Right Sidebar */}
            <div className="w-80 bg-white p-6 border-l">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-24 h-24 rounded-full bg-gray-200 mb-4"></div>
                    <h3 className="font-semibold">Candace Jules</h3>
                    <p className="text-gray-500">Director of Recruiting</p>
                    <p className="text-gray-500 text-sm">New York, US</p>
                </div>

                <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold">Jobs Posted</h3>
                        <button className="bg-purple-600 text-white px-3 py-1 rounded-lg text-sm">+ Add</button>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-orange-100 p-4 rounded-xl">
                            <div className="flex justify-between items-center">
                                <span className="text-2xl font-bold">95</span>
                                <div className="w-12 h-6 bg-white rounded-full"></div>
                            </div>
                            <p className="font-medium">Sr. Android Developer</p>
                            <p className="text-sm text-gray-500">Total Applications</p>
                        </div>

                        <div className="bg-purple-100 p-4 rounded-xl">
                            <div className="flex justify-between items-center">
                                <span className="text-2xl font-bold">80</span>
                                <div className="w-12 h-6 bg-white rounded-full"></div>
                            </div>
                            <p className="font-medium">UX/UI Designer</p>
                            <p className="text-sm text-gray-500">Total Applications</p>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold">Reminders</h3>
                        <Bell size={20} className="text-gray-500" />
                    </div>

                    <div className="space-y-4">
                        {[
                            { color: 'bg-purple-100', time: '6:30 PM', text: 'Your subscription expires Today.' },
                            { color: 'bg-yellow-100', time: '5:30 PM', text: 'There are 4 new applications for IOS Developer Post.' },
                            { color: 'bg-red-100', time: '5:00 PM', text: 'You Have closed the job post for Design Lead.' },
                            { color: 'bg-green-100', time: '4:45 PM', text: 'You have drafted a job post for Web Developer.' },
                        ].map((item, i) => (
                            <div key={i} className={`${item.color} p-4 rounded-xl`}>
                                <p className="text-sm">{item.text}</p>
                                <p className="text-xs text-gray-500 mt-1">{item.time}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminMainComponents;
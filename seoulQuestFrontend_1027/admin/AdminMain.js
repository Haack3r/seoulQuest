import React from 'react'
import Graph from './Graph'
import Widget from './Widget'

export default function AdminMain() {
    const [widgetCol, setWidgetCol] = React.useState('md:grid-cols-5')
    const [pendingCol, setPendingCol] = React.useState('md:grid-cols-3')
    const [graphColnVis, setGraphColnVis] = React.useState('md:visible')
    const [gridCol, setGridCol] = React.useState('w-full')

    React.useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 1024) {
                setWidgetCol('sm:grid-cols-2 w-[500px]')
                setPendingCol('sm:grid-cols-1 h-[400px] w-[450px]')
                setGraphColnVis('sm:invisible')
                setGridCol('w-[450px]')
            } else if (window.innerWidth <= 768) {
                setWidgetCol('xs:grid-cols-1')
            } else {
                setWidgetCol('md:grid-cols-5')
                setPendingCol('md:grid-cols-3')
                setGraphColnVis('md:visible')
                setGridCol('w-full')
            }
        }

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize)
    })

    return (
        <div className='dashboard p-8 bg-gray-100'>
            <div className={`grid ${widgetCol} gap-4 mb-8`}>
                <Widget title='오늘 판매량' value='123' />
                <Widget title='투어 예약' value='123' />
                <Widget title='상품 판매량' value='123' />
                <Widget title='오늘 유저 수' value='123' />
                <Widget title='새 유저 수' value='123' />
            </div>

            <div className='flex flex-wrap gap-8'>
                {/* Left Section: Pending, Inventory & Customer Inquiries */}
                <div className="flex-1 space-y-6 min-w-[386px]">
                    <div className={`${pendingCol} p-4 bg-white shadow-md rounded-lg`}>
                        <h3 className="font-bold text-lg mb-2">Pending</h3>
                        <div className="grid md:grid-cols-2 sm:grid-cols-1 h-40 gap-4">
                            <div className='flex flex-col justify-between w-44'>
                                <h4 className="font-semibold">Orders</h4>
                                <p>5 Pending <br />Orders</p>
                                <button className="mt-2 bg-blue-500 text-white w-[169px] bottom-0 px-4 py-2 rounded">Approve <br /> Orders</button>
                            </div>
                            <div className='flex flex-col justify-between'>
                                <h4 className="font-semibold">Reservations</h4>
                                <p>8 Pending <br /> Reservations</p>
                                <button className="mt-2 bg-blue-500 text-white w-[169px] bottom-0 px-4 py-2 rounded">Approve Reservations</button>
                            </div>
                        </div>
                    </div>

                    <div className={`${gridCol} p-4 bg-white shadow-md rounded-lg`}>
                        <h3 className="font-bold text-lg mb-2">Inventory Levels</h3>
                        <p>Current Inventory: 1,200 items</p>
                    </div>

                    <div className={`${gridCol} p-4 bg-white shadow-md rounded-lg`}>
                        <h3 className="font-bold text-lg mb-2">Customer Inquiries</h3>
                        <p>15 Customer Inquiries</p>
                        <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">View Inquiries</button>
                    </div>

                    {/* Quick Actions under Customer Inquiries */}
                    <div className={`${gridCol} p-4 bg-white shadow-md rounded-lg`}>
                        <h3 className="font-bold text-lg mb-2">Quick Actions</h3>
                        <div className="grid grid-cols-1 gap-4">
                            <button className="bg-green-500 text-white px-4 py-2 rounded">Create New Product</button>
                            <button className="bg-green-500 text-white px-4 py-2 rounded">Create New Tour</button>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded">Approve Pending Reservations/Orders</button>
                        </div>
                    </div>
                </div>

                {/* Right Section: Graphs */}
                <div className={`flex-1 space-y-6 md:col-span-2 ${graphColnVis} w-full`}>
                    <div className="p-4 bg-white shadow-md rounded-lg">
                        <h3 className="font-bold text-lg mb-2">Sales Overview</h3>
                        <Graph />
                    </div>

                    <div className="p-4 bg-white shadow-md rounded-lg">
                        <h3 className="font-bold text-lg mb-2">Trend - Popular Tour & Product</h3>
                        <Graph />
                    </div>
                </div>
            </div>
        </div >
    )
}
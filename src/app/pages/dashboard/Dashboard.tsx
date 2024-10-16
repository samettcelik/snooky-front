import { useState } from "react"
import { FaMoneyBillWave, FaPercentage, FaShoppingBasket, FaTripadvisor } from "react-icons/fa"
import { MdOutlineMoneyOff } from "react-icons/md";
import { AiOutlineAreaChart } from "react-icons/ai";
import { TbDiscount2 } from "react-icons/tb";
import './style.css'
import TimeSelector from "./components/TimeSelector";
import DashboardChart from "./components/DashboardChart";
import BestPerforming from "./BestPerforming/BestPerforming";
import { FiRefreshCcw } from "react-icons/fi";
import CustomTooltip from "../../modules/customComponents/CustomTooltip";

const Dashboard = () => {

    const [activeTab, setTab] = useState('revenue')
    const [randMoney,] = useState(Intl.NumberFormat().format(Math.floor(Math.random() * (5000 - 200) + 200)))
    const [randMoney2,] = useState(Intl.NumberFormat().format(Math.floor(Math.random() * (5000 - 200) + 200)))
    const [randMoney3,] = useState(Intl.NumberFormat().format(Math.floor(Math.random() * (5000 - 200) + 200)))
    const [randPercent,] = useState(Intl.NumberFormat().format(Math.floor(Math.random() * 100)))
    const [randPercent2,] = useState(Intl.NumberFormat().format(Math.floor(Math.random() * 100)))
    const [randPercent3,] = useState(Intl.NumberFormat().format(Math.floor(Math.random() * 100)))

    return (
        <div className="d-flex flex-column" style={{ marginTop: -2 }}>
            <div className="d-flex justify-content-between align-items-center">
                <h2 className="text-dark fw-bold fs-3 mb-0">Summary of All Campaigns</h2>
                <div className="d-flex align-items-center gap-2">
                    <span className='d-flex gap-2 align-items-center text-gray-600'>
                        <FiRefreshCcw />
                        <span>It refreshes every 5 minutes.</span>
                    </span>
                    <TimeSelector />
                </div>
            </div>
            <div className="d-flex flex-wrap justify-content-between mt-4">
                <div onClick={() => setTab('revenue')} className={`onboardcard cursor-pointer d-flex flex-column ps-6 pe-4 py-4 card rounded border-bottom border-5 ${activeTab === 'revenue' ? 'border-primary bg-light-secondary' : 'border-white'}`}>
                    <div className="d-flex justify-content-between mt-2">
                        <div>
                            <span className="fs-6 fw-semibold">Campaigns Revenue</span>
                            <CustomTooltip description="lorem" />
                        </div>
                        <FaMoneyBillWave className="w-20px h-20px" />
                    </div>
                    <div className="mt-3 d-flex align-items-center gap-3">
                        <span className="fs-4 fw-semibold">
                            ${randMoney}
                        </span>
                        <span className="badge badge-light-secondary text-black fs-8 fw-medium">N/A</span>
                    </div>
                </div>
                <div onClick={() => setTab('cost')} className={`onboardcard cursor-pointer d-flex flex-column ps-6 pe-4 py-4 card rounded border-bottom border-5 ${activeTab === 'cost' ? 'border-primary bg-light-secondary' : 'border-white'}`}>
                    <div className="d-flex justify-content-between mt-2">
                        <div>
                            <span className="fs-6 fw-semibold">Promotions Costs</span>
                            <CustomTooltip description="lorem" />
                        </div>
                        <MdOutlineMoneyOff style={{ width: 22, height: 22 }} />
                    </div>
                    <div className="mt-3 d-flex align-items-center gap-3">
                        <span className="fs-4 fw-semibold">${randMoney}</span>
                        <span className="badge badge-light-success text-success fs-8 fw-medium">{randPercent}%</span>
                    </div>
                </div>
                <div onClick={() => setTab('rate')} className={`onboardcard cursor-pointer d-flex flex-column ps-6 pe-4 py-4 card rounded border-bottom border-5 ${activeTab === 'rate' ? 'border-primary bg-light-secondary' : 'border-white'}`}>
                    <div className="d-flex justify-content-between mt-2">
                        <div>
                            <span className="fs-6 fw-semibold">Conversion Rate</span>
                            <CustomTooltip description="It is the ratio of the actions on the popup to total number of times the popup is shown." />
                        </div>
                        <FaPercentage style={{ width: 16, height: 16, marginTop: 2 }} />
                    </div>
                    <div className="mt-3 d-flex align-items-center gap-3">
                        <span className="fs-4 fw-semibold">{randPercent}%</span>
                        <span className="badge badge-light-danger fw-medium text-danger fs-8">%8.2</span>
                    </div>
                </div>
                <div onClick={() => setTab('reach')} className={`onboardcard cursor-pointer d-flex flex-column ps-6 pe-4 py-4 card rounded border-bottom border-5 ${activeTab === 'reach' ? 'border-primary bg-light-secondary' : 'border-white'}`}>
                    <div className="d-flex justify-content-between mt-2">
                        <div>
                            <span className="fs-6 fw-semibold">Campaign Reach</span>
                            <CustomTooltip description="The percentage of sessions where visitors viewed at least one Snooky.io campaign." />
                        </div>
                        <AiOutlineAreaChart style={{ width: 23, height: 23 }} />
                    </div>
                    <div className="mt-3 d-flex align-items-center gap-3">
                        <span className="fs-4 fw-semibold">{randPercent2}%</span>
                        <span className="badge badge-light-secondary text-black fs-8 fw-medium">N/A</span>
                    </div>
                </div>
                <div onClick={() => setTab('orders')} className={`onboardcard cursor-pointer d-flex flex-column justify-content-between ps-6 pe-4 py-4 card rounded border-bottom border-5 ${activeTab === 'orders' ? 'border-primary bg-light-secondary' : 'border-white'}`}>
                    <div className="d-flex justify-content-between mt-2">
                        <div>
                            <span className="fs-6 fw-semibold">Saved Margin</span>
                            <CustomTooltip description="lorem" />
                        </div>
                        <FaPercentage style={{ width: 16, height: 16, marginTop: 2 }} />
                    </div>
                    <div className="mt-3 d-flex align-items-center gap-3">
                        <span className="fs-4 fw-semibold">{randPercent3}%</span>
                        <span className="badge badge-light-secondary text-black fs-8 fw-medium">N/A</span>
                    </div>
                </div>
                <div onClick={() => setTab('visit')} className={`onboardcard cursor-pointer d-flex flex-column ps-6 pe-4 py-4 card rounded border-bottom border-5 ${activeTab === 'visit' ? 'border-primary bg-light-secondary' : 'border-white'}`}>
                    <div className="d-flex justify-content-between mt-2">
                        <div>
                            <span className="fs-6 fw-semibold">Revenue Per Visit</span>
                            <CustomTooltip description="Revenue per visitor, RPV, measures the value of each visitor to your site. It's calculated by dividing the total revenue of a website or page by the number of visitors." />
                        </div>
                        <FaTripadvisor className="w-20px h-20px" />
                    </div>
                    <div className="mt-3 d-flex align-items-center gap-3">
                        <span className="fs-4 fw-semibold">{randMoney2}$</span>
                        <span className="badge badge-light-secondary text-black fs-8 fw-medium">N/A</span>
                    </div>
                </div>
                <div onClick={() => setTab('avarage')} className={`onboardcard cursor-pointer d-flex flex-column ps-6 pe-4 py-4 card rounded border-bottom border-5 ${activeTab === 'avarage' ? 'border-primary bg-light-secondary' : 'border-white'}`}>
                    <div className="d-flex justify-content-between mt-2">
                        <div>
                            <span className="fs-6 fw-semibold">Average Order Value</span>
                            <CustomTooltip description="AOV stands for Average Order Value. Measures the average amount a customer spends per order. In simpler terms, it's the total revenue you generate divided by the number of orders you get." />
                        </div>
                        <FaShoppingBasket className="w-20px h-20px" />
                    </div>
                    <div className="mt-3 d-flex align-items-center gap-3">
                        <span className="fs-4 fw-semibold">{randMoney3}$</span>
                        <span className="badge badge-light-secondary text-black fs-8 fw-medium">N/A</span>
                    </div>
                </div>
                <div onClick={() => setTab('discount')} className={`onboardcard cursor-pointer d-flex flex-column ps-6 pe-4 py-4 card rounded border-bottom border-5 ${activeTab === 'discount' ? 'border-primary bg-light-secondary' : 'border-white'}`}>
                    <div className="d-flex justify-content-between mt-2">
                        <div>
                            <span className="fs-6 fw-semibold">Average Discount</span>
                            <CustomTooltip description="lorem" />
                        </div>
                        <TbDiscount2 style={{ width: 23, height: 23 }} />
                    </div>
                    <div className="mt-3 d-flex align-items-center gap-3">
                        <span className="fs-4 fw-semibold">{randPercent}%</span>
                        <span className="badge badge-light-secondary text-black fs-8 fw-medium">N/A</span>
                    </div>
                </div>
            </div>
            <div className="mt-10 w-100">
                <DashboardChart currentTab={activeTab} />
            </div>
            <div className="mt-10 w-100">
                <BestPerforming />
            </div>
        </div>
    )
}

export default Dashboard

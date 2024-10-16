import { useState } from "react"
import CustomTooltip from "../../modules/customComponents/CustomTooltip";
import AnalyticsChart from "./components/AnalyticsChart";
import './style.css'

const AnalyticsCharts = () => {

  const [activeTab, setTab] = useState('revenue')
  const [randMoney,] = useState(Intl.NumberFormat().format(Math.floor(Math.random() * (5000 - 200) + 200)))
  const [randMoney2,] = useState(Intl.NumberFormat().format(Math.floor(Math.random() * (5000 - 200) + 200)))
  const [randMoney3,] = useState(Intl.NumberFormat().format(Math.floor(Math.random() * (5000 - 200) + 200)))
  const [randPercent,] = useState(Intl.NumberFormat().format(Math.floor(Math.random() * 100)))
  const [randPercent2,] = useState(Intl.NumberFormat().format(Math.floor(Math.random() * 100)))
  const [randPercent3,] = useState(Intl.NumberFormat().format(Math.floor(Math.random() * 100)))

  return (
    <div className="d-flex flex-column" style={{ marginTop: -2 }}>
      <div className="d-flex flex-wrap justify-content-between mt-4">
        <div onClick={() => setTab('revenue')} style={{ paddingLeft: 7, paddingRight: 7 }} className={`analyticsChartCard cursor-pointer d-flex flex-column justify-content-between py-2 card rounded border-bottom border-5 ${activeTab === 'revenue' ? 'border-primary bg-light-secondary' : 'border-white'}`}>
          <div className="d-flex justify-content-between mt-2">
            <div>
              <span className="fs-7 fw-semibold">Campaigns Revenue</span>
              <CustomTooltip iconClassName="ms-1" description="lorem" />
            </div>
          </div>
          <div className="mt-3 d-flex align-items-center gap-3">
            <span className="fs-6 fw-semibold">
              ${randMoney}
            </span>
            <span className="badge badge-light-secondary text-black fs-9 fw-medium">N/A</span>
          </div>
        </div>
        <div onClick={() => setTab('cost')} style={{ paddingLeft: 7, paddingRight: 7 }} className={`analyticsChartCard cursor-pointer d-flex flex-column justify-content-between py-2 card rounded border-bottom border-5 ${activeTab === 'cost' ? 'border-primary bg-light-secondary' : 'border-white'}`}>
          <div className="d-flex justify-content-between mt-2">
            <div>
              <span className="fs-7 fw-semibold">Promotions Costs</span>
              <CustomTooltip iconClassName="ms-1" description="lorem" />
            </div>
          </div>
          <div className="mt-3 d-flex align-items-center gap-3">
            <span className="fs-6 fw-semibold">${randMoney}</span>
            <span className="badge badge-light-success text-success fs-9 fw-medium">{randPercent}%</span>
          </div>
        </div>
        <div onClick={() => setTab('rate')} style={{ paddingLeft: 7, paddingRight: 7 }} className={`analyticsChartCard cursor-pointer d-flex flex-column justify-content-between py-2 card rounded border-bottom border-5 ${activeTab === 'rate' ? 'border-primary bg-light-secondary' : 'border-white'}`}>
          <div className="d-flex justify-content-between mt-2">
            <div>
              <span className="fs-7 fw-semibold">Conversion Rate</span>
              <CustomTooltip iconClassName="ms-1" description="It is the ratio of the actions on the popup to total number of times the popup is shown." />
            </div>
          </div>
          <div className="mt-3 d-flex align-items-center gap-3">
            <span className="fs-6 fw-semibold">{randPercent}%</span>
            <span className="badge badge-light-danger fw-medium text-danger fs-9">%8.2</span>
          </div>
        </div>
        <div onClick={() => setTab('reach')} style={{ paddingLeft: 7, paddingRight: 7 }} className={`analyticsChartCard cursor-pointer d-flex flex-column justify-content-between py-2 card rounded border-bottom border-5 ${activeTab === 'reach' ? 'border-primary bg-light-secondary' : 'border-white'}`}>
          <div className="d-flex justify-content-between mt-2">
            <div>
              <span className="fs-7 fw-semibold">Campaign Reach</span>
              <CustomTooltip iconClassName="ms-1" description="The percentage of sessions where visitors viewed at least one Snooky.io campaign." />
            </div>
          </div>
          <div className="mt-3 d-flex align-items-center gap-3">
            <span className="fs-6 fw-semibold">{randPercent2}%</span>
            <span className="badge badge-light-secondary text-black fs-9 fw-medium">N/A</span>
          </div>
        </div>
        <div onClick={() => setTab('orders')} style={{ paddingLeft: 7, paddingRight: 7 }} className={`analyticsChartCard cursor-pointer d-flex flex-column justify-content-between justify-content-between py-2 card rounded border-bottom border-5 ${activeTab === 'orders' ? 'border-primary bg-light-secondary' : 'border-white'}`}>
          <div className="d-flex justify-content-between mt-2">
            <div>
              <span className="fs-7 fw-semibold">Saved Margin</span>
              <CustomTooltip iconClassName="ms-1" description="lorem" />
            </div>
          </div>
          <div className="mt-3 d-flex align-items-center gap-3">
            <span className="fs-6 fw-semibold">{randPercent3}%</span>
            <span className="badge badge-light-secondary text-black fs-9 fw-medium">N/A</span>
          </div>
        </div>
        <div onClick={() => setTab('visit')} style={{ paddingLeft: 7, paddingRight: 7 }} className={`analyticsChartCard cursor-pointer d-flex flex-column justify-content-between py-2 card rounded border-bottom border-5 ${activeTab === 'visit' ? 'border-primary bg-light-secondary' : 'border-white'}`}>
          <div className="d-flex justify-content-between mt-2">
            <div>
              <span className="fs-7 fw-semibold">Revenue Per Visit</span>
              <CustomTooltip iconClassName="ms-1" description="Revenue per visitor, RPV, measures the value of each visitor to your site. It's calculated by dividing the total revenue of a website or page by the number of visitors." />
            </div>
          </div>
          <div className="mt-3 d-flex align-items-center gap-3">
            <span className="fs-6 fw-semibold">{randMoney2}$</span>
            <span className="badge badge-light-secondary text-black fs-9 fw-medium">N/A</span>
          </div>
        </div>
        <div onClick={() => setTab('avarage')} style={{ paddingLeft: 7, paddingRight: 7 }} className={`analyticsChartCard cursor-pointer d-flex flex-column justify-content-between py-2 card rounded border-bottom border-5 ${activeTab === 'avarage' ? 'border-primary bg-light-secondary' : 'border-white'}`}>
          <div className="d-flex justify-content-between mt-2">
            <div>
              <span className="fs-7 fw-semibold">Average Order Value</span>
              <CustomTooltip iconClassName="ms-1" description="AOV stands for Average Order Value. Measures the average amount a customer spends per order. In simpler terms, it's the total revenue you generate divided by the number of orders you get." />
            </div>
          </div>
          <div className="mt-3 d-flex align-items-center gap-3">
            <span className="fs-6 fw-semibold">{randMoney3}$</span>
            <span className="badge badge-light-secondary text-black fs-9 fw-medium">N/A</span>
          </div>
        </div>
        <div onClick={() => setTab('discount')} style={{ paddingLeft: 7, paddingRight: 7 }} className={`analyticsChartCard cursor-pointer d-flex flex-column justify-content-between py-2 card rounded border-bottom border-5 ${activeTab === 'discount' ? 'border-primary bg-light-secondary' : 'border-white'}`}>
          <div className="d-flex justify-content-between mt-2">
            <div>
              <span className="fs-7 fw-semibold">Average Discount</span>
              <CustomTooltip iconClassName="ms-1" description="lorem" />
            </div>
          </div>
          <div className="mt-3 d-flex align-items-center gap-3">
            <span className="fs-6 fw-semibold">{randPercent}%</span>
            <span className="badge badge-light-secondary text-black fs-9 fw-medium">N/A</span>
          </div>
        </div>
      </div>
      <div className="mt-10 w-100">
        <AnalyticsChart currentTab={activeTab} />
      </div>
    </div>
  )
}

export default AnalyticsCharts

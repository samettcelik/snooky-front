import React, { useState, useEffect } from "react";
import { getPricingPlans } from './core/_request'
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";

// type Plan = {
//   name: string;
//   description: string;
//   priceMonthly: number;
//   priceAnnual: number;
//   features: { name: string; isAvailable: boolean }[];
// };


const plans = [
  {
    name: 'Free',
    monthlyPrice: null,
    yearlyPrice: null,
    pageviews: '5.000 pageviews monthly',
    websiteCount: '1 website included',
    ai: 'NextGen AI / ML powered intent - based promotion',
    users: 'Unlimited users',
    campaigns: 'Unlimited popups campaigns'
  },
  {
    name: 'Basic',
    monthlyPrice: 59,
    yearlyPrice: 599,
    pageviews: '50.000 pageviews monthly',
    websiteCount: 'Up to 5 websites included',
    ai: 'NextGen AI / ML powered intent - based promotion',
    users: 'Unlimited users',
    campaigns: 'Unlimited popups campaigns',
    active: true
  },
  {
    name: 'Pro',
    monthlyPrice: 99,
    yearlyPrice: 999,
    pageviews: '100.000 pageviews monthly',
    websiteCount: 'Up to 5 websites included',
    ai: 'NextGen AI / ML powered intent - based promotion',
    users: 'Unlimited users',
    campaigns: 'Unlimited popups campaigns'
  },
  {
    name: 'Expert',
    monthlyPrice: 169,
    yearlyPrice: 1.699,
    pageviews: '250.000 pageviews monthly',
    websiteCount: 'Up to 5 websites included',
    ai: 'NextGen AI/ ML powered intent - based promotion',
    users: 'Unlimited users',
    campaigns: 'Unlimited popups campaigns'
  },
  {
    name: 'Premium',
    monthlyPrice: 239,
    yearlyPrice: 2.399,
    pageviews: '500.000 pageviews monthly',
    websiteCount: 'Up to 5 websites included',
    ai: 'NextGen AI/ ML powered intent - based promotion',
    users: 'Unlimited users',
    campaigns: 'Unlimited popups campaigns'
  },
  {
    name: 'Premium+',
    monthlyPrice: 300,
    yearlyPrice: 2.999,
    pageviews: '1M pageviews monthly',
    websiteCount: 'Up to 5 websites included',
    ai: 'NextGen AI/ ML powered intent - based promotion',
    users: 'Unlimited users',
    campaigns: 'Unlimited popups campaigns'
  },
]


const PricingScreen = ({ isInUser }: { isInUser?: boolean }) => {
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [plansList, setPlansList] = useState([])
  const [monthly, setMonthly] = useState([])
  const [year, setYear] = useState([])

  const navigate = useNavigate()

  const plansListTypeChange = (plan) => {
    setSelectedPlan(plan)
    if (plan == "monthly") {
      return setPlansList(monthly);
    }
    setPlansList(year)
  }

  // useEffect(() => {
  //   getPlans()
  // }, []);

  // const getPlans = async () => {
  //   const _plans = await getPricingPlans()
  // }

  return (
    <>
      <div className="card" id="kt_pricing">
        <div className="card-body p-lg-17">
          <div className="d-flex flex-column">
            <div className="mb-13 text-center">
              <h1 className="fs-2hx fw-bold mb-5">Choose Your Plan</h1>
              <div className="text-gray-600 fw-semibold fs-5">
                How Many Monthly Page View Your Website Get?
              </div>
            </div>
            <div
              className="nav-group nav-group-outline mx-auto mb-15"
              data-kt-buttons="true"
              data-kt-initialized="1"
            >
              <button
                className={`btn btn-color-gray-600 ${selectedPlan === 'monthly' ? 'btn-active btn-active-secondary active' : ''
                  } px-6 py-3 me-2`}
                data-kt-plan="month"
                onClick={(e) => {
                  e.preventDefault()
                  plansListTypeChange('monthly')
                }}
              >
                Monthly
              </button>

              <button
                className={`btn btn-color-gray-600 ${selectedPlan === 'year' ? 'btn-active btn-active-secondary active' : ''
                  } px-6 py-3`}
                data-kt-plan="annual"
                onClick={(e) => {
                  e.preventDefault()
                  plansListTypeChange('year')
                }}
              >
                Annual
              </button>
            </div>

            <div className="row g-5 align-items-start">
              {plans.map((plan, index) => (
                <div className="col-sm-12 col-md-6 col-xl-4" key={index}>
                  <div className="d-flex h-100 align-items-center">
                    <div className="w-100 d-flex flex-column flex-center rounded-3 bg-light shadow pt-15 overflow-hidden">
                      <h1 className="text-center text-dark mb-5 fw-bolder px-6">
                        {plan.name}
                      </h1>
                      <div className="d-flex align-items-start px-10">
                        {plan.monthlyPrice && <span className="fw-bold" style={{ fontSize: '1.4rem' }}>$</span>}
                        <span className="fw-bold" style={{ fontSize: '4rem' }}>{plan.monthlyPrice ? selectedPlan === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice : 'Free'}</span>
                      </div>
                      <div style={{ marginTop: '-10px' }} className="d-flex flex-column align-items-center px-10">
                        <span className="fs-sm fw-bold">{plan.monthlyPrice ? 'Every year' : 'All time'}</span>
                        {plan.monthlyPrice ? <span className="fs-sm"> 14 day free trial</span> : <div className="mt-5" />}
                      </div>
                      <button
                        onClick={() => {
                          navigate('/auth')
                        }}
                        style={{ fontSize: '1.5rem' }}
                        className={`btn btn-sm btn-warning text-gray-900 fw-bold mt-8 ${isInUser ? plan.active && "disabled" : "active"}`}
                      >
                        {isInUser ? plan.monthlyPrice ? plan.active ? 'My Plan' : 'Upgrade' : 'Free Trial' : 'Free Trial'}
                      </button>
                      <div className="bg-primary py-8 w-100 mt-8 px-6 d-flex flex-column gap-6">
                        <div className="d-flex gap-1 text-white" style={{ fontSize: '1.1rem' }}>
                          <div>
                            <IoIosCheckmarkCircle />
                          </div>
                          <span className="">{plan.pageviews}</span>
                        </div>
                        <div className="d-flex gap-1 text-white" style={{ fontSize: '1.1rem' }}>
                          <div>
                            <IoIosCheckmarkCircle />
                          </div>
                          <span className="">{plan.websiteCount}</span>
                        </div>
                        <div className="d-flex gap-1 text-white" style={{ fontSize: '1.1rem' }}>
                          <div>
                            <IoIosCheckmarkCircle />
                          </div>
                          <span className="">{plan.ai}</span>
                        </div>
                        <div className="d-flex gap-1 text-white" style={{ fontSize: '1.1rem' }}>
                          <div>
                            <IoIosCheckmarkCircle />
                          </div>
                          <span className="">{plan.campaigns}</span>
                        </div>
                        <div className="d-flex gap-1 text-white" style={{ fontSize: '1.1rem' }}>
                          <div>
                            <IoIosCheckmarkCircle />
                          </div>
                          <span className="">{plan.users}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { PricingScreen };

import React, { FC, useEffect, useRef, useState } from 'react'
import { PageTitle } from '../../../_metronic/layout/core'
import { PopupsListWrapper } from '../campaigns/popupsTable/PopupsList'
import Filters from './components/Filters'
import CampaignSelect from './components/CampaignSelect'
import { IoMdClose } from 'react-icons/io'
import LeftFilter from './components/LeftFilter'
import countries from '../../../_metronic/helpers/AllCountry'
import AnalyticsCharts from './AnalyticsCharts'
import AnalyticsTables from './AnalyticsTables'
import { useNavigate, useParams } from 'react-router-dom'
import { useAtom } from 'jotai'
import { userAtom } from '../../../store/jotai/UserAtom'

const allCampaigns = [
  { name: 'Test Campaign One' },
  { name: 'Test Campaign Two' },
  { name: 'Untitled Campaign' },
]

const AnalyticsPageWrapper = () => {
  const [me, setMe] = useAtom(userAtom)
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)
  const [activeCampaign, setActiveCampaign] = useState<any>('')
  const [selectedDeviceName, setSelectedDeviceName] = useState<any>('')
  const [devices, setDevices] = useState([
    { name: 'Desktop', selected: false },
    { name: 'Mobile', selected: false },
    { name: 'Tablet', selected: false },
  ])
  const [activeDevicesCount, setActiveDevicesCount] = useState<any>(0)
  const [activeDevicesList, setActiveDevicesList] = useState<any>(0)
  const [activeCountries, setActiveCountries] = useState<any>([])
  const [activeCountriesList, setActiveCountriesList] = useState<any>([])
  const [showActiveCountriesList, setShowActiveCountriesList] = useState(false)
  const [showActiveDevicesList, setShowActiveDevicesList] = useState(false)

  let { id } = useParams()
  useEffect(() => {
    if (id) {
      let intId = parseInt(id) - 1
      if (intId > allCampaigns.length - 1) {
        intId = 0
      }
      setActiveCampaign(allCampaigns[intId])
    }
  }, [id])

  const navigate = useNavigate()
  useEffect(() => {
    if (!me) {
      navigate('/auth/registration')
    }
  }, [])

  useEffect(() => {
    let _newArr = activeCountries.map(ct => {
      ct.unselected = undefined
      return ct
    })
    countries.map((ct, ix) => {
      let index = -1

      activeCountries.map((c, i) => {
        if (c.value === ct.value) {
          index = i
        }
      })
      if (index < 0) {
        _newArr.push({ ...ct, unselected: true })
      }
    })
    setActiveCountriesList([..._newArr])
  }, [activeCountries])

  useEffect(() => {
    let selectedCount = 0
    let _arr: Array<any> = []
    devices.map((dv) => {
      if (dv.selected) {
        setSelectedDeviceName(dv.name)
        selectedCount += 1
        _arr.push(dv)
      }
    })
    if (selectedCount > 1) {
      setSelectedDeviceName(0)
    }
    devices.map(dv => {
      if (!dv.selected) {
        _arr.push(dv)
      }
    })
    setActiveDevicesList(_arr)
    setActiveDevicesCount(selectedCount)
  }, [devices])

  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef);

  function useOutsideClick(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowActiveCountriesList(false)
          setShowActiveDevicesList(false)
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  return (
    <>
      <PageTitle breadcrumbs={[]}>Analytics</PageTitle>
      <div className='d-flex flex-column gap-4' style={{ marginTop: -10 }}>
        <div className='d-flex align-items-center justify-content-between'>
          <div className='d-flex align-items-center gap-2'>
            <CampaignSelect allCampaigns={allCampaigns} activeCampaign={activeCampaign} setActiveCampaign={setActiveCampaign} />
            <LeftFilter activeCountries={activeCountries} setActiveCountries={setActiveCountries} devices={devices} setDevices={setDevices} />
          </div>
          <Filters />
        </div>
        <div className='d-flex align-items-center'>
          {activeCampaign && (
            <div className='bg-light-secondary px-4 py-1 rounded fw-medium d-flex align-items-center gap-1'>
              Campaign is <span className='fw-bold'>{activeCampaign.name}</span>
              <IoMdClose className='cursor-pointer' onClick={() => {
                setActiveCampaign(null)
              }} />
            </div>
          )}
          {activeCountries.length > 0 && (
            <div className='bg-light-secondary px-4 py-1 rounded fw-medium d-flex align-items-center gap-1 position-relative'>
              Country is {activeCountries.length > 1 && 'any of'}<span onClick={() => setShowActiveCountriesList(!showActiveCountriesList)} className='fw-bold cursor-pointer'>{activeCountries.length > 1 ? `${activeCountries.length} countries` : activeCountries[0].label}</span>
              <IoMdClose className='cursor-pointer' onClick={() => {
                setActiveCountries([])
              }} />
              {showActiveCountriesList &&
                <div
                  ref={wrapperRef}
                  className='bg-white shadow border d-flex flex-md-row flex-column'
                  style={{
                    position: 'absolute',
                    width: 200,
                    left: 0,
                    top: 40,
                    zIndex: 200,
                    maxHeight: 300,
                    overflowY: 'auto',
                    overflowX: 'hidden'
                  }}
                >
                  <div className='d-flex flex-column gap-1 px-2 py-1' style={{ width: 200 }}>
                    {activeCountriesList.map((ct, index) => {
                      return <div
                        key={index}
                        onMouseEnter={() => { setHoverIndex(index) }}
                        onMouseLeave={() => { setHoverIndex(null) }}
                        onClick={(e) => {
                          let _arr = activeCountries
                          let index
                          _arr.map((ctx, i) => {
                            if (ctx.value === ct.value) {
                              index = i
                            }
                          })
                          if (index > -1) {
                            _arr.splice(index, 1)
                          } else {
                            _arr.push(ct)
                          }
                          setActiveCountries([..._arr])
                        }}
                        className='px-6 py-3 d-flex align-items-center justify-content-between cursor-pointer rounded'
                        style={{ width: '100%', color: !ct.unselected ? '#fff' : '#000', background: !ct.unselected ? '#3C53F4' : hoverIndex === index ? '#F9F9F9' : '#ffffff' }}
                      >
                        <span className='fs-6 fw-semibold'>{ct.label}</span>
                      </div>
                    })}
                  </div>
                </div>
              }
            </div>
          )}
          {activeDevicesCount > 0 && (
            <div className='bg-light-secondary px-4 py-1 rounded fw-medium d-flex align-items-center gap-1 position-relative'>
              Device is {activeDevicesCount > 1 && 'any of'}<span onClick={() => setShowActiveDevicesList(!showActiveDevicesList)} className='fw-bold cursor-pointer'>{activeDevicesCount > 1 ? `${activeDevicesCount} devices` : selectedDeviceName}</span>
              <IoMdClose className='cursor-pointer' onClick={() => {
                let _arr: Array<any> = []
                devices.map(dv => {
                  _arr.push({ name: dv.name, selected: false })
                })
                setDevices([..._arr])
              }} />
              {showActiveDevicesList &&
                <div
                  ref={wrapperRef}
                  className='bg-white shadow border d-flex flex-md-row flex-column'
                  style={{
                    position: 'absolute',
                    width: 200,
                    left: 0,
                    top: 40,
                    zIndex: 200,
                    maxHeight: 300,
                    overflowY: 'auto',
                    overflowX: 'hidden'
                  }}
                >
                  <div className='d-flex flex-column gap-1 px-2 py-1' style={{ width: 200 }}>
                    {activeDevicesList.map((dv, index) => {
                      return <div
                        key={index}
                        onMouseEnter={() => { setHoverIndex(index) }}
                        onMouseLeave={() => { setHoverIndex(null) }}
                        onClick={(e) => {
                          let _arr = [...devices]
                          let i
                          devices.map((dvc, ind) => {
                            if (dvc.name === dv.name) {
                              i = ind
                            }
                          })
                          _arr[i].selected = !_arr[i].selected
                          setDevices([..._arr])
                        }}
                        className='px-6 py-3 d-flex align-items-center justify-content-between cursor-pointer rounded'
                        style={{ width: '100%', color: dv.selected ? '#fff' : '#000', background: dv.selected ? '#3C53F4' : hoverIndex === index ? '#F9F9F9' : '#ffffff' }}
                      >
                        <span className='fs-6 fw-semibold'>{dv.name}</span>
                      </div>
                    })}
                  </div>
                </div>
              }
            </div>
          )}
        </div>
      </div>
      <AnalyticsCharts />
      <AnalyticsTables />
    </>
  )
}

export default AnalyticsPageWrapper

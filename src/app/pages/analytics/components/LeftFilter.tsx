import React, { useEffect, useRef, useState } from 'react'
import { IoIosAdd, IoIosArrowDown, IoIosArrowDropright, IoIosArrowDroprightCircle, IoIosArrowForward } from 'react-icons/io';
import Countries from '../../../../_metronic/helpers/AllCountry';
import { KTIcon } from '../../../../_metronic/helpers';

function LeftFilter({ activeCountries, setActiveCountries, devices, setDevices }) {
    const [hoverIndex, setHoverIndex] = useState<number | null>(null)
    const [show, setShow] = useState(false)
    const [countries, setCountries] = useState(Countries)
    const [settings, setSettings] = useState([
        { name: 'Page', selected: false },
        { name: 'Country', selected: false },
        { name: 'Device', selected: false },
    ])
    const [pages, setPages] = useState([])
    const [Pages,] = useState([])


    // Search Area
    const [searchCountries, setSearchCountries] = useState('')
    const [searchPage, setSearchPage] = useState('')

    useEffect(() => {
        if (!searchCountries) return setCountries(Countries)
        const newArray = Countries.filter(obj => {
            return obj.label.toLowerCase().includes(searchCountries.toLowerCase())
        });
        setCountries([...newArray])
    }, [searchCountries])
    useEffect(() => {
        if (!searchPage) return setPages(Pages)
        const newArray = Countries.filter(obj => {
            return obj.name.toLowerCase().includes(searchPage.toLowerCase())
        });
        setCountries([...newArray])
    }, [searchPage])

    const wrapperRef = useRef(null);
    useOutsideClick(wrapperRef);

    function useOutsideClick(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setShow(false)
                    let _arr = settings
                    _arr.map((st, i) => { _arr[i].selected = false })
                    setSettings([..._arr])
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }
    return (
        <div>
            <div
                ref={wrapperRef}
                onClick={(e) => {
                    e.preventDefault()
                    setShow(!show)
                    let _arr: Array<any> = []
                    settings.map(st => {
                        _arr.push({ name: st.name, selected: false })
                    })
                    setSettings([..._arr])
                }}
                className='position-relative bg-white border px-6 py-2 rounded d-flex align-items-center cursor-pointer'
                style={{
                    height: 38,
                    width: 90
                }}
            >
                <span className='fs-6'>Filter</span>
                <IoIosAdd style={{
                    position: 'absolute',
                    right: 10,
                    top: 8,
                    width: 20,
                    height: 20
                }} />
                {show && (
                    <div
                        className='bg-white rounded border shadow d-flex flex-md-row flex-column'
                        style={{
                            position: 'absolute',
                            width: (settings[1].selected || settings[0].selected) ? 300 : 200,
                            left: 0,
                            top: 40,
                            zIndex: 300,
                            maxHeight: 300,
                            overflowY: 'auto',
                            overflowX: 'hidden'
                        }}
                    >
                        <div className='d-flex flex-column' style={{ width: (settings[1].selected || settings[0].selected) ? 300 : 200 }}>
                            {settings[2].selected ? devices.map((dv, index) => (
                                <div
                                    key={index}
                                    onMouseEnter={() => { setHoverIndex(index) }}
                                    onMouseLeave={() => { setHoverIndex(null) }}
                                    onClick={(e) => {
                                        let _arr = [...devices]
                                        _arr[index].selected = !devices[index].selected
                                        setDevices([..._arr])
                                    }}
                                    className='px-6 py-3 d-flex align-items-center justify-content-between'
                                    style={{ width: 200, background: hoverIndex === index ? '#F9F9F9' : '#ffffff' }}
                                >
                                    <span className='fs-6 fw-semibold'>{dv.name}</span>
                                </div>
                            )) : settings[1].selected ? (
                                <div onClick={(e) => e.stopPropagation()}>
                                    <div className='d-flex align-items-center position-relative px-6 py-3'>
                                        <KTIcon iconName='magnifier' className='fs-1 position-absolute ms-3' />
                                        <input
                                            type='text'
                                            style={{ width: '100%' }}
                                            data-kt-user-table-filter='search'
                                            className='form-control form-control-solid ps-12 py-2'
                                            placeholder='Search Country'
                                            value={searchCountries}
                                            onChange={(e) => setSearchCountries(e.target.value)}
                                        />
                                    </div>
                                    {countries.map((ct, index) => {
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
                                                setShow(false)
                                            }}
                                            className='px-6 py-3 d-flex align-items-center justify-content-between'
                                            style={{ width: 300, background: hoverIndex === index ? '#F9F9F9' : '#ffffff' }}
                                        >
                                            <span className='fs-6 fw-semibold'>{ct.label}</span>
                                        </div>
                                    })}
                                </div>
                            ) : settings[0].selected ? (
                                <div onClick={(e) => e.stopPropagation()}>
                                    <div className='d-flex align-items-center position-relative px-6 py-3'>
                                        <KTIcon iconName='magnifier' className='fs-1 position-absolute ms-3' />
                                        <input
                                            type='text'
                                            style={{ width: '100%' }}
                                            data-kt-user-table-filter='search'
                                            className='form-control form-control-solid ps-12 py-2'
                                            placeholder='Search Page'
                                            value={searchPage}
                                            onChange={(e) => setSearchPage(e.target.value)}
                                        />
                                    </div>
                                    {pages.length > 0 ? pages.map((pg: any, index) => (
                                        <div
                                            key={index}
                                            onMouseEnter={() => { setHoverIndex(index) }}
                                            onMouseLeave={() => { setHoverIndex(null) }}
                                            onClick={(e) => {

                                            }}
                                            className='px-6 py-3 d-flex align-items-center justify-content-between'
                                            style={{ width: 200, background: hoverIndex === index ? '#F9F9F9' : '#ffffff' }}
                                        >
                                            <span className='fs-6 fw-semibold'>{pg.name}</span>
                                        </div>
                                    )) : (
                                        <div className='d-flex align-items-center justify-content-center pb-4'>
                                            <span>No Pages</span>
                                        </div>
                                    )}
                                </div>
                            ) : settings.map((st, index) => (
                                <div
                                    key={index}
                                    onMouseEnter={() => { setHoverIndex(index) }}
                                    onMouseLeave={() => { setHoverIndex(null) }}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        let _array = settings;
                                        _array.map((st, i) => { _array[i].selected = false })
                                        _array[index].selected = !settings[index].selected
                                        setSettings([..._array])
                                    }}
                                    className='px-6 py-3 d-flex align-items-center justify-content-between'
                                    style={{ width: 200, background: hoverIndex === index ? '#F9F9F9' : '#ffffff' }}
                                >
                                    <span className='fs-6 fw-semibold'>{st.name}</span>
                                    <IoIosArrowForward />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default LeftFilter

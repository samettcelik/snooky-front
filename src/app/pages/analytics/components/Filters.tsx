import { useEffect, useRef, useState } from "react"
import CustomDate from "./CustomDate"
import { IoIosArrowDown } from "react-icons/io"
import { FiRefreshCcw } from "react-icons/fi"

const Timezones = [
    { name: 'Daily', value: 'daily' },
    { name: 'Weekly', value: 'weekly' },
    { name: 'Monthly', value: 'monthly' },
]

function Filters() {
    const [activeTimeline, setActiveTimeline] = useState('daily')
    const [activeTime, setActiveTime] = useState('')
    const [show, setShow] = useState<boolean>(false)
    const [hoverIndex, setHoverIndex] = useState<number | null>(null)

    useEffect(() => {
        setActiveTime(activeTimeline === 'daily' ? '7d' : activeTimeline === 'weekly' ? '4w' : '3m')
    }, [activeTimeline])

    const wrapperRef = useRef(null);
    useOutsideClick(wrapperRef);

    function useOutsideClick(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setShow(false)
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    return (
        <div className="d-flex align-items-center gap-2">

            <span className='d-flex gap-2 fs-7 align-items-center text-gray-600'>
                <FiRefreshCcw />
                <span style={{ userSelect: 'none' }}>It refreshes every 5 minutes.</span>
            </span>
            <div
                ref={wrapperRef}
                onClick={(e) => {
                    e.preventDefault()
                    setShow(!show)
                }}
                className='position-relative bg-white border px-6 py-2 rounded d-flex align-items-center cursor-pointer'
                style={{
                    height: 38,
                    width: 150
                }}
            >
                <span className='fs-6'>{activeTimeline[0].toLocaleUpperCase() + activeTimeline.slice(1)}</span>
                <IoIosArrowDown style={{
                    position: 'absolute',
                    right: 10,
                    top: 10,
                    width: 18,
                    height: 18
                }} />
                {show && (
                    <div
                        className='bg-white rounded border shadow d-flex flex-md-row flex-column'
                        style={{
                            position: 'absolute',
                            width: 150,
                            right: 0,
                            top: 40,
                            zIndex: 200
                        }}
                    >
                        <div className='d-flex flex-column' style={{ width: 150 }}>
                            {Timezones.map((tz, index) => (
                                <div
                                    key={index}
                                    onMouseEnter={() => { setHoverIndex(index) }}
                                    onMouseLeave={() => { setHoverIndex(null) }}
                                    onClick={(e) => {
                                        setActiveTimeline(tz.value)
                                    }}
                                    className='px-6 py-3'
                                    style={{ width: 150, background: hoverIndex === index ? '#F9F9F9' : '#ffffff' }}
                                >
                                    <span className='fs-6 fw-semibold'>{tz.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <div className="d-flex align-items-center">
                {(activeTimeline === 'daily' || activeTimeline === 'custom') && (
                    <div className="d-flex align-items-center" style={{ height: 32 }}>
                        <div onClick={() => {
                            setActiveTime('7d')
                            setActiveTimeline('daily')
                        }} className={`bg-white border px-4 py-2 d-flex align-items-center cursor-pointer fw-semibold ${activeTime === '7d' && 'border-primary'}`} style={{ borderTopLeftRadius: 6, borderBottomLeftRadius: 6, height: 32 }}>
                            7d
                        </div>
                        <div style={{ height: 32 }} onClick={() => {
                            setActiveTime('30d')
                            setActiveTimeline('daily')
                        }} className={`bg-white border px-4 py-2 d-flex align-items-center cursor-pointer fw-semibold ${activeTime === '30d' && 'border-primary'}`}>
                            30d
                        </div>
                        <div style={{ height: 32 }} onClick={() => {
                            setActiveTime('60d')
                            setActiveTimeline('daily')
                        }} className={`bg-white border px-4 py-2 d-flex align-items-center cursor-pointer fw-semibold ${activeTime === '60d' && 'border-primary'}`}>
                            60d
                        </div>
                        <div style={{ height: 32 }} onClick={() => {
                            setActiveTime('90d')
                            setActiveTimeline('daily')
                        }} className={`bg-white border px-4 py-2 d-flex align-items-center cursor-pointer fw-semibold ${activeTime === '90d' && 'border-primary'}`}>
                            90d
                        </div>
                    </div>
                )}
                {activeTimeline === 'weekly' && (
                    <div className="d-flex align-items-center">
                        <div onClick={() => {
                            setActiveTime('4w')
                            setActiveTimeline('weekly')
                        }} className={`bg-white border px-4 py-2 d-flex align-items-center cursor-pointer fw-semibold ${activeTime === '4w' && 'border-primary'}`} style={{ borderTopLeftRadius: 6, borderBottomLeftRadius: 6, height: 32 }}>
                            4w
                        </div>
                        <div style={{ height: 32 }} onClick={() => {
                            setActiveTime('8w')
                            setActiveTimeline('weekly')
                        }} className={`bg-white border px-4 py-2 d-flex align-items-center cursor-pointer fw-semibold ${activeTime === '8w' && 'border-primary'}`}>
                            8w
                        </div>
                        <div style={{ height: 32 }} onClick={() => {
                            setActiveTime('12w')
                            setActiveTimeline('weekly')
                        }} className={`bg-white border px-4 py-2 d-flex align-items-center cursor-pointer fw-semibold ${activeTime === '12w' && 'border-primary'}`}>
                            12w
                        </div>
                        <div style={{ height: 32 }} onClick={() => {
                            setActiveTime('24w')
                            setActiveTimeline('weekly')
                        }} className={`bg-white border px-4 py-2 d-flex align-items-center cursor-pointer fw-semibold ${activeTime === '24w' && 'border-primary'}`}>
                            24w
                        </div>
                    </div>
                )}
                {activeTimeline === 'monthly' && (
                    <div className="d-flex align-items-center">
                        <div onClick={() => {
                            setActiveTime('3m')
                            setActiveTimeline('monthly')
                        }} className={`bg-white border px-4 py-2 d-flex align-items-center cursor-pointer fw-semibold ${activeTime === '3m' && 'border-primary'}`} style={{ borderTopLeftRadius: 6, borderBottomLeftRadius: 6, height: 32 }}>
                            3m
                        </div>
                        <div style={{ height: 32 }} onClick={() => {
                            setActiveTime('6m')
                            setActiveTimeline('monthly')
                        }} className={`bg-white border px-4 py-2 d-flex align-items-center cursor-pointer fw-semibold ${activeTime === '6m' && 'border-primary'}`}>
                            6m
                        </div>
                        <div style={{ height: 32 }} onClick={() => {
                            setActiveTime('12m')
                            setActiveTimeline('monthly')
                        }} className={`bg-white border px-4 py-2 d-flex align-items-center cursor-pointer fw-semibold ${activeTime === '12m' && 'border-primary'}`}>
                            12m
                        </div>
                    </div>
                )}
                <CustomDate activeTimeline={activeTimeline} setActiveTimeline={setActiveTimeline} />
            </div>
        </div>
    )
}

export default Filters

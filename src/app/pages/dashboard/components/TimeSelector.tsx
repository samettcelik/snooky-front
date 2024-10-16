import React, { useEffect, useRef, useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './style.css'
import moment from 'moment';

const Timezones = [
    "Today",
    "Last 7 Days",
    "Last 30 Days",
    "Last 90 Days",
]

function TimeSelector() {

    const [hoverIndex, setHoverIndex] = useState<number | null>(null)
    const [show, setShow] = useState<boolean>(false)
    const [showDate, setShowDate] = useState<boolean>(false)
    const [activeTimeline, setTimeline] = useState<string>('Today')
    const [startDate, setStartDate] = useState<any>()
    const [endDate, setEndDate] = useState<any>()



    const wrapperRef = useRef(null);
    useOutsideClick(wrapperRef);

    function useOutsideClick(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setShow(false)
                    setShowDate(false)
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    useEffect(() => {
        if (endDate && startDate) {
            setShowDate(false)
            setShow(false)
            setTimeline(`${moment(startDate).format('DD.MM.YYYY')} - ${moment(endDate).format('DD.MM.YYYY')}`)
        }
    }, [endDate, startDate])

    useEffect(() => {
        if (activeTimeline.indexOf('.') > 0) {
            setShowDate(true)
        }
    }, [show])

    return (
        <div
            ref={wrapperRef}
            onClick={(e) => {
                e.preventDefault()
                setShow(!show)
                setShowDate(false)
            }}
            className='position-relative bg-white border px-6 py-2 rounded d-flex align-items-center cursor-pointer'
            style={{
                height: 38,
                width: 230
            }}
        >
            <span className='fs-6'>{activeTimeline}</span>
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
                        width: showDate ? 460 : 230,
                        right: 0,
                        top: 40,
                        zIndex: 200
                    }}
                >
                    {showDate && (
                        <div
                            onClick={(e) => {
                                e.stopPropagation()
                            }}
                            style={{
                                width: 230,
                            }}
                            className='p-3 d-flex flex-column justify-content-center'
                        >
                            <label htmlFor="startDate" className='fw-semibold'>Start Date</label>
                            <DatePicker
                                id='startDate'
                                className="form-control form-control-lg form-control-solid"
                                selected={startDate ? startDate : new Date()}
                                onChange={(date) => setStartDate(date)}
                                showYearDropdown
                                defaultValue={new Date()}
                                dateFormat="dd/MM/yyyy"
                                yearDropdownItemNumber={15}
                                scrollableYearDropdown
                                timeIntervals={15}
                            />
                            <label htmlFor="endDate" className='fw-semibold mt-3'>End Date</label>
                            <DatePicker
                                id='endDate'
                                className="form-control form-control-lg form-control-solid"
                                selected={endDate ? endDate : new Date()}
                                onChange={(date) => setEndDate(date)}
                                max
                                showYearDropdown
                                dateFormat="dd/MM/yyyy"
                                yearDropdownItemNumber={15}
                                scrollableYearDropdown
                                timeIntervals={15}
                            />
                        </div>
                    )}
                    <div className='d-flex flex-column' style={{ width: 230 }}>
                        {Timezones.map((tz, index) => (
                            <div
                                key={index}
                                onMouseEnter={() => { setHoverIndex(index) }}
                                onMouseLeave={() => { setHoverIndex(null) }}
                                onClick={(e) => {
                                    setStartDate(null)
                                    setEndDate(null)
                                    setTimeline(tz)
                                    setShowDate(false)
                                }}
                                className='px-6 py-3'
                                style={{ width: 230, background: hoverIndex === index ? '#F9F9F9' : '#ffffff' }}
                            >
                                <span className='fs-6 fw-semibold'>{tz}</span>
                            </div>
                        ))}
                        <div
                            onMouseEnter={() => { setHoverIndex(4) }}
                            onMouseLeave={() => { setHoverIndex(null) }}
                            onClick={(e) => {
                                e.stopPropagation()
                                setShowDate(true)
                            }}
                            className='px-6 py-2'
                            style={{
                                background: hoverIndex === 4 ? '#F9F9F9' : '#ffffff',
                            }}
                        >
                            <span className='fs-6 fw-semibold'>Custom</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default TimeSelector

import { useEffect, useRef, useState } from "react"
import { IoIosArrowDown } from "react-icons/io"

const StatusSelect = ({ statusList, setStatusList }) => {
    const [hoverIndex, setHoverIndex] = useState(null)
    const [show, setShow] = useState(false)
    const [publishChacked, setPublishChacked] = useState(false)
    const [draftChacked, setDraftChacked] = useState(false)
    const [statusText, setStatusText] = useState('')
    const [activeStatusList, setActiveStatusList] = useState([])



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

    const selectStatus = (st) => {
        let _status = statusList
        let newArr = []
        _status.map(s => {
            if (s.name === st.name) {
                newArr.push({ name: s.name, value: !s.value })
            } else {
                newArr.push({ name: s.name, value: s.value })
            }
        })

        setStatusList([...newArr])
    }

    useEffect(() => {
        let sText = ''
        statusList.map((s, i) => {
            if (i !== 0 && s.value) {
                if (!sText) {
                    sText += s.name
                } else {
                    sText += ', ' + s.name
                }
            }
        })
        setStatusText(sText)
    }, [statusList])

    return (
        <div
            ref={wrapperRef}
            onClick={(e) => {
                e.preventDefault()
                setShow(!show)
            }}
            className='position-relative bg-white border ps-6 pe-10 py-2 d-flex align-items-center cursor-pointer'
            style={{
                height: 38,
            }}
        >
            <span className='fs-6'>{activeStatusList.length < 1 ? 'Status' : statusText}</span>
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
                        width: 200,
                        left: 0,
                        top: 40,
                        zIndex: 200
                    }}
                >
                    <div className='d-flex flex-column' style={{ width: 200 }}>
                        {statusList.map((status, index) => (
                            <div
                                key={index}
                                onMouseEnter={() => { setHoverIndex(index) }}
                                onMouseLeave={() => { setHoverIndex(null) }}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    selectStatus(status)
                                }}
                                className='px-6 py-3 d-flex align-items-center gap-2'
                                style={{ width: 200, background: hoverIndex === index ? '#F9F9F9' : '#ffffff' }}
                            >
                                <div className="container">
                                    <input
                                        className="custom"
                                        type='checkbox'
                                        id="button"
                                        checked={status.value}
                                    />
                                    <span class="checkmark"></span>
                                </div>
                                <span className='fs-6 fw-semibold'>{status.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default StatusSelect

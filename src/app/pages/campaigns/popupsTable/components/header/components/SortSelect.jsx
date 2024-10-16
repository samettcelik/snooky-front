import { useEffect, useRef, useState } from "react"
import { IoIosArrowDown } from "react-icons/io"

const SortSelect = () => {
    const [hoverIndex, setHoverIndex] = useState(null)
    const [show, setShow] = useState(false)
    const [sortOptions, setSortOptions] = useState([
        { name: 'Last Created', value: 'created', checked: true },
        { name: 'Last Edited', value: 'edited', checked: false },
        { name: 'High Revenue', value: 'revenue', checked: false },
        { name: 'High Saved Margin', value: 'margin', checked: false },
        { name: 'High Display', value: 'display', checked: false },
        { name: 'High CTR', value: 'ctr', checked: false },
        { name: 'Name A-Z', value: 'a-z', checked: false },
    ])
    const [activeSort, setActiveSort] = useState(sortOptions[0])

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
        <div
            ref={wrapperRef}
            onClick={(e) => {
                e.preventDefault()
                setShow(!show)
            }}
            className='position-relative bg-white border ps-6 pe-10 py-2 d-flex align-items-center cursor-pointer'
            style={{
                height: 38,
                borderRadius: 7
            }}
        >
            <span className='fs-6' style={{ userSelect: 'none' }}>{(activeSort && activeSort.name !== 'Last Created') ? activeSort.name : 'Sort'}</span>
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
                        width: 230,
                        left: 'auto',
                        right: 0,
                        top: 40,
                        zIndex: 200
                    }}
                >
                    <div className='d-flex flex-column' style={{ width: 230 }}>
                        {sortOptions.map((sort, index) => (
                            <div
                                key={index}
                                onMouseEnter={() => { setHoverIndex(index) }}
                                onMouseLeave={() => { setHoverIndex(null) }}
                                onClick={(e) => {
                                    setActiveSort(sort)
                                    let _new = []
                                    sortOptions.map(x => {
                                        _new.push({ ...x, checked: false })

                                    })

                                    _new[index].checked = true

                                    setSortOptions([..._new])
                                }}
                                className='px-6 py-3 d-flex align-items-center gap-2'
                                style={{ width: 230, background: hoverIndex === index ? '#F9F9F9' : '#ffffff' }}
                            >
                            <div className="container">
                                <input
                                    className="custom"
                                    type='checkbox'
                                    id="button"
                                    checked={sort.checked}
                                />
                                <span class="checkmark"></span>
                            </div>
                                <span className='fs-6 fw-semibold'>{sort.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default SortSelect

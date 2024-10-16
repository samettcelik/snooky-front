import { useEffect, useState } from "react"
import { KTIcon, useDebounce, initialQueryState } from "../../../../../../_metronic/helpers"
import { useQueryRequest } from "../../core/QueryRequestProvider"
import Select from "react-select";

const filterList = [
    { value: "", label: "All Status" },
    { value: "processing", label: "Processing" },
    { value: "active", label: "Active" },
    { value: "used", label: "Used" },
    { value: "expired", label: "Expired" },
    { value: "deactivated", label: "Deactivated" },
    { value: "invalid", label: "Invalid" },
];

function CouponListCategory() {
    const { updateState } = useQueryRequest()
    const [searchTerm, setSearchTerm] = useState<string>('')
    const debouncedSearchTerm = useDebounce(searchTerm, 150)

    const [selectedFilter, setSelectedFilter] = useState(filterList[0]);
    const changeSelectedFilter = (event) => {
        setSelectedFilter(event);
        setSearchTerm(event.value)
    };

    useEffect(
        () => {
            if (debouncedSearchTerm !== undefined && searchTerm !== undefined) {
                updateState({ search: debouncedSearchTerm, ...initialQueryState })
            }
        },
        [debouncedSearchTerm]
    )

    const customStyles = {
        control: (styles) => ({ ...styles, backgroundColor: '#F9F9F9', border: 0, color: '#99A1BE', fontWeight: '500', height: '43px' }),
        input: (styles) => ({ ...styles, color: '#99A1BE' }),
        placeholder: (styles) => ({ ...styles, color: '#99A1BE' }),
        singleValue: (styles) => ({ ...styles, color: '#99A1BE' }),
    }

    return (
        <div className="ms-4 w-200px" style={{ marginTop: -3 }}>
            <Select
                options={filterList}
                value={selectedFilter}
                onChange={changeSelectedFilter}
                placeholder="Domains"
                styles={customStyles}
                className="mt-4 form-control form-control-solid p-0"
            />
        </div>
    )
}

export default CouponListCategory

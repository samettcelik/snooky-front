import { OverlayTrigger, Tooltip } from 'react-bootstrap'

function CustomWebsites({ websites }: { websites: Array<string> }) {
    return (
        <div className='d-flex ms-6'>
            <OverlayTrigger
                placement="bottom"
                overlay={
                    <Tooltip id="tooltip-user-websites">
                        <div className='d-flex flex-column'>
                            {websites.map(url => <span className='' key={url}>{url}</span>)}
                        </div>
                    </Tooltip>
                }
            >
                <span className="symbol-label rounded-circle text-inverse-primary fw-bolder">
                    <i className="bi bi-info-circle-fill"></i>
                </span>
            </OverlayTrigger>
        </div>
    )
}

export default CustomWebsites

import { KTIcon } from "../../../../../../_metronic/helpers";
import { useAtom } from "jotai";
import { createCampaignAtom } from "../../../../../../store/jotai/CreateCampaignAtom";

const CampaignName = () => {
    const [createCampaignStates, setCreateCampaignStates] = useAtom(createCampaignAtom)
    const storeCollapseNum = createCampaignStates.collapseNum
    const storeCampaignName = createCampaignStates.campaignName

    const campaignNameChange = (e) => {
        setCreateCampaignStates({
            ...createCampaignStates,
            campaignName: { title: e }
        })
    }

    return (
        <div className="accordion-item mb-8 shadow">
            <h2 className="accordion-header" id="headingOne">
                <button
                    className="accordion-button fs-4 fw-bold"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                    onClick={() => setCreateCampaignStates({ ...createCampaignStates, collapseNum: 1 })}
                >
                    Campaign Name
                </button>
            </h2>
            <div
                id="collapseOne"
                className={`accordion-collapse collapse ${storeCollapseNum == "1" ? 'show' : ''}`}
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
            >
                <div className="accordion-body ">
                    <div className="row">
                        <div className="col-12 col-lg-6">
                            <label
                                htmlFor="campaignname"
                                className="form-label fs-7 fw-bolder mb-1"
                            >
                                Campaign name
                            </label>
                            <input
                                id="campaignname"
                                type="text"
                                className="form-control form-control-lg form-control-solid"
                                placeholder="Campaign name"
                                value={storeCampaignName.title}
                                onChange={(e) => campaignNameChange(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-end">
                    <button type="button" className="btn btn-sm btn-primary m-5" onClick={() => setCreateCampaignStates({ ...createCampaignStates, collapseNum: 2 })} id="headingTwo">Continue <KTIcon
                        iconName="arrow-right"
                        className="fs-3 ms-2 me-0"
                    /></button>
                </div>
            </div>
        </div>
    );
};

export { CampaignName };

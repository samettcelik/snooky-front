import React from "react";
import { Link } from "react-router-dom";

type Props = {};

const ActivePlan: React.FC<Props> = ({ }) => {
  return (
    <>
      <div className="card mb-10 h-xl-100 flex-row flex-stack flex-wrap p-9">
        <div className="flex-wrap border-dashed border-primary rounded border px-6 py-2 w-100">
          <div className="d-flex flex-column py-2">
            {/* <div className="d-flex align-items-center fs-5 fw-bold mb-5">
              Active plan
            </div> */}
            <div className="d-flex align-items-center justify-content-between w-100">
              <div className="d-flex gap-2">
                <h1 className="h1">Free Trial</h1>
                <div className="fs-6 mt-1">
                  - Free Trial ends in less than one day
                </div>
              </div>
              {/* EDİTLENECEK - plana göre değişecek ve en son planda contact butonu çıkacak */}
              <Link to={'/settings?tab=pricing'} className="btn btn-primary ms-6">Upgrade</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { ActivePlan };

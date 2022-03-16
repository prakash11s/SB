import React from "react";

const MoreServiceProfessional = () => {
  return (
    <>
      <div className="modal-body pt-3">
        <div className="pr_services_info">
          <h4 className="info-subtitle">
            Do you want to add more Service and Professionals?
          </h4>
        </div>
      </div>
      <div className="modal-footer justify-content-sm-end pt-3">
        <button type="button" className="btn cancel-btn">
          yes
        </button>
        <button type="submit" className="btn save-btn">
          No, thanks
        </button>
      </div>
    </>
  );
};

export default MoreServiceProfessional;

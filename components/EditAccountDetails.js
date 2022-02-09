import { useState, useReducer } from "react";

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};

function EditAccountDetails({handleSubmit}) {
  const [formData, setFormData] = useReducer(formReducer, {});
  const [submitting, setSumitting] = useState(false);

  const handleSubmitFinal = (event) => {
    event.preventDefault();
    setSumitting(true);
    // Make Call to submit data; 
    handleSubmit(formData); 

  };

  const handleChange = (event) => {
    const isCheckbox = event.target.type === "checkbox";
    setFormData({
      name: event.target.name,
      value: isCheckbox ? event.target.checked : event.target.value,
    });
  };

  return (
    <>
      <div className="">
        <form onSubmit={handleSubmitFinal}>
          <fieldset disabled={submitting}>
            <div className="form-group my-2 ">
              <input
                type="text"
                name="accountNo"
                id="accountNo"
                className="form-control"
                placeholder="Account No"
                onChange={handleChange}
                value={formData.accountNo || ""}
              />
            </div>

            <div className="form-group my-2 ">
              <input
                type="text"
                name="bank"
                id="bank"
                className="form-control"
                placeholder="Bank"
                onChange={handleChange}
                value={formData.bank || ""}
              />
            </div>

            <div className="form-group my-2 ">
              <input
                type="text"
                name="branch"
                id="branch"
                className="form-control"
                placeholder="Branch"
                onChange={handleChange}
                value={formData.branch || ""}
              />
            </div>

            <div className="form-group my-2 ">
              <input
                type="text"
                name="IFSC"
                id="IFSC"
                className="form-control"
                placeholder="IFSC"
                onChange={handleChange}
                value={formData.IFSC || ""}
              />
            </div>

            <div className="form-group my-2 ">
              <input
                type="text"
                name="holderName"
                id="holderName"
                className="form-control"
                placeholder="Holders Name"
                onChange={handleChange}
                value={formData.holderName || ""}
              />
            </div>
          </fieldset>

          <button
            className="btn btn-warning "
            type="submit"
            disabled={submitting}
          >
            Change Account Details
          </button>
        </form>
      </div>
    </>
  );
}

export default EditAccountDetails;

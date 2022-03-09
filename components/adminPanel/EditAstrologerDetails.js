import { useState, useReducer } from "react";

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};

function EditAstrologerDetails({handleSubmit, data}) {
  const [formData, setFormData] = useReducer(formReducer, {...data});
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
                name="firstName"
                id="firstName"
                className="form-control"
                placeholder="Enter First Name"
                onChange={handleChange}
                value={formData.firstName || ""}
              />
            </div>

            <div className="form-group my-2 ">
              <input
                type="text"
                name="secondName"
                id="secondName"
                className="form-control"
                placeholder="Enter second name"
                onChange={handleChange}
                value={formData.secondName || ""}
              />
            </div>

            <div className="form-group my-2 ">
              <input
                type="text"
                name="about"
                id="about"
                className="form-control"
                placeholder="Enter about astrologer"
                onChange={handleChange}
                value={formData.about || ""}
              />
            </div>
          </fieldset>

          <button
            className="btn btn-warning "
            type="submit"
            disabled={submitting}
          >
            Change Profile Details
          </button>
        </form>
      </div>
    </>
  );
}

export default EditAstrologerDetails;

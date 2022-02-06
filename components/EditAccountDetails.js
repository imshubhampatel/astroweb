import { useState, useReducer } from "react";

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};

function EditAccountDetails() {
  const [formData, setFormData] = useReducer(formReducer, {});
  const [submitting, setSumitting] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSumitting(true);

    setTimeout(() => {
      setSumitting(false);
    }, 3000);
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
      {submitting && (
        <div>
          SUbmitting Following data:
          <ul>
            {Object.entries(formData).map(([name, value]) => (
              <li key={name}>
                {name} : {value.toString()}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="" >

      

      <form onSubmit={handleSubmit}>
        <div className="form-group my-2 ">
          <input
            type="text"
            name="accountNo"
            id="accountNo"
            className="form-control"
            placeholder="Account No"
            onChange={handleChange}
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
          />
        </div>


        <div className="form-group my-2 ">
          <input
            type="text"
            name="ifsc"
            id="ifsc"
            className="form-control"
            placeholder="IFSC"
            onChange={handleChange}
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
          />
        </div>

        <button className="btn btn-warning " type="submit">Change Account Details</button>
      </form>
      </div>
    </>
  );
}

export default EditAccountDetails;

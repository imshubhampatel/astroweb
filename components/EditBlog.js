import { useState, useReducer } from "react";

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};

function EditBlog({handleSubmit, data}) {
  const [formData, setFormData] = useReducer(formReducer, {...data});
  const [submitting, setSumitting] = useState(false);

  const handleSubmitFinal = (event) => {
    event.preventDefault();
    setSumitting(true);
    // Make Call to submit data;
    // formData.photos = event.target.photos 
    handleSubmit(formData); 

  };

  const handleChange = (event) => {
    const isCheckbox = event.target.type === "checkbox";
    const isfile = event.target.type === "file";
    setFormData({
      name: event.target.name,
      value: isCheckbox ? event.target.checked : isfile ? event.target.files : event.target.value,
    });
  };

  return (
    <>
      <div className="">
        <form onSubmit={handleSubmitFinal}>
          <fieldset disabled={submitting}>
            <div className="form-group my-2 ">
                <label>Title</label>
              <input
                type="text"
                name="title"
                id="title"
                className="form-control"
                placeholder="Blog title"
                onChange={handleChange}
                value={formData.title || ""}
              />
            </div>
            <label>Description</label>

            <div className="form-group my-2 ">
              <textarea
                type="text"
                name="description"
                id="description"
                className="form-control"
                placeholder="description"
                onChange={handleChange}
                value={formData.description || ""}
              />
            </div>
            <label>Upload Images</label>
            <div className="form-group my-2 ">
              <input
                type="file"
                multiple
                name="photos"
                id="photos"
                className="form-control"
                placeholder="photos"
                onChange={handleChange}
              />
            </div>
          </fieldset>

          <button
            className="btn btn-warning "
            type="submit"
            disabled={submitting}
          >
              Save Blog
          </button>
        </form>
      </div>
    </>
  );
}

export default EditBlog;

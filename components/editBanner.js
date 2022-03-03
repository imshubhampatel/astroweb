import { useState, useReducer } from "react";
import Image from "next/image";
const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};

function EditBanner({handleSubmit, data ,removeBanner}) {
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
                <label>Banner</label>
              <input
                type="file"
                name="photos"
                id="photos"
                className="form-control"
                onChange={handleChange}
              />
            </div>
           
          </fieldset>

          <button
            className="btn btn-warning "
            type="submit"
            disabled={submitting}
          >
              Save Banner
          </button>
        </form>
        <hr/>
        
      </div>
      <div className="">
          <h5>Current Banners</h5>
      <div className="row">
          <>
      {data.map((e)=>{
          return <div className="card border-warning mb-3">
          <Image className="card-img-top" src={e.imageUrl} height={200} width={350}/>
          <div className="card-body">
            <h5 className="card-title">Banner</h5>
            <p className="card-text"><button className="btn btn-danger" onClick={()=>removeBanner(e.id)}> Remove </button></p>
          </div>
        </div>
      })}
                </>
            </div>      
      </div>
   
    </>
  );
}

export default EditBanner;

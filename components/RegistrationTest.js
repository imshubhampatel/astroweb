import formStyles from "../styles/components/RegistrationForm2.module.css";
import FireImage from "../components/FireImage";

export default function RegistrationTest(props) {

  return (
    <>
      <div className={`container ${formStyles.formContainer} `}>
        <h3 className={`${formStyles.mainHeading} mt-2 mt-sm-3 mt-md-5 `}>
          {" "}
          Please answer the following questions to complete registration.{" "}
        </h3>
        <form onSubmit={props.submitTestHandler}>

        <div className={`d-flex gap-3 flex-column my-5`}>
          {props.questions.map((e, indx) => {
            return (
              <div
                key={e.id}
                className="form-group border p-3 rounded shadow-sm   "
              >
                <label htmlFor={e.id} className="form-label">
                  <h5>
                    {" "}
                    Question {indx + 1}: {e.question}{" "}
                  </h5>
                </label>
                {e.imgUrl ? (
                  <div className="my-3" style={{ display: "block" }}>
                    <FireImage
                      src={e.imgUrl}
                      alt="Question Image"
                      layout="responsive"
                      width="600"
                      height="300"
                    />
                  </div>
                ) : (
                  ""
                )}

                <select
                  defaultValue="-1"
                  className="form-control"
                  id={e.id}
                  name={e.id}
                >
                  <option> Select Answer </option>
                  {Object.values(e.options).map((val, idx) => (
                    <option key={idx} value={val}>
                      {val}
                    </option>
                  ))}
                </select>

                <label htmlFor={"exp_" + e.id} className="form-label mt-3">
                  {" "}
                  Explain :
                </label>
                <input
                  className="form-control"
                  type="text"
                  id={"exp_" + e.id}
                  placeholder="please explain your choice !"
                ></input>
              </div>
            );
          })}
        </div>
        <button type="submit" className="btn btn-success"> Submit </button>
        </form>
      </div>
    </>
  );
}

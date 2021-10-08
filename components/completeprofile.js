import React,{useState} from 'react'

function Completeprofile() {
    const [FirstName, setFirstName] = useState("arpit")
    const [Expertise, setExpertise] = useState("grape");
    const [Experience, setExperience] = useState();
    const [Address, setAddress] = useState();
    const [SecondName, setSecondName] = useState();

    const handleSubmit = () => {

    }

    return (
      <div>
        {" "}
        <div class="row">
          <div class="col-2">
            {" "}
            <h1>Profile Information</h1>
          </div>
          <div class="col-10">
            <form onSubmit={handleSubmit}>
              <label>
                First Name
                <input
                  name="firstname"
                  type="text"
                  checked={FirstName}
                  onChange={(e) => {
                    () => setFirstName(e.target.value);
                  }}
                />
              </label>
              <label>
                <select
                  value={Expertise}
                  onChange={(e) => {
                    () => setExpertise(e.target.value);
                  }}
                >
                  <option value="grapefruit">Grapefruit</option>
                  <option value="lime">Lime</option>
                  <option value="coconut">Coconut</option>
                  <option value="mango">Mango</option>
                </select>
              </label>
              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
      </div>
    );
};

export default Completeprofile;

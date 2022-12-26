import axios from "axios";

export function initiateCall(contactValues) {
  console.log(contactValues);
  let data = JSON.stringify(contactValues);
  console.log(data);
  return new Promise(async (resolve, reject) => {
    var config = {
      method: "post",
      // url: "https://us-central1-astrochrchafirebase.cloudfunctions.net/webApi/api/make-call",
      url: "http://localhost:5001/astrochrchafirebase/us-central1/webApi/api/make-call",
      headers:{
        "content-type":"application/json"

      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
      });
  });
}

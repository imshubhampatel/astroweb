import axios from "axios";

export function initiateCall(contactValues) {
  console.log(contactValues);
  let data = JSON.stringify(contactValues);
  console.log(data);
  return new Promise(async (resolve, reject) => {
    var config = {
      method: "post",
      url: "https://us-central1-astrochrchafirebase.cloudfunctions.net/webApi/api/make-call",
      headers: {
        "x-api-key": '"6m9Ux0on1k1opZ1qyEZMr4cl29UfAPqK2rryZCZR"',
        Authorization: '"2209623c-769e-4c1d-9f16-e0736c4e964e"',
        "Content-Type": "x-www-form-urlencoded",
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

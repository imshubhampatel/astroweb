import axios from "axios";

export function initiateCall(contactValues) {
  console.log(contactValues);
  let data = JSON.stringify(contactValues);
  console.log(data);
  return new Promise(async (resolve, reject) => {
    var data = JSON.stringify({
      astrologerUid: "3JZZnHYkTdQjFUul9g1zqo5Ubh32",
      userUid: "2fYamkHQPcWa6B7UbbkFlW9fa6T2",
      customerNumber: "+918770491434",
      language: "Hindi",
      query: "this is my testing 2",
      dateOfBirth: "05/01/2003",
      timeOfBirth: "3:00PM",
      placeOfBirth: "Jamuniya",
      firstName: "shubham",
      lastName: "patel",
    });
    var config = {
      method: "post",
      url: "http://localhost:5001/astrochrchafirebase/us-central1/webApi/api/make-call",
      headers: {
        "x-api-key": '"6m9Ux0on1k1opZ1qyEZMr4cl29UfAPqK2rryZCZR"',
        Authorization: '"2209623c-769e-4c1d-9f16-e0736c4e964e"',
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error)
      });
  });
}

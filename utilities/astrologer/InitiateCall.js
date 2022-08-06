import axios from "axios";

export function initiateCall(contactValues) {
  return new Promise(async (resolve, reject) => {
    try {
      let config = {
        method: "post",
        url: "https://kpi.knowlarity.com/Basic/v1/account/call/makecall",
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_KNOWLARITY_SR_API_KEY,
          Authorization:
            process.env.NEXT_PUBLIC_KNOWLARITY_APPLICATION_ACCESS_KEY,
          "content-type": "application/json",
        },
        data: {
          customer_number: "+919548762721",
          agent_number: "+918273152153",
          k_number: process.env.NEXT_PUBLIC_KNOWLARITY_K_NUMBER,
          caller_id: process.env.NEXT_PUBLIC_KNOWLARITY_CALLER_ID,
          additional_params: { total_call_duration: 15 },
        },
      };
      let response = await axios(config);
      resolve(response.data);
    } catch (error) {
      reject(error.response.data || error.message.data || error.message);
      console.log(error);
    }
  });
}

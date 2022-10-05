const initializeRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";

    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };

    document.body.appendChild(script);
  });
};

export { initializeRazorpay };

// key_id,key_secret
// rzp_live_QaEASIQxdJzA0c,TnNBfoeBT2nJAs2lJdLEn8mR
// rzp_test_FuZPDTFdRxeNou,MezhnZ5AHkmOsBbK8iCd8TfH

// https://www.freecodecamp.org/news/integrate-a-payment-gateway-in-next-js-and-react-with-razorpay-and-tailwindcss/ important routes

//   const makePayment = async () => {
//     const res = await initializeRazorpay();

//     if (!res) {
//       alert("Razorpay SDK Failed to load");
//       return;
//     }

//     // Make API call to the serverless API
//     const data = await fetch("/api/razorpay", { method: "POST" }).then((t) =>
//       t.json()
//     );
//     console.log(data);
//     var options = {
//       key: process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
//       name: "Manu Arora Pvt Ltd",
//       currency: data.currency,
//       amount: data.amount,
//       order_id: data.id,
//       description: "Thankyou for your test donation",
//       image: "https://manuarora.in/logo.png",
//       handler: function (response) {
//         // Validate payment at server - using webhooks is a better idea.
//         alert(response.razorpay_payment_id);
//         alert(response.razorpay_order_id);
//         alert(response.razorpay_signature);
//       },
//       prefill: {
//         name: "Manu Arora",
//         email: "manuarorawork@gmail.com",
//         contact: "9999999999",
//       },
//     };

//     const paymentObject = new window.Razorpay(options);
//     paymentObject.open();
//   };

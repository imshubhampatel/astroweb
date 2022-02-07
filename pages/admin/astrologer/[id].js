import styles from "../../../styles/pages/admin/astrologer/[id].module.css";
import RatingBox from "../../../components/ratingBox";
import FireImage from "../../../components/FireImage";
import EditAccountDetails from "../../../components/EditAccountDetails";
import Link from "next/link";
import { MdOutlineMessage } from "react-icons/md";
import { FiPhoneCall, FiEdit } from "react-icons/fi";
import { BiVideoPlus } from "react-icons/bi";
import { BsWallet2 } from "react-icons/bs";
import { GiCash } from "react-icons/gi";
import { AiOutlinePercentage } from "react-icons/ai";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  collection,
  query,
  where,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  setDoc,
  deleteDoc,
  getFirestore,
} from "firebase/firestore";
import { firebase } from "../../../config";
import AdminLayout from "../../../components/adminPanel/layout";
import Review from "../../../components/adminPanel/Review";
import MeetingCard from "../../../components/adminPanel/meetingCard";
import TransactionCard from "../../../components/adminPanel/transactionCard";
import {
  isAstrologer,
  setAstrologerPerm,
  removeAstrologerPerm,
} from "../../../auth/utils";

import withAdminAuth from "../../../auth/withAdminAuth";
import {
  astrologerConverter,
  Astrologer,
  astrologerStatus,
} from "../../../dbObjects/Astrologer";
import {
  astrologerPrivateDataConverter,
  AstrologerPrivateData,
} from "../../../dbObjects/AstrologerPrivateInfo";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import Image from "next/image";
import { getFile } from "../../../utilities/utils";
import {
  getAllMeeting,
  getAllReviews,
  getAllWalletTransactions,
  getAppDetails,
  changePricingCategory,
} from "../../../utilities/astrologer/utils";
import { EmployeePermissions } from "../../../dbObjects/Employee";

const db = getFirestore(firebase);
const MySwal = withReactContent(Swal);
const storage = getStorage(firebase);

const astrologer = withAdminAuth(() => {
  // const astrologer = () => {
  const router = useRouter();
  const { pid } = router.query;
  const [astro, setastro] = useState({});
  const [enabled, setenabled] = useState(true);
  const [profilePicUrl, setprofilePicUrl] = useState(
    "/astrochrchaweb/public/astrochrchalogo.png"
  );
  const [reviews, setReviews] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [walletTransactions, setWalletTransactions] = useState([]);
  const [activeState, setActiveState] = useState(0);
  const [numPages, setNumPages] = useState(1);
  const [astrologerPrivateData, setAstrologerPrivateData] = useState({});
  const [pageNumber, setPageNumber] = useState(1);
  const [pdf, setPdf] = useState("/");
  const [remark, setRemark] = useState("");
  const [pricingList, setPricingList] = useState([]);
  const [selectedPricingCategory, setSelectedPricingCategory] = useState();

  // #################

  // Firebase handlers

  // ################
  async function getPrivateData(pid) {
    const astros = collection(db, "astrologer/" + pid + "/privateInfo/");
    const querySnapshot = await getDoc(
      doc(astros, String(pid)).withConverter(astrologerPrivateDataConverter)
    );
    return querySnapshot.data();
  }
  async function getAstrologerInfo(pid) {
    const astros = collection(db, "astrologer");
    const querySnapshot = await getDoc(doc(astros, String(pid)));
    if (querySnapshot.exists()) {
      let astro_temp = new Astrologer({
        id: querySnapshot.id,
        ...querySnapshot.data(),
      });
      setastro(astro_temp);
      setSelectedPricingCategory(astro_temp.pricingCategory);
      getPrivateData(pid).then((e) => {
        setAstrologerPrivateData(e);

        getFile(e?.certificationUrl).then((url) => {
          setPdf(url);
        });
      });
      getFile(querySnapshot.data().profilePic).then((url) =>
        setprofilePicUrl(url)
      );
    } else {
      // console.log("no")
    }
  }

  async function toggleEnable(uid) {
    var response;
    if (!enabled) {
      response = await setAstrologerPerm(uid);
    } else {
      response = await removeAstrologerPerm(uid);
    }
    // console.log(response);
    setenabled(!enabled);
  }
  async function updateAstrologer(uid) {
    const ref = doc(db, "astrologer", String(uid));
    await updateDoc(ref, { ...astro });
  }
  async function discardAstrologer(e) {
    e.preventDefault();
    const ref = doc(db, "astrologer", String(pid)).withConverter(
      astrologerConverter
    );
    let astro_temp = astro;
    astro_temp.status.state = astrologerStatus.REJECTED;
    astro_temp.status.remark = e.target.remark.value;
    setastro({ ...astro_temp });
    await updateDoc(ref, { ...astro_temp });
    Swal.clickConfirm();
  }
  async function VerifyAstrologer(uid) {
    const ref = doc(db, "astrologer", String(uid)).withConverter(
      astrologerConverter
    );
    let astro_temp = astro;
    astro_temp.status.state = astrologerStatus.VERIFIED;
    setastro({ ...astro_temp });
    await updateDoc(ref, { ...astro_temp });
  }
  const deleteReview = async (reviewId) => {
    const review = doc(
      db,
      "astrologer/" + String(pid) + "/astrologer_reviews/" + String(reviewId)
    );
    await deleteDoc(review);
  };

  const getDataForAstroLists = () => {
    switch (activeState) {
      case 1: {
        if (reviews.length == 0) {
          getAllReviews(pid)
            .then((reviews) => {
              setReviews(reviews);
            })
            .catch();
        }
        return reviews.map((e) => {
          return (
            <Review
              key={e.id}
              props={e.data}
              deleteReviewHandler={() => deleteReview(e.id)}
            ></Review>
          );
        });
      }
      case 2: {
        if (meetings.length == 0) {
          getAllMeeting(pid)
            .then((meetings) => {
              setMeetings(meetings);
            })
            .catch();
        }
        return meetings.map((e) => {
          return (
            <MeetingCard
              key={e.id}
              data={e.data}
              type="astrologer"
            ></MeetingCard>
          );
        });
      }
      case 3: {
        if (walletTransactions.length == 0) {
          getAllWalletTransactions(pid)
            .then((Transactions) => {
              setWalletTransactions(Transactions);
            })
            .catch();
        }
        return (
          <>
            <div className={`container my-3`}>
              <div className="row gap-1">
                <div className={`col ${styles.walletTransactionCard}`}>
                  <div className="row">
                    <div className="col-8">
                      <p>Total Earnings</p>
                      <div style={{ fontSize: "32px", color: "#896C06" }}>
                        {" "}
                        Rs. {astrologerPrivateData.earnings}
                      </div>
                    </div>
                    <div
                      className="col-4"
                      style={{ color: "#896C06", fontSize: "55px" }}
                    >
                      {" "}
                      <GiCash />
                    </div>
                  </div>
                </div>

                <div className={`col ${styles.walletTransactionCard}`}>
                  <div className="row">
                    <div className="col-8">
                      <p>Current Balance</p>
                      <div style={{ fontSize: "32px", color: "#896C06" }}>
                        {" "}
                        Rs. {astrologerPrivateData.walletBalance}
                      </div>
                    </div>
                    <div
                      className="col-4"
                      style={{ color: "#896C06", fontSize: "50px" }}
                    >
                      {" "}
                      <BsWallet2 />
                    </div>
                  </div>
                </div>

                <div className={`col ${styles.walletTransactionCard}`}>
                  <div className="row">
                    <div className="col-8">
                      <p>Commision</p>
                      <div style={{ fontSize: "32px", color: "#896C06" }}>
                        {" "}
                        40 %
                      </div>
                    </div>
                    <div
                      className="col-4"
                      style={{ color: "#896C06", fontSize: "50px" }}
                    >
                      {" "}
                      <AiOutlinePercentage />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {walletTransactions.map((e) => {
              return (
                <TransactionCard key={e.id} props={e.data}></TransactionCard>
              );
            })}
          </>
        );
      }
    }
  };
  // #################

  // #################

  // Popup Togle Functions

  // ################

  const moreDetailView = () => {
    MySwal.fire({
      width: "64rem",
      title: `Astrologer ${astro.firstName}`,
      html: (
        <>
          <div className={`contianer text-start `}>
            <h5>Contact Info</h5>
            <div>Email: {astro.email}</div>
            <div>Phone: {astrologerPrivateData.phoneNumber}</div>
            <div>
              Alternative Phone: {astrologerPrivateData.alternativePhoneNumber}
            </div>
            <h5 className={`my-2`}>Documents</h5>
            <br />
            <b>Aadhar card : </b>
            <div
              style={{
                // border: "1px solid red",
                // height: "800px",
                width: "100%",
                position: "relative",
                display: "block",
              }}
            >
              <FireImage
                src={astrologerPrivateData.verificationIdFront}
                // layout="responsive"
                // objectFit="contain"
                width="500"
                height="500"
              />
            </div>
            <br />
            <div
              style={{
                // border: "1px solid red",
                // height: "800px",
                width: "100%",
                position: "relative",
                display: "block",
              }}
            >
              <FireImage
                src={astrologerPrivateData.verificationIdBack}
                // layout="responsive"
                width="500"
                height="500"
              />
            </div>

            <br />
            <Link href={pdf}>
              <a target="_blank">Certification</a>
            </Link>
            <div className="my-4 d-flex flex-column gap-2">
              <h5>Account Info</h5>
              <div className="row ">
                <div className="col font-weight-bold"> Pan Card Number </div>
                <div className="col">
                  {" "}
                  {astrologerPrivateData.pancardNumber}{" "}
                </div>
              </div>

              <div className="row">
                <div className="col font-weight-bold"> Account Number </div>
                <div className="col">
                  {" "}
                  {astrologerPrivateData.accountInfo.accountNo}{" "}
                </div>
              </div>

              <div className="row">
                <div className="col font-weight-bold"> IFSC Code </div>
                <div className="col">
                  {" "}
                  {astrologerPrivateData.accountInfo.ISFC}{" "}
                </div>
              </div>

              <div className="row">
                <div className="col font-weight-bold"> Branch </div>
                <div className="col">
                  {" "}
                  {astrologerPrivateData.accountInfo.bank +
                    " " +
                    astrologerPrivateData.accountInfo.branch}{" "}
                </div>
              </div>

              <div className="row">
                <div className="col font-weight-bold">
                  {" "}
                  Account Holders Name{" "}
                </div>
                <div className="col">
                  {" "}
                  {astrologerPrivateData.accountInfo.holderName}{" "}
                </div>
              </div>
            </div>
          </div>
        </>
      ),
    });
  };

  const editPriceView = () => {
    MySwal.fire({
      showConfirmButton: false,
      html: (
        <>
          <div className={`container text-start`}>
            <h5>Edit Price</h5>
            <hr />

            {/* Prices input  */}
            <div className="row">
              <div className="col-4">
                <MdOutlineMessage /> Chat
                <div
                  className={` 
                  ${styles.editPriceInputFieldContainer} 
                    d-flex my-1 flex-row justify-content-center p-3`}
                >
                  ₹
                  <input
                    className={`text-center ${styles.editPriceInputField} `}
                    onChange={(e) => {
                      // Call function to update values hook kere
                      let astro_temp = astro;
                      astro_temp.priceChat = e.target.value;
                      setastro({ ...astro_temp });
                    }}
                    defaultValue={astro.priceChat}
                  />
                  / 5 min
                </div>
              </div>

              <div className="col-4 ">
                <FiPhoneCall /> Audio Call
                <div
                  className={` 
                    ${styles.editPriceInputFieldContainer} 
                    d-flex my-1 flex-row justify-content-center p-3`}
                >
                  ₹
                  <input
                    className={`text-center ${styles.editPriceInputField} `}
                    onChange={(e) => {
                      // Call function to update values hook kere
                      let astro_temp = astro;
                      astro_temp.priceVoice = e.target.value;
                      setastro({ ...astro_temp });
                    }}
                    defaultValue={astro.priceVoice}
                  />
                  / 5 min
                </div>
              </div>

              <div className="col-4">
                <BiVideoPlus /> Video Call
                <div
                  className={` 
                    ${styles.editPriceInputFieldContainer} 
                    d-flex my-1 flex-row justify-content-center p-3`}
                >
                  ₹
                  <input
                    className={`text-center ${styles.editPriceInputField} `}
                    onChange={(e) => {
                      // Call function to update values hook kere
                      let astro_temp = astro;
                      astro_temp.priceVideo = e.target.value;
                      setastro({ ...astro_temp });
                    }}
                    defaultValue={astro.priceVideo}
                  />
                  / 5 min
                </div>
              </div>
            </div>
          </div>
          {/* Save Button  */}
          <div className="text-end mt-4">
            <button
              className={`${styles.astroVerifyButton} ${styles.astroButton}`}
              onClick={() => {
                Swal.clickConfirm();
              }}
            >
              Save
            </button>
          </div>
        </>
      ),
      preConfirm: () => updateAstrologer(pid),
    });
  };
  const testResultView = async () => {
    const astros = collection(db, "astrologer");
    const querySnapshot = await getDoc(
      doc(astros, String(pid), "test_result", pid)
    );
    if (querySnapshot.exists()) {
      let data = querySnapshot.data();
      MySwal.fire({
        showConfirmButton: true,
        html: (
          <div className="container">
            <h4>Test Result </h4>
            <div className="row">
              <p>Score : {data.score}</p>
              <p>Question Count : {data.questionCount}</p>
            </div>

            <div className="row">
              {data?.response.map((e) => {
                return (
                  <div className="card mb-3" key={e.id}>
                    {e.imgUrl ? (
                      <>
                        <FireImage
                          src={e.imgUrl}
                          layout="responsive"
                          width="400"
                          height="200"
                        />
                      </>
                    ) : (
                      ""
                    )}
                    <div className="card-body">
                      <h5 className="card-title">Question</h5>
                      <p className="card-text"> {e.question}</p>
                      <p className="card-text">
                        <small className="text-muted">
                          Answer : {e.answer}
                        </small>
                      </p>
                      <p className="card-text">
                        <small className="text-muted">
                          Correct Answer : {e.options[e.correctOption]}
                        </small>
                      </p>
                      <p className="card-text">
                        <small className="text-muted">
                          Explanation : {e.explanation}
                        </small>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ),
      });
    } else {
      alert("Test Not Attempted");
    }
  };
  const discardRequestView = () => {
    MySwal.fire({
      showConfirmButton: false,
      html: (
        <div>
          <form onSubmit={discardAstrologer}>
            <textarea
              className="form-control"
              placeholder="Please tell more about the reason of discarding the request "
              name="remark"
              id="remark"
            />
            <div className="text-end mt-4">
              <button
                className={`${styles.astroVerifyButton} ${styles.astroButton}`}
                type="submit"
              >
                Discard Request
              </button>
            </div>
          </form>
        </div>
      ),
      preConfirm: () => {},
    });
  };
  const editPricingCategory = () => {
    MySwal.fire({
      showConfirmButton: false,
      html: (
        <div>
          <select
            name="name"
            id="name"
            className="btn btn-secondary dropdown-toggle"
            onChange={(e) => {
              setSelectedPricingCategory(e.target.value);
              setastro({ ...astro, pricingCategory: e.target.value });
              changePricingCategory(pid, e.target.value);
              alert(
                "Pricing Category Updated , Please reload page to refresh data !"
              );
            }}
            defaultValue={selectedPricingCategory}
          >
            {pricingList.map((e) => (
              <option key={e.name} value={e.name}>
                {" "}
                {e.name +
                  " chat :" +
                  e.priceChat +
                  " voice : " +
                  e.priceVoice +
                  " Video : " +
                  e.priceVideo}
              </option>
            ))}
          </select>
          <div className="text-end mt-4">
            <button
              className={`${styles.astroVerifyButton} ${styles.astroButton}`}
              onClick={() => {
                MySwal.clickConfirm();
              }}
            >
              Close
            </button>
          </div>
        </div>
      ),
      preConfirm: () => {},
    });
  };

  async function addRazorpayIdFunc(e) {
    e.preventDefault();
    const astros = doc(db, "astrologer/" + pid + "/privateInfo/" + pid);
    let astro_temp = astrologerPrivateData;
    astro_temp.razorpayId = e.target.razorpayId.value;
    setAstrologerPrivateData({ ...astro_temp });
    await updateDoc(astros, { ...astro_temp });
    MySwal.clickConfirm();
  }

  const editRazorpayId = () => {
    MySwal.fire({
      showConfirmButton: false,
      html: (
        <div>
          <form onSubmit={addRazorpayIdFunc}>
            <input
              type="text"
              className="form-control"
              placeholder="Please enter razorpay ID "
              name="reason-text"
              id="razorpayId"
              defaultValue={astrologerPrivateData.razorpayId}
            />
            <div className="text-end mt-4">
              <button
                className={`${styles.astroVerifyButton} ${styles.astroButton}`}
                type="submit"
              >
                Edit RazorpayId
              </button>
            </div>
          </form>

          <div className="my-3">
            <EditAccountDetails handleSubmit={() => MySwal.clickConfirm()} />
          </div>
        </div>
      ),
    });
  };

  // #################

  useEffect(() => {
    getAstrologerInfo(pid);
    getAppDetails().then((data) => setPricingList(data));
    if (pid)
      isAstrologer(pid).then((e) => {
        if (e) setenabled(true);
        else setenabled(false);
      });
  }, [pid]);

  return (
    <div className={` ${styles.base_container} `}>
      <div className={`${styles.main_container}`}>
        <h2 className={`${styles.headingText}`}>
          Astrologer Management System
        </h2>
        <div className={`${styles.mainInfoContainer}`}>
          <div className={`${styles.astroPhoto}`} style={{ display: "block" }}>
            <Image
              src={profilePicUrl}
              height="100"
              width="100"
              layout="responsive"
            />
          </div>

          <div className={`${styles.astroInfo}`}>
            <h4>Astrologer {astro.firstName}</h4>

            <div className={`d-flex `}>
              <div className={`me-2`}>
                {astro.dob
                  ? typeof astro.dob == "string"
                    ? astro.dob
                    : astro.dob.toDate().toDateString()
                  : ""}
              </div>

              <div className={`mx-2`}>{astro.email}</div>

              <div className={`ms-2`}>{astro.phoneNumber}</div>
            </div>
            <i> Razorpay Id : {astrologerPrivateData?.razorpayId}</i>
            <br />

            <i>
              {astro.expertise
                ? Object.keys(astro.expertise).map((e) => {
                    return astro.expertise[e] ? e + " " : "";
                  })
                : ""}{" "}
            </i>

            <br />

            <i> {astro.experience} Years of experience </i>

            <br />
            <i>
              {astro.languages
                ? Object.keys(astro.languages).map((e) => {
                    return astro.languages[e] ? e + " " : "";
                  })
                : ""}{" "}
            </i>
          </div>
          <div className={`${styles.subContainer}`}>
            {astro.status?.state != astrologerStatus.VERIFIED ? (
              <>
                <button
                  className={`${styles.astroVerifyButton} ${styles.astroButton}`}
                  onClick={() => VerifyAstrologer(pid)}
                >
                  {"Verify Astrologer"}
                </button>
                <button
                  className={`${styles.astroDiscardButton}  ${styles.astroButton}`}
                  onClick={discardRequestView}
                >
                  Discard Request
                </button>
                <button
                  className={`${styles.astroButton}`}
                  onClick={testResultView}
                >
                  {" "}
                  View Test Result
                </button>
              </>
            ) : (
              <>
                <button
                  className={"btn btn-primary"}
                  onClick={() => toggleEnable(pid)}
                >
                  Enabled : {enabled ? "   On  " : "  off   "}
                </button>
                <button
                  className={`${styles.astroDiscardButton}  ${styles.astroButton}`}
                  onClick={editPricingCategory}
                >
                  {astro.pricingCategory}
                </button>
              </>
            )}
          </div>
        </div>
        {/* About Container  */}
        <div className={`mt-3`}>
          <div className={`d-flex`}>
            <h5 className={`me-2`}>About {astro.firstName} </h5>
            <RatingBox rating={astro.rating} />
            <div
              className={`ms-auto  ${styles.textButton}`}
              onClick={() => editRazorpayId()}
            >
              Razorpay
            </div>
            <div
              className={`ms-auto  ${styles.textButton}`}
              onClick={() => moreDetailView()}
            >
              More Details
            </div>
          </div>

          <p>{astro.about}</p>
        </div>
        {/* Accomplishments Container  */}
        <div className={`row  justify-content-center`}>
          <div className="col-2  ">
            <h5> Accomplishments </h5>
          </div>

          <div className="col-2 border-end  text-center">
            <MdOutlineMessage /> {astro.chatSeconds} mins
          </div>

          <div className="col-2   text-center">
            <FiPhoneCall /> {astro.voiceSeconds} mins
          </div>

          <div className="col-2 border-start  text-center">
            <BiVideoPlus /> {astro.videoSeconds} mins
          </div>

          <div className="col  "></div>
        </div>
        {/* Pricing Container  */}
        <div className={`row  justify-content-center my-3`}>
          <div className="col-2  ">
            <h5> Price/ 5 minute </h5>
          </div>

          <div className="col-2  border-end text-center">
            <MdOutlineMessage /> ₹{astro.priceChat} /5 mins
          </div>

          <div className="col-2  text-center">
            <FiPhoneCall /> ₹{astro.priceVoice} /5 mins
          </div>

          <div className="col-2 border-start text-center">
            <BiVideoPlus /> ₹{astro.priceVideo} /5 mins
          </div>

          <div
            className={`col   text-end ${styles.textButton} `}
            onClick={() => editPriceView()}
          >
            <FiEdit />
            Edit Price
          </div>
        </div>
        <div className={`${styles.buttonContainer}`}>
          <button
            className={`${styles.yelloButton}   ${
              activeState == 1 ? styles.yelloButtonActive : ""
            } `}
            aria-current="page"
            onClick={() => setActiveState(1)}
          >
            Reviews
          </button>

          <button
            className={`${styles.yelloButton}   ${
              activeState == 2 ? styles.yelloButtonActive : ""
            }  `}
            onClick={() => setActiveState(2)}
          >
            Meeting History
          </button>

          <button
            className={`${styles.yelloButton}  ${
              activeState == 3 ? styles.yelloButtonActive : ""
            }   `}
            onClick={() => setActiveState(3)}
          >
            Wallet History
          </button>
        </div>
        <div className="my-3">{getDataForAstroLists()}</div>
      </div>
    </div>
  );
}, EmployeePermissions.ASTRO_MANAGEMENT);

astrologer.getLayout = function getLayout(page) {
  return <AdminLayout active_page="2">{page}</AdminLayout>;
};
export default astrologer;

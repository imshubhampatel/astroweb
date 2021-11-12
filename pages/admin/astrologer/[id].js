import styles from "../../../styles/pages/admin/astrologer/[id].module.css";
import RatingBox from "../../../components/ratingBox";

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
import { astrologerConverter, Astrologer ,astrologerStatus} from "../../../dbObjects/Astrologer";
import { astrologerPrivateDataConverter, AstrologerPrivateData } from "../../../dbObjects/AstrologerPrivateInfo";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import Image from 'next/image'

const db = getFirestore(firebase);
const MySwal = withReactContent(Swal);
const storage = getStorage(firebase, "gs://testastrochrcha.appspot.com");

// const astrologer = withAdminAuth(() => {

const astrologer = () => {
  const router = useRouter();
  const { pid } = router.query;
  const [astro, setastro] = useState({});
  const [enabled, setenabled] = useState(true);
  const [profilePicUrl,setprofilePicUrl] = useState("/astrochrchaweb/public/astrochrchalogo.png");
  const [reviews, setReviews] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [walletTransactions, setWalletTransactions] = useState([]);
  const [activeState, setActiveState] = useState(0);
  const [numPages, setNumPages] = useState(1);
  const [astrologerPrivateData,setAstrologerPrivateData] = useState({});
  const [pageNumber, setPageNumber] = useState(1);
  const [pdf,setPdf] = useState("");
  const [remark, setRemark] = useState("")

  async function getFile(path) {
    const storageRef = ref(storage, path);
    const url = await getDownloadURL(storageRef);
    return url;
  };
  // #################

  // Firebase handlers

  // ################
  async function getPrivateData(pid) {
    const astros = collection(db, "astrologer/"+pid+"/privateInfo/");
    const querySnapshot = await getDoc(
      doc(astros, String(pid)).withConverter(astrologerPrivateDataConverter)
    );
    return querySnapshot.data();
  }
  async function getAstrologerInfo(pid) {
    const astros = collection(db, "astrologer");
    const querySnapshot = await getDoc(
      doc(astros, String(pid))
    );
    if (querySnapshot.exists()) {
      let astro_temp = new Astrologer({id: querySnapshot.id,...querySnapshot.data()});
      setastro(astro_temp);
      getPrivateData(pid).then(e => setAstrologerPrivateData(e));
      getFile(querySnapshot.data().profilePic).then((url)=> setprofilePicUrl(url));
      getFile("18075072.pdf").then(url => setPdf(url));
    } else {
      // console.log("no")
    }
  }
  async function getAllReviews(uuid) {
    const astros = query(
      collection(db, "astrologer", uuid, "astrologer_reviews")
    );
    const querySnapshot = await getDocs(astros);
    let data = querySnapshot.docs.map((doc) => {
      return { id: doc.id, data: doc.data() };
    });
    setReviews(data);
    return data;
  }
  async function getAllMeeting(uuid) {
    const astros = collection(db, "meetings");
    const querySnapshot = await getDocs(
      query(astros, where("astrologer", "==", uuid))
    );
    let data = querySnapshot.docs.map((doc) => {
      return { id: doc.id, data: doc.data() };
    });
    setMeetings(data);
  }
  async function getAllWalletTransactions(uuid) {
    const astros = query(
      collection(db, "astrologer", uuid, "astrologer_wallet_transactions")
    );
    const querySnapshot = await getDocs(astros);
    let data = querySnapshot.docs.map((doc) => {
      return { id: doc.id, data: doc.data() };
    });
    setWalletTransactions(data);
    return data;
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
    await updateDoc(ref, {...astro});
  }
  async function discardAstrologer(uid) {
    const ref = doc(db, "astrologer", String(uid)).withConverter(
      astrologerConverter
    );
    let astro_temp = astro;
    astro_temp.status.state = astrologerStatus.REJECTED;
    astro_temp.status.remark = remark;
    setastro({ ...astro_temp});
    await updateDoc(ref, { ...astro_temp });
  }
  async function VerifyAstrologer(uid) {
    const ref = doc(db, "astrologer", String(uid)).withConverter(
      astrologerConverter
    );
    let astro_temp = astro;
    astro_temp.status.state = astrologerStatus.VERIFIED;
    setastro({ ...astro_temp});
    await updateDoc(ref, { ...astro_temp });
  }
  const deleteReview = async (reviewId) => {
    const review = doc(db, "astrologer/"+ String(pid)+'/astrologer_reviews/'+String(reviewId));
    await deleteDoc(review);
  }

  const getDataForAstroLists = () => {
    switch (activeState) {
      case 1: {
        if (reviews.length == 0) {
          getAllReviews(pid);
        }
        return reviews.map((e) => {
          return <Review key={e.id} props={e.data} deleteReviewHandler={()=>deleteReview(e.id)}></Review>;
        });
      }
      case 2: {
        if (meetings.length == 0) {
          getAllMeeting(pid);
        }
        return meetings.map((e) => {
          return <MeetingCard key={e.id} props={e.data}></MeetingCard>;
        });
      }
      case 3: {
        if (walletTransactions.length == 0) {
          getAllWalletTransactions(pid);
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
                        $10,1000
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
                        $10,1000
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
                        12%
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
      title: `Astrologer ${astro.firstName}`,
      html: (
        <>
          <div className={`contianer text-start `}>
            <h5>Contact Info</h5>
            <div>Email: {astro.email}</div>
            <div>Phone: {astro.phoneNumber}</div>
            <h5 className={`my-2`}>Documents</h5>
            @TODO <br />
            Show adhar, pan images
            {astrologerPrivateData.verificationIdFront}
            
            
            <div className="my-4 d-flex flex-column gap-2">
              <h5>Account Info</h5>
              <div className="row ">
                <div className="col font-weight-bold"> Pan Card Number </div>
                <div className="col"> {astrologerPrivateData.pancardNumber} </div>
              </div>

              <div className="row">
                <div className="col font-weight-bold"> Account Number </div>
                <div className="col"> {astrologerPrivateData.accountInfo.accountNo} </div>
              </div>

              <div className="row">
                <div className="col font-weight-bold"> IFSC Code </div>
                <div className="col"> {astrologerPrivateData.accountInfo.ISFC} </div>
              </div>

              <div className="row">
                <div className="col font-weight-bold"> Branch </div>
                <div className="col"> {astrologerPrivateData.accountInfo.bank + " " + astrologerPrivateData.accountInfo.branch} </div>

              </div>

              <div className="row">
                <div className="col font-weight-bold">
                  {" "}
                  Account Holder's Name{" "}
                </div>
                <div className="col"> {astrologerPrivateData.accountInfo.holderName} </div>
              </div>
            </div>
            {/* Bug in button, will fix later  */}
            {/* {astro.verified ? (
              ""
            ) : (
              <div className={`my-2`}>
                <button
                  className={`btn btn-warning`}
                  onClick={() => VerifyAstrologer(pid)}
                >
                  Verify Astrologer
                </button>
              </div>
            )} */}
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
                      setastro({...astro_temp});
                    }}
                    value={astro.priceChat}
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
                      setastro({...astro_temp});
                    }}
                    value={astro.priceVoice}
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
                      setastro({...astro_temp});
                    }}
                    value={astro.priceVideo}
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

  const discardRequestView = () => {
    MySwal.fire({
      showConfirmButton: false,
      html: <div>
      <textarea 
      className="form-control"
      placeholder="Please tell more about the reason of discarding the request "
      name="reason-text"
      onChange={e => {
        setRemark(e.target.value);
      }}      
      />
      <div className="text-end mt-4">
        <button
          className={`${styles.astroVerifyButton} ${styles.astroButton}`}
          onClick={() => {

            Swal.clickConfirm();
          }}
        >
          Discard Request
        </button>
      </div>
  </div>,
  preConfirm: () => {
    discardAstrologer(pid);
  }
    })
  };

  // #################

  useEffect(() => {
    getAstrologerInfo(pid);
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
          <div className={`${styles.astroPhoto}`}style={{display:"block"}}>
            <Image src={profilePicUrl} height="100" width="100" layout="responsive"/>
          </div>
         

          <div className={`${styles.astroInfo}`}>
            <h4>Astrologer {astro.firstName}</h4>

            <div className={`d-flex `}>
              <div className={`me-2`}>
                {astro.dob ? new Date(astro.dob).toDateString() : ""}
              </div>

              <div className={`mx-2`}>{astro.email}</div>

              <div className={`ms-2`}>{astro.phoneNumber}</div>
            </div>

            <i>Vedic, Tarot</i>

            <br />

            <i> {astro.experience} Years of experience </i>

            <br />

            <i>{astro.languages ? Object.keys(astro.languages) : ""} </i>
          </div>
          <div className={`${styles.subContainer}`}>
          { astro.status?.state != astrologerStatus.VERIFIED ? 
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
              {" "}
              Discard Request
            </button>
            </>
          :           
          <button
            className={"btn btn-primary"}
            onClick={() => toggleEnable(pid)}
          >
            Enabled : {enabled ? "   On  " : "  off   "}
          </button>}</div> 
          
        </div>

        {/* About Container  */}
        <div className={`mt-3`}>
          <div className={`d-flex`}>
            <h5 className={`me-2`}>About {astro.firstName} </h5>
            <RatingBox rating={astro.rating} />

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
};


// );


astrologer.getLayout = function getLayout(page) {
  return <AdminLayout active_page="2">{page}</AdminLayout>;
};
export default astrologer;

{
  /* <div className="container">
<div className="row">
  {astro ? (
    <div className="container">
      <div className="row">
        <table>
          <tbody>
            <tr>
              <td> {astro.firstName + " " + astro.secondName}</td>
              <td> {astro.phoneNumber}</td>
            </tr>
            <tr>
              <td> {astro.email}</td>
              <td> {astro.verified ? "Verified" : "Not Verified"}</td>
            </tr>
          </tbody>
        </table>
        <div>
          <button
            className={"btn btn-primary"}
            onClick={() => toggleEnable(pid)}
          >
            Enabled : {enabled ? "   On  " : "  off   "}
          </button>

          <button
            className={"btn btn-primary"}
            onClick={() => VerifyAstrologer(pid)}
          >
            Verified : {astro.verified ? "  Yes  " : "  Nope   "}
          </button>
        </div>
      </div>
    </div>
  ) : (
    "no user"
  )}
</div>

<br></br>
<hr></hr>

<div className="row">
  <div className="row">
    <ul className="nav nav-pills">
      <li className="nav-item">
        <button
          className={`nav-link ${activeState == 1 ? "active" : ""}`}
          aria-current="page"
          onClick={() => setActiveState(1)}
        >
          Reviews
        </button>
      </li>
      <li className="nav-item">
        <button
          className={`nav-link ${activeState == 2 ? "active" : ""}`}
          onClick={() => setActiveState(2)}
        >
          Meeting History
        </button>
      </li>
      <li className="nav-item">
        <button
          className={`nav-link ${activeState == 3 ? "active" : ""}`}
          onClick={() => setActiveState(3)}
        >
          Wallet History
        </button>
      </li>
    </ul>
  </div>
  <hr></hr>
  <div className="row">{getDataForAstroLists()}</div>
</div>
</div> */
}

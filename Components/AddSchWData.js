import axios from "axios";
import React, { useEffect, useState } from "react";
import TimePicker from "react-time-picker";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

const AddSchWData = (trainerId) => {
  const [timeStart, setTimeStart] = useState("00:00");
  const [timeEnd, setTimeEnd] = useState("00:00");
  const [location, setLocation] = useState();
  const [vehicleType, setVehicleType] = useState();
  const [clientName, setClientName] = useState();
  const [clientMobile, setClientMobile] = useState();
  const [comment, setComment] = useState();
  const [testTime, setTestTime] = useState();
  const [bookLocation, setBookLocation] = useState();
  const [bookVehicle, setBookvehicle] = useState();
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false);
  const [allTrainer, setAllTrainer] = useState();


  console.log(trainerId,"sch modal props")

  //errorMessage
  const [locationErr, setLocationErr] = useState(false);
  const [vehicleErr, setVehicleErr] = useState(false);
  const [nameErr, setNameErr] = useState(false);
  const [nameErr1, setNameErr1] = useState(false);
  const [nameErr2, setNameErr2] = useState(false);
  const [mobileErr, setMobileErr] = useState(false);
  const [mobileErr1, setMobileErr1] = useState(false);
  const [testTimeErr, setTestTimeErr] = useState(false);
  const [modal, setModal] = useState()

  const date = new Date(trainerId?.trainerId?.schDate);
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const formattedDate = `${year}-${month}-${day}`;

  var timeSlot = trainerId?.trainerId?.schTime;
  const timeSlote1 = timeSlot?.split(" ")[0];
  const router = useRouter();

  async function onlyTraining(data) {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("/api/onlyTraining", { token: token, data: data });
      const response = res.data;
      toast.success("Data added successfully");
      setTimeout(() => {
        //   router.push("/schedule")
        window.location.reload()
      }, [3000])

    }catch (err) {
      console.log(err);
      setLoading(false);
      setDisable(false);
      toast.error("Please try again.");
    }
  }

  async function trainingTest(data) {

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("/api/trainingTest", { token, data });
      const response = res.data;
      console.log("hello from addSchedule page response -->", response)
      toast.success("Data added successfully");
      setTimeout(() => {
        //   router.push("/schedule")
        window.location.reload()
      }, [3000])
    } catch (err) {
      console.log(err);
      setLoading(false);
      setDisable(false);
      toast.error("Please try again.");
    }
  }

  async function onlyTest(data) {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.post("/api/onlyTest", { token, data });
      const response = res.data;
      toast.success("Data added successfully");
      // setTimeout(() => {
      //   setModal("modal")
      //   router.push("/schedule")
      // }, [3000])
      setTimeout(() => {
        //   router.push("/schedule")
        window.location.reload()
      }, [3000])
    } catch (err) {
      console.log(err);
      setLoading(false);
      setDisable(false);
      toast.error("Please try again.");
    }
  }

  async function formSubmitFirst() {
    var regex = /^[a-zA-Z ]*$/;
    const phoneRegExp = /^(\d{3})[- ]?(\d{3})[- ]?(\d{4})$/;

    setLocationErr(false);
    if (!location) {
      setLocationErr(true);
      return;
    }
    setVehicleErr(false);
    if (!vehicleType) {
      setVehicleErr(true);
      return;
    }
    setNameErr(false);
    if (!clientName) {
      setNameErr(true);
      setNameErr1(false);
      setNameErr2(false);
      return;
    }
    setNameErr1(false);
    if (!regex.test(clientName)) {
      setNameErr1(true);
      setNameErr2(false);
      setNameErr(false);
      return;
    }
    setNameErr2(false);
    if (clientName.length <= 2 || clientName.length >= 20) {
      setNameErr2(true);
      setNameErr1(false);
      setNameErr(false);
      return;
    }
    setMobileErr(false);
    if (!clientMobile) {
      setMobileErr(true);
      setMobileErr1(false);
      return;
    }
    setMobileErr1(false);
    if (!phoneRegExp.test(clientMobile)) {
      setMobileErr1(true);
      return;
    }

    const data = {
      scheduleId: trainerId.trainerId.selectTrainer,
      timeSlot: timeSlote1,
      trainerId: trainerId.trainerId.trainerId,
      locationId: location,
      vehicleTypeId: vehicleType,
      clientName: clientName,
      clientMobileNo: clientMobile,
      dateSch: formattedDate,
      startTime: timeStart,
      endTime: timeEnd,
      comment: comment,
      clientId: trainerId.trainerId.clientId,
    };

    if (
      !locationErr &&
      !vehicleErr &&
      !nameErr &&
      !nameErr1 &&
      !nameErr2 &&
      !mobileErr &&
      !mobileErr1
    ) {
      setDisable(true)
      setLoading(true)
      onlyTraining(data);
    }
  }

  async function formSubmitSecond() {

    console.log("hello from training and test--->>>")
    var regex = /^[a-zA-Z ]*$/;
    const phoneRegExp = /^(\d{3})[- ]?(\d{3})[- ]?(\d{4})$/;

    setLocationErr(false);
    if (!location) {
      setLocationErr(true);
      return;
    }
    setVehicleErr(false);
    if (!vehicleType) {
      setVehicleErr(true);
      return;
    }
    setNameErr(false);
    if (!clientName) {
      setNameErr(true);
      setNameErr1(false);
      setNameErr2(false);
      return;
    }
    setNameErr1(false);
    if (!regex.test(clientName)) {
      setNameErr1(true);
      setNameErr2(false);
      setNameErr(false);
      return;
    }
    setNameErr2(false);
    if (clientName.length <= 2 || clientName.length >= 20) {
      setNameErr2(true);
      setNameErr1(false);
      setNameErr(false);
      return;
    }
    setMobileErr(false);
    if (!clientMobile) {
      setMobileErr(true);
      setMobileErr1(false);
      return;
    }
    setMobileErr1(false);
    if (!phoneRegExp.test(clientMobile)) {
      setMobileErr1(true);
      return;
    }
    setTestTimeErr(false);
    if (!testTime) {
      setTestTimeErr(true);
      return;
    }

    const data = {
      scheduleId: trainerId.trainerId.selectTrainer,
      timeSlot: timeSlote1,
      trainerId: trainerId.trainerId.trainerId,
      locationId: location,
      vehicleTypeId: vehicleType,
      testTime: testTime,
      clientName: clientName,
      clientMobileNo: clientMobile,
      dateSch: formattedDate,
      startTime: timeStart,
      endTime: timeEnd,
      comment: comment,
      clientId: trainerId.trainerId.clientId,
    };


    if (
      !locationErr &&
      !vehicleErr &&
      !nameErr &&
      !nameErr1 &&
      !nameErr2 &&
      !mobileErr &&
      !mobileErr1 &&
      !testTimeErr
    ) {
      console.log("hello from trainingTest function  here----");
      setDisable(true)
      setLoading(true)
      trainingTest(data);
    }
  }

  async function formSubmitThird() {
    var regex = /^[a-zA-Z ]*$/;
    const phoneRegExp = /^(\d{3})[- ]?(\d{3})[- ]?(\d{4})$/;


    setLocationErr(false);
    if (!location) {
      setLocationErr(true);
      return;
    }
    setVehicleErr(false);
    if (!vehicleType) {
      setVehicleErr(true);
      return;
    }
    setNameErr(false);
    if (!clientName) {
      setNameErr(true);
      setNameErr1(false);
      setNameErr2(false);
      return;
    }
    setNameErr1(false);
    if (!regex.test(clientName)) {
      setNameErr1(true);
      setNameErr2(false);
      setNameErr(false);
      return;
    }
    setNameErr2(false);
    if (clientName.length <= 2 || clientName.length >= 20) {
      setNameErr2(true);
      setNameErr1(false);
      setNameErr(false);
      return;
    }
    setMobileErr(false);
    if (!clientMobile) {
      setMobileErr(true);
      setMobileErr1(false);
      return;
    }
    setMobileErr1(false);
    if (!phoneRegExp.test(clientMobile)) {
      setMobileErr1(true);
      return;
    }

    const data = {
      scheduleId: trainerId.trainerId.selectTrainer,
      timeSlot: timeSlote1,
      trainerId: trainerId.trainerId.trainerId,
      locationId: location,
      vehicleTypeId: vehicleType,
      testTime: testTime,
      clientName: clientName,
      clientMobileNo: clientMobile,
      dateSch: formattedDate,
      comment: comment,
      clientId: trainerId.trainerId.clientId,
    };

    if (
      !locationErr &&
      !vehicleErr &&
      !nameErr &&
      !nameErr1 &&
      !nameErr2 &&
      !mobileErr &&
      !mobileErr1 &&
      !testTimeErr
    ) {
      setDisable(true)
      setLoading(true)
      onlyTest(data);
    }
  }

  async function getAllLocation() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("/api/location", { token: token });
      setBookLocation(response.data.data.data);
    } catch (error) {
      console.log("error:", error);
    }
  }

  async function getAllVehicle() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("/api/vehicalstype", { token: token });
      setBookvehicle(response.data.data.data);
    } catch (error) {
      console.log("error:", error);
    }
  }

  // async function getAllclient() {
  //   try {
  //     const token = localStorage.getItem("token");
  //     const response = await axios.post("/api/allClients", { token: token });
  //     setSelectClientName(response.data.data.data);
  //   } catch (error) {
  //     console.log("error:", error);
  //   }
  // }


  async function hideNameFunction() {
    setNameErr(false);
    setNameErr1(false);
    setNameErr2(false);
  }
  async function hideMobileFunction() {
    setMobileErr(false);
    setMobileErr1(false);
  }
  async function hideLocationFunction() {
    setLocationErr(false);
  }
  async function hideVehicleFunction() {
    setVehicleErr(false);
  }
  async function hideTestTimeFunction() {
    setTestTimeErr(false);
  }

  useEffect(() => {
    getAllLocation();
    getAllVehicle();
    // getAllclient()
    setLocation(trainerId?.trainerId?.location)
    setVehicleType(trainerId?.trainerId?.vehicleType)
    setClientName(trainerId?.trainerId?.clientName)
    setClientMobile(trainerId?.trainerId?.mobileNo)

  }, [trainerId]);

  async function getAllTrainer() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("/api/getAllTrainer", { token });
      setAllTrainer(response.data.data.data);
    } catch (error) {
      console.log("Error:", error);
    }
  }
  useEffect(() => {
    getAllTrainer()

  }, [])

  return (
    <>
      <ToastContainer />
      <div
        class="modal snd-modal"
        id="exampleModalToggle4"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel4"
        data-bs-dismiss={modal}
        // aria-label="Close"
        tabindex="-1"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalToggleLabel4">
                Add Schedule
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="sch-modal"
              ></button>
            </div>
            <div class="modal-body" id="snd-body">
              <div class="mainsnd-body">
                {trainerId?.trainerId?.selectTrainer == 3 ? (
                  ""
                ) : (
                  <div class="flex-snd">
                    <span>Trainer </span>
                    {allTrainer?.map((item) => {
                      if (item?.id == trainerId?.trainerId?.trainerId)
                        return (
                          <>

                            <small>{item?.trainerName}</small>
                          </>
                        )
                    })}
                  </div>
                )}

                <div class="flex-snd">
                  <span>Time Slot </span>
                  <small>{trainerId?.trainerId?.schTime} </small>
                </div>

                <div class="flex-snd">
                  <span>Date</span>
                  <small>{trainerId?.trainerId?.schDate} </small>
                </div>
              </div>

              <div class="snd-input-bottom">
                <div class="input-group " id="input-group">
                  {trainerId?.trainerId?.selectTrainer == 3 ? (
                    ""
                  ) : (
                    <>
                      <div class="snd-input-top">
                        <div class="input-group" id="input-group">
                          <div class="autoflexx mb-0">
                            <small>Time Start</small>
                            {/* <TimePicker
                              onChange={(e) => setTimeStart(e)}
                              value={timeStart}
                              format="h:mm a"
                              disableClock={true}
                              clearIcon={null}
                            /> */}
                            <input
                              type="time"
                              class="form-control"
                              placeholder="hh:mm"
                              // onClick={hideTestTimeFunction}
                              format="hh:mm"
                              // aria-label="Test Time"
                              // defaultValue={testTime}
                              onChange={(e) => setTimeStart(e.target.value)}
                            // min="01:00"
                            // max="12:00"

                            />
                          </div>

                          <span class="input-group-text">to</span>
                          <div class="autoflexx mb-0">
                            <small>Time End</small>
                            {/* <TimePicker
                              onChange={(e) => setTimeEnd(e)}
                              value={timeEnd}
                              format="h:mm a"
                              disableClock={true}
                              clearIcon={null}
                            /> */}
                            <input
                              type="time"
                              class="form-control"
                              placeholder="hh:mm"
                              // onClick={hideTestTimeFunction}
                              format="hh:mm"
                              // aria-label="Test Time"
                              // defaultValue={testTime}
                              onChange={(e) => setTimeEnd(e.target.value)}
                            // min="01:00"
                            // max="12:00"

                            />
                          </div>
                        </div>
                      </div>
                      <span class="input-group-text"></span>
                    </>
                  )}

                  {trainerId?.trainerId?.selectTrainer == 1 ? (
                    ""
                  ) : (
                    <div className="autoflexx" id="autoflexx">
                      <small>Select Location</small>

                      <select
                        class="form-select"
                        onClick={hideLocationFunction}
                        aria-label="Default select example"
                        onChange={(e) => setLocation(e.target.value)}
                      >
                        {/* <option value={item?.id}>{item?.place}</option> */}
                        <option value="" disabled>--Select--</option>
                        {bookLocation?.map((item) => {
                          return (
                            <option selected={item?.id == location} value={item?.id}> {item?.place}</option>
                          )
                        })}
                      </select>

                      {locationErr && (
                        <span className="input-error">
                          Location is required
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div class="snd-input-bottom">
                {trainerId?.trainerId?.selectTrainer == 1 ? (
                  (
                    (
                      <div class="input-group ">
                        <div class="autoflexx">
                          <small>Select Location</small>
                          <select
                            class="form-select"
                            onClick={hideLocationFunction}
                            aria-label="Default select example"
                            onChange={(e) => setLocation(e.target.value)}
                          >
                            <option value="" disabled>--Select--</option>{" "}
                            {bookLocation?.map((item) => {
                              return (
                                <option selected={item?.id == location} value={item?.id}> {item?.place}</option>
                              );
                            })}
                          </select>
                          {locationErr && (
                            <span className="input-error">
                              Location is required
                            </span>
                          )}
                        </div>
                        <span class="input-group-text"></span>
                        <div class="autoflexx">
                          <small>Select Vehicle Type</small>
                          <select
                            class="form-select"
                            onClick={hideVehicleFunction}
                            aria-label="Default select example"
                            onChange={(e) => setVehicleType(e.target.value)}
                          >
                            <option value="" disabled>--Select--</option>
                            {bookVehicle?.map((item) => {
                              return (
                                <option selected={item?.id == vehicleType} value={item?.id}> {item?.vehicleType}</option>
                              );
                            })}
                          </select>
                          {vehicleErr && (
                            <span className="input-error">
                              Vehicle type is required
                            </span>
                          )}
                        </div>
                      </div>
                    ))
                ) : (
                  <div class="input-group ">
                    <div class="autoflexx">
                      <small>Select Vehicle Type</small>
                      <select
                        class="form-select"
                        onClick={hideVehicleFunction}
                        aria-label="Default select example"
                        onChange={(e) => setVehicleType(e.target.value)}
                      >
                        <option value="" disabled>--Select--</option>{" "}
                        {bookVehicle?.map((item) => {
                          return (
                            <option selected={item?.id == vehicleType} value={item?.id}> {item?.vehicleType}</option>
                          );
                        })}
                      </select>
                      {vehicleErr && (
                        <span className="input-error">
                          Vehicle type is required
                        </span>
                      )}
                    </div>
                    <span class="input-group-text"></span>

                    {/* <div class="timepicker timepicker1" dir="ltr">
			<input type="text" class="hh N" min="0" max="23" placeholder="hh" maxlength="2" />:
			<input type="text" class="mm N" min="0" max="59" placeholder="mm" maxlength="2" />
		</div> */}

                    <div class="autoflexx">
                      <small>Test Time</small>
                      <input
                        type="time"
                        class="form-control"
                        placeholder="hh:mm"
                        onClick={hideTestTimeFunction}
                        format="hh:mm"
                        aria-label="Test Time"
                        defaultValue={testTime}
                        onChange={(e) => setTestTime(e.target.value)}
                      // min="01:00"
                      // max="12:00"

                      />
                      {testTimeErr && (
                        <span className="input-error">
                          Test time is required
                        </span>
                      )}
                    </div>
                  </div>
                )}
                <div class="input-group ">
                  <div class="autoflexx">
                    <small>Select Client Name</small>
                    <input
                      type="text"
                      class="form-control"
                      onClick={hideNameFunction}
                      aria-label="Default select example"
                      defaultValue={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                    />



                    {nameErr && (
                      <span className="input-error">
                        Client name is required
                      </span>
                    )}
                    {nameErr1 && (
                      <span className="input-error">
                        Client name should be alphabetical
                      </span>
                    )}
                    {nameErr2 && (
                      <span className="input-error">
                        Name should be greater than 2 or less than 20 character
                      </span>
                    )}
                  </div>

                  <span class="input-group-text"></span>
                  <div class="autoflexx">
                    <small>Client Mobile</small>

                    <input
                      type="number"
                      class="form-control"
                      placeholder=""
                      onClick={hideMobileFunction}
                      aria-label="Client Mobile"
                      defaultValue={clientMobile}
                      onChange={(e) => setClientMobile(e.target.value)}
                      maxLength={10}
                    />
                    {mobileErr && (
                      <span className="input-error">
                        Mobile number is required
                      </span>
                    )}
                    {mobileErr1 && (
                      <span className="input-error">
                        Mobile number is not valid
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div class="snd-input-end">
                <div class="input-group ">
                  <div class="autoflexx">
                    <small>Add Comment</small>
                    <div class="form-floating">
                      <textarea
                        class="form-control"
                        placeholder="Select"
                        id="floatingTextarea2"
                        style={{ height: "70px", padding: "10px" }}
                        defaultValue={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                {trainerId.trainerId.selectTrainer == 1 ? (
                  <button
                    class="btn btn-primary model-add"
                    onClick={() => formSubmitFirst()}
                    // disabled={loading}
                    disabled={disable}
                  >
                    {" "}
                    {loading ? "Loading..." : "Add"}
                  </button>
                ) : (
                  ""
                )}

                {trainerId.trainerId.selectTrainer == 2 ? (
                  <button
                    class="btn btn-primary model-add"
                    onClick={() => formSubmitSecond()}
                    // disabled={loading}
                    disabled={disable}
                  >
                    {" "}
                    {loading ? "Loading..." : "Add"}
                  </button>
                ) : (
                  ""
                )}

                {trainerId.trainerId.selectTrainer == 3 ? (
                  <button
                    class="btn btn-primary model-add"
                    onClick={() => formSubmitThird()}
                    // disabled={loading}
                    disabled={disable}
                  >
                    {" "}
                    {loading ? "Loading..." : "Add"}
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>

        {/* <!-- <button class="btn btn-primary" >Open first modal</button> --> */}
      </div>
    </>
  );
};

export default AddSchWData;

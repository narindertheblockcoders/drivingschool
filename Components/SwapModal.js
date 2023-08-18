import React from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import moment, * as moments from "moment";
import { DatePicker } from "rsuite";
import { format } from "date-fns";
import { swapModalSchema } from "./Utils/Schema";
import $ from "jquery";

const SwapModal = ({ show, setShow, swapDataId, schedualDataFn }) => {
  console.log(swapDataId, "swapDataId");
  const [booklocation, setBookLocation] = useState();
  const [vehicleType, setVehicleType] = useState();
  const [loading, setLoading] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [swapDataById, setSwapDataById] = useState(null);
  const [clientName, setClientName] = useState(null);
  const [clientMobileNo, setClientMobileNo] = useState(null);
  const [bookingRefNo, setBookingRefNo] = useState(null);
  const [locationId, setLocationId] = useState(null);
  const [vehicleTypeId, setVehicleTypeId] = useState();
  const [dateInputs, setDateInputs] = useState(null);
  const [dateValue, setDateValue] = useState(null);
  const [datee, setDatee] = useState();
  const [updatedDate, setUpdatedDate] = useState();
  // errors
  const [clientNameErr, setClientNameErr] = useState(false);
  const [clientMobileNoErr, setClietMobileNoErr] = useState(false);
  const [bookingRefNoErr, setBookingRefNoErr] = useState();
  const [locationIdErr, setLocationIdErr] = useState(false);
  const [vehicleTypeIdErr, setVehicleTypeIdErr] = useState(false);
  const [dateInputsErr, setDateInputsErr] = useState();
  const [allClient, setAllClient] = useState();
  const [clientId, setClientId] = useState();
  const [added, setAdded] = useState(0);
  // const [paymentBalance, setPaymentBalance] = useState();
  // const [totalAmount, setTotalAmount] = useState();
  // const [paidAmount, setPaidAmount] = useState();
  const [totalAmountErr, setTotalAmountErr] = useState(false);
  const [paidAmountErr, setPaidAmountErr] = useState(false);
  const [totalAmount, setTotalAmount] = useState();
  const [paidAmount, setPaidAmount] = useState();
  const [paymentBalance, setPaymentBalance] = useState(0);
  const [dateofPaymentErr, setDateofPaymentErr] = useState(false);
  const [dateofPayment, setDateofPayment] = useState();

  console.log(clientName, "client name here");

  useEffect(() => {
    if (Number(totalAmount) - Number(paidAmount) == 0) {
      setPaymentBalance(0);
    } else if (Number(totalAmount) == 0) {
      setPaymentBalance(0);
      setPaidAmount("");
    } else {
      setPaymentBalance(Number(totalAmount) - Number(paidAmount));
    }
  }, [paidAmount, totalAmount]);

  console.log(paymentBalance, "payment balance");

  const getSwapData = async (newData) => {
    try {
      console.log(newData, "new data here");
      const token = localStorage.getItem("token");
      const response = await axios.post("/api/swapBooking", {
        token: token,
        data: newData,
      });
      console.log("object response is here in swap modal-->", response);
      setLoading(false);
      toast.success("Swap successfully");
      // resetForm();
      // setDateInputs(null)
      setShow(false);
      schedualDataFn();
    } catch (error) {
      console.log("Error:::-->", error);
      toast.error(" Please try again");
    }
  };

  async function ModalSubmitFn() {
    console.log(dateofPayment, "total Amount");

    if (!clientName) {
      setClientNameErr(true);
    }
    setClietMobileNoErr(false);
    if (!clientMobileNo) {
      setClietMobileNoErr(true);
    }
    setBookingRefNoErr(false);
    if (!bookingRefNo) {
      setBookingRefNoErr(true);
    }
    setLocationIdErr(false);
    if (!locationId) {
      setLocationIdErr(true);
    }

    console.log(vehicleTypeId, "vehicle id");
    setVehicleTypeIdErr(false);
    if (!vehicleTypeId) {
      setVehicleTypeIdErr(true);
    }
    setDateInputsErr(false);
    if (!dateInputs) {
      console.log(dateInputs, "dateInputs");
      setDateInputsErr(true);
    }
    if (!dateofPayment) {
      setDateofPaymentErr(true);
    }

    setTotalAmountErr(false);

    if (!totalAmount) {
      setTotalAmountErr(true);
    }

    if (!paidAmount) {
      setPaidAmountErr(true);
      return;
    }
    const newData = {
      clientName: clientName,
      clientMobileNo: clientMobileNo,
      bookingRefNo: bookingRefNo,
      locationId: locationId,
      vehicleTypeId: vehicleTypeId,
      newDateOfBooking: dateInputs || dateValue,
      clientId: swapDataId,
      totalAmount: totalAmount,
      paidAmount: paidAmount,
      paymentBalance: paymentBalance,
      dateofPayment: dateofPayment,
    };
    console.log(newData, "newData");

    if (
      !clientNameErr &&
      !clientMobileNoErr &&
      !bookingRefNoErr &&
      !locationIdErr &&
      !vehicleTypeIdErr &&
      !dateInputsErr
    ) {
      getSwapData(newData);
    }
  }
  async function bookingLocation() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("/api/location", { token: token });
      setBookLocation(response.data.data.data);
    } catch (error) {
      console.log("Error:", error);
    }
  }
  async function vehicalBooking() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("/api/vehicalstype", { token });
      setVehicleType(response.data.data.data);
    } catch (error) {
      console.log("Error:", error);
    }
  }

  const handleChangedofBooking = (e) => {
    const options = {
      second: "2-digit",
      minute: "2-digit",
      hour: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    const date = new Intl.DateTimeFormat("en-US", options).format(e); // '12/02/2021'
    setDateInputs(date);
    const newww = date;

    const dateObj2 = new Date(newww);
    const options2 = { day: "2-digit", month: "short", year: "numeric" };
    const formattedDate2 = dateObj2.toLocaleDateString("en-GB", options2);
    setUpdatedDate(formattedDate2);
  };

  const getSwapDataById = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("/api/getSwapbookingById", {
        token: token,
        bookingId: swapDataId,
      });
      console.log(response.data.data.data.dateOfBooking, "Booking Date");
      setSwapDataById(response.data.data.data);
      setClietMobileNoErr(false);
      setClientName(response?.data?.data?.data?.clientName || null);
      setClietMobileNo(response?.data?.data?.data?.clientMobileNo || null);
      setBookingRefNo(response?.data?.data?.data?.bookingRefNo || null);
      setLocationId(response?.data?.data?.data?.locationId || null);
      setVehicleTypeId(response?.data?.data?.data?.vehicleTypeId || null);
      setDateInputs(response?.data?.data?.data?.dateInputs || null);
      setDateValue(response?.data?.data?.data?.dateOfBooking || null);

      const defaultDate = new Date(response?.data?.data?.data?.dateOfBooking);
      const formattedDate = defaultDate
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
      setDateValue(formattedDate);
    } catch (error) {
      console.log("Error:::-->", error);
    }
  };
  useEffect(() => {
    bookingLocation();
    vehicalBooking();
    getSwapDataById();
  }, [swapDataId]);

  // Mobile Number get by Api//
  async function getMobileNumber() {
    const mobileNo = allClient?.filter((item) => {
      if (item?.id == clientId) {
        return item?.clientMobileNo;
      }
    });
    if (mobileNo) {
      // setClientMobile(mobileNo[0]?.clientMobileNo)
      setClientMobileNo(mobileNo[0]?.clientMobileNo);
    }

    // setClientMobileNo(clientMobile)
  }
  useEffect(() => {
    getMobileNumber();
  }, [clientId]);
  // Mobile Number get by Api End//

  const handleChangedofPayment = (e) => {
    const options = {
      second: "2-digit",
      minute: "2-digit",
      hour: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    const date = new Intl.DateTimeFormat("en-US", options).format(e); // '12/02/2021'
    setDateofPayment(date);
  };

  useEffect(() => {
    const dateObj = new Date(dateValue);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    const formattedDate1 = dateObj.toLocaleDateString("en-GB", options);
    setDatee(formattedDate1);
  }, [dateValue]);

  async function getAllClientFn() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("/api/allClients", { token: token });
      setAllClient(response.data.data.data);
    } catch (error) {
      console.log("Error:", error);
    }
  }
  useEffect(() => {
    getAllClientFn();
  }, []);

  async function selectedClient(item) {
    const id = item?.split("-");
    setClientId(id[0]);
    setClientName(id[1]);

    // setClientId(id[0])
  }

  // For input feild click error hidden//

  async function clientNameErrFn() {
    setClientNameErr(false);
  }
  async function clientMobileNoErrFn() {
    setClietMobileNoErr(false);
  }
  async function bookingRefNoErrErrFn() {
    setBookingRefNoErr(false);
  }
  async function locationIdErrFn() {
    setLocationIdErr(false);
  }
  async function vehicleTypeIdErrFn() {
    setVehicleTypeIdErr(false);
  }
  async function dateInputErrFn() {
    setDateInputsErr(false);
  }
  async function DopErrFn() {
    setDateofPaymentErr(false);
  }
  async function DopDateErrFn() {
    setDateInputsErr(false);
  }

  async function totalAmountErrFn() {
    setTotalAmountErr(false);
  }
  async function paidAmountErrFn() {
    setPaidAmountErr(false);
  }

  console.log(clientMobileNo, "clientMobile name");

  useEffect(() => {
    if (!clientMobileNo) {
      setClietMobileNoErr(true);
    }
  }, []);

  // For input feild click error hidden End//

  // For input feild animation jquery//
  async function jqueryInputFunction() {
    $("input").focus(function () {
      $(this).parents(".form-group").addClass("focused");
    });

    $("input").blur(function () {
      var inputValue = $(this).val();
      if (inputValue == "") {
        $(this).removeClass("filled");
        $(this).parents(".form-group").removeClass("focused");
      } else {
        $(this).addClass("filled");
      }
    });
  }
  useEffect(() => {
    jqueryInputFunction();
  }, []);
  // For input feild animation jquery End//
  console.log(locationId, "tokeeeError");

  return (
    <div>
      <ToastContainer />
      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        className="swap-modal-head custom-modell"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Swap Booking
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Current Booking Date</h4>

          <span className="dateText">{updatedDate ? updatedDate : datee}</span>

          {/* <div> */}
          <div className="input-main">
            <div className="sclient-box">
              <div className="sclient-div mb-3 form-group focused">
                <div className="mb-3 booking-row" id="add-name-div">
                  <select
                    className="form-select select-clientname"
                    id="book-select"
                    name="clientId"
                    onChange={(e) => selectedClient(e.target.value)}
                    onClick={clientNameErrFn}
                  >
                    <option value="" disabled selected>
                      --Select Client Name--
                    </option>
                    {allClient?.map((item) => {
                      return (
                        <option value={`${item?.id}-${item?.clientName}`}>
                          {item.clientName}
                        </option>
                      );
                    })}
                  </select>
                  <button
                    type="button"
                    className="add-name-btn"
                    // onClick={addClientFn}
                  >
                    {" "}
                    +
                  </button>
                  {clientNameErr && (
                    <span className="input-error">Client name is required</span>
                  )}
                </div>
                {clientNameErr && (
                  <p className="input-error">Client name is required</p>
                )}
              </div>

              <div className="sclient-div mb-3 form-group focused">
                <label class="form-label " for="first">
                  Client Mobile No.
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="book-input"
                  maxLength="10"
                  // placeholder="Client Phone"
                  name="clientMobileNo"
                  onClick={clientMobileNoErrFn}
                  value={clientMobileNo}
                  onChange={(e) => setClientMobileNo(e.target.value)}
                />
                {clientMobileNoErr && (
                  <p className="input-error">Mobile number is required</p>
                )}
              </div>
            </div>

            <div className="sclient-box">
              <div className="sclient-div mb-3 form-group focused">
                <label class="form-label " for="first">
                  Booking Ref.no.
                </label>
                <input
                  type="text"
                  className="form-control input-group"
                  id="book-input"
                  // placeholder="Booking Ref.no."
                  name="bookingRefNo"
                  onClick={bookingRefNoErrErrFn}
                  value={bookingRefNo}
                  onChange={(e) => setBookingRefNo(e.target.value)}
                />
                {bookingRefNoErr && (
                  <p className="input-error">
                    Booking refrence number is required
                  </p>
                )}
              </div>

              <div className="sclient-div mb-3">
                <select
                  className="form-select"
                  id="book-select"
                  name="locationId"
                  onClick={locationIdErrFn}
                  onChange={(e) => setLocationId(e.target.value)}
                >
                  <option value="" selected disabled>
                    Select Location
                  </option>
                  {booklocation?.map((item, idx) => {
                    console.log(item?.id, "item id ehe");
                    return (
                      <option value={item.id} selected={item.id == locationId}>
                        {item.place}
                      </option>
                    );
                  })}
                </select>
                {locationIdErr && (
                  <p className="input-error">Location is required</p>
                )}
              </div>
            </div>

            <div className="sclient-box">
              <div
                className="sclient-div mb-3 "
                aria-label="Default select example"
              >
                <select
                  className="form-select"
                  id="book-select"
                  name="vehicleTypeId"
                  onClick={vehicleTypeIdErrFn}
                  onChange={(e) => setVehicleTypeId(e.target.value)}
                >
                  <option value="" selected disabled>
                    Select Vehicle Type
                  </option>
                  {vehicleType?.map((item, idx) => {
                    return (
                      <option
                        value={item.id}
                        selected={item.id == vehicleTypeId}
                      >
                        {item.vehicleType}
                      </option>
                    );
                  })}
                </select>
                {vehicleTypeIdErr && (
                  <p className="input-error">Vehicle type is required</p>
                )}
              </div>

              {/* <div className="sclient-div"> */}
              <div className="sclient-div mb-3 form-group focused">
                <label class="form-label " for="first">
                  Select Booking Date
                </label>
                <DatePicker
                  className="datePicker"
                  format="yyyy-MM-dd HH:mm:ss"
                  placeholder={dateValue}
                  style={{ width: 260 }}
                  // locale={{
                  //   sunday: 'Su',
                  //   monday: 'Mo',
                  //   tuesday: 'Tu',
                  //   wednesday: 'We',
                  //   thursday: 'Th',
                  //   friday: 'Fr',
                  //   saturday: 'Sa',
                  //   ok: 'OK',
                  //   today: 'Today',
                  //   yesterday: 'Yesterday',
                  //   hours: 'Hours',
                  //   minutes: 'Minutes',
                  //   seconds: 'Seconds'
                  // }}
                  // selected={dateValue}
                  // value={dateValue}
                  // onClick={dateInputErrFn}
                  onChange={(e) => handleChangedofBooking(e)}
                  onClick={DopDateErrFn}
                />

                {dateInputsErr && (
                  <p className="input-error">Booking date required</p>
                )}
              </div>
            </div>
            <div className="sclient-box">
              <div className="sclient-div mb-3 form-group focused">
                <label class="form-label " for="first">
                  Date of payment
                </label>
                <DatePicker
                  className="datePicker"
                  format="yyyy-MM-dd HH:mm:ss"
                  placeholder={dateValue}
                  style={{ width: 260 }}
                  // locale={{
                  //   sunday: 'Su',
                  //   monday: 'Mo',
                  //   tuesday: 'Tu',
                  //   wednesday: 'We',
                  //   thursday: 'Th',
                  //   friday: 'Fr',
                  //   saturday: 'Sa',
                  //   ok: 'OK',
                  //   today: 'Today',
                  //   yesterday: 'Yesterday',
                  //   hours: 'Hours',
                  //   minutes: 'Minutes',
                  //   seconds: 'Seconds'
                  // }}
                  // selected={dateValue}
                  // value={dateValue}
                  // onClick={dateInputErrFn}
                  onChange={(e) => handleChangedofPayment(e)}
                  onClick={DopErrFn}
                />
                {dateofPaymentErr && (
                  <span className="input-error">
                    Date of payment is required
                  </span>
                )}
              </div>
              <div className="sclient-div mb-3 form-group focused">
                <label class="form-label " for="first">
                  Total Amount
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="book-input"
                  name="totalAmount"
                  defaultValue={totalAmount}
                  onChange={(e) => setTotalAmount(e.target.value)}
                  min="0"
                  onClick={totalAmountErrFn}
                  // placeholder="Total Amount"
                />
                {totalAmountErr && (
                  <span className="input-error">Total amount is required</span>
                )}
              </div>
            </div>
            <div className="sclient-box">
              <div className="sclient-div mb-3 form-group focused">
                <label class="form-label " for="first">
                  Paid Amount
                </label>
                <input
                  type="text"
                  className="form-control input-group"
                  id="book-input"
                  // placeholder="Booking Ref.no."
                  name="bookingRefNo"
                  value={paidAmount}
                  onChange={(e) => setPaidAmount(e.target.value)}
                  onClick={paidAmountErrFn}
                />
                {paidAmountErr && (
                  <span className="input-error">Paid amount is required</span>
                )}
              </div>
              <div className="sclient-div mb-3 form-group focused">
                <label class="form-label " for="first">
                  Payment Balance
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="book-input"
                  name="paymentBalance"
                  min="0"
                  value={paymentBalance}
                  readonly="true"
                />
                {/* {bookingRefNoErr && (
                  <p className="input-error">
                    Booking refrence number is required
                  </p>
                )} */}
              </div>
            </div>

            <div className="custome-btn-div">
              <Button
                type="submit"
                className="mt-2"
                disabled={loading}
                onClick={ModalSubmitFn}
              >
                {loading ? "Loading..." : "Update"}
              </Button>
            </div>
          </div>
        </Modal.Body>
        {/* <Modal.Footer></Modal.Footer> */}
      </Modal>
    </div>
  );
};

export default SwapModal;

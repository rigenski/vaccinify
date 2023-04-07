import React, { useEffect, useState } from "react";
import api from "../services/api";
import { CardVaccination } from "./CardVaccination";

export const Vaccination = () => {
  const [firstVaccination, setFirstVaccination] = useState([]);
  const [secondVaccination, setSecondVaccination] = useState([]);
  const [spots, setSpots] = useState([]);
  const [spotDetail, setSpotDetail] = useState([]);
  const [dummyCount, setDummyCount] = useState([]);
  const [schedules, setSchedule] = useState([]);
  const [isAcceptConsultation, setIsAcceptConsultation] = useState(false);
  const [isAcceptVaccination, setIsAcceptVaccination] = useState(false);

  const [successSendVaccination, setSuccessSendVaccination] = useState(false);

  const [spot, setSpot] = useState("");
  const [date, setDate] = useState("");

  const getConsultations = () => {
    api
      .get("/api/v1/consultations")
      .then((res) => {
        res.data.consultations.map((item, index) => {
          if (item.status === "accepted") {
            setIsAcceptConsultation(true);
          }
        });
      })
      .catch((err) => {
        console.log("error: ", err.message);
      });
  };

  const getVaccinations = () => {
    api
      .get("/api/v1/vaccinations")
      .then((res) => {
        if (res.data.vaccinations.first !== null) {
          setFirstVaccination(res.data.vaccinations.first);
        }

        if (res.data.vaccinations.second !== null) {
          setSecondVaccination(res.data.vaccinations.second);
        }

        if (
          res.data.vaccinations.first == null ||
          (res.data.vaccinations.first.status == "vaccinated" &&
            res.data.vaccinations.second == null)
        ) {
          setIsAcceptVaccination(true);
        }
      })
      .catch((err) => {
        console.log("error: ", err.message);
      });
  };

  const getSpots = () => {
    api
      .get("/api/v1/spots")
      .then((res) => {
        setSpots(res.data.spots);
      })
      .catch((err) => {
        console.log("error: ", err.message);
      });
  };

  const getSpotDetail = () => {
    api
      .get("/api/v1/spots/" + spot)
      .then((res) => {
        setSpotDetail(res.data.spot);
      })
      .catch((err) => {
        console.log("error: ", err.message);
      });
  };

  const getSchedules = () => {
    api
      .get("/api/v1/schedules/" + spot)
      .then((res) => {
        setSchedule(res.data.schedules);
      })
      .catch((err) => {
        console.log("error: ", err.message);
      });
  };

  const handleStoreVaccination = (e) => {
    e.preventDefault();

    const data = {
      date: date,
      spot_id: spot,
    };

    api
      .post("/api/v1/vaccinations/store", data)
      .then((res) => {
        getVaccinations();
      })
      .catch((err) => {
        console.log("error: ", err.message);
      });
  };

  useEffect(() => {
    getConsultations();
    getVaccinations();
    getSpots();
  }, []);

  useEffect(() => {
    if (spot) {
      getSchedules();
      getSpotDetail();
    } else {
      setSchedule([]);
    }
  }, [spot]);

  useEffect(() => {
    if (spotDetail.length !== 0) {
      const total = spotDetail.capacity / 3;

      let z = 1;
      for (let x = 0; x < 3; x++) {
        const data = [];

        for (let i = 0; i < total; i++) {
          data.push(z);

          z += 1;
        }

        setDummyCount((arr) => [...arr, data]);
      }
    }
  }, [spotDetail]);

  if (isAcceptConsultation) {
    return (
      <>
        {successSendVaccination ? (
          <div className="col-4">
            <div className="alert alert-success py-2 mt-2">
              Request vaccination successful
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className="row mt-4">
          {isAcceptVaccination ? (
            <div className="col-12">
              <div className="card mb-4">
                <div className="card-header">
                  <b>Vaccination</b>
                </div>
                <div className="card-body">
                  <a
                    className="btn btn-primary"
                    data-bs-toggle="collapse"
                    href="#collapse-add-vaccination"
                    role="button"
                    aria-expanded="false"
                    aria-controls="collapse-add-vaccination"
                  >
                    + Register Vaccination
                  </a>
                  <div className="collapse mt-4" id="collapse-add-vaccination">
                    <h4>
                      {" "}
                      List Spot Vaccination in{" "}
                      {localStorage.getItem("regional")}
                    </h4>
                    <form
                      action="#"
                      method="post"
                      onSubmit={(e) => handleStoreVaccination(e)}
                    >
                      <div className="mb-2">
                        <label htmlFor="spot" className="form-label">
                          Spot
                        </label>
                        <select
                          className="form-select"
                          id="spot"
                          onChange={(e) => setSpot(e.target.value)}
                        >
                          <option value="">-- Select --</option>
                          {spots.map((item, index) => {
                            return (
                              <option value={item.id} key={index}>
                                Name: {item.name}, Address: {item.address},
                                Serve:{" "}
                                {item.serve === "1"
                                  ? "only first vaccination"
                                  : item.serve === "2"
                                  ? "only second vaccination"
                                  : "both"}
                                , Available Vaccine:{" "}
                                {item.available_vaccines.map(
                                  (vaccine, index) => {
                                    return Object.keys(vaccine) + ", ";
                                  }
                                )}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="mb-2">
                        <label htmlFor="date" className="form-label">
                          Date
                        </label>
                        <select
                          className="form-select"
                          id="date"
                          onChange={(e) => setDate(e.target.value)}
                        >
                          <option value="">-- Select --</option>
                          {schedules.map((item, index) => {
                            return (
                              <option value={item.date} key={index}>
                                {item.date}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="mb-2 mt-4">
                        <div className="row mx-0">
                          {date ? (
                            dummyCount.map((item, index) => {
                              return (
                                <div
                                  className="col-4 border rounded"
                                  key={index}
                                >
                                  <div className="d-flex justify-content-between pt-2">
                                    <h5>Session {index + 1}</h5>
                                    <h6>
                                      Session{" "}
                                      {index + 1 === 1
                                        ? "09.00 - 11.00"
                                        : index === 2 + 1
                                        ? "13.00 - 15.00"
                                        : "15.00 - 17.00 "}
                                    </h6>
                                  </div>
                                  <div className="row p-2">
                                    {item.map((num, index) => {
                                      return (
                                        <div
                                          className="col-4 px-1 mb-2"
                                          key={index}
                                        >
                                          {num == 2 ? (
                                            <div className="border border-success bg-primary p-1 text-white text-center">
                                              {num}
                                            </div>
                                          ) : num > 2 ? (
                                            <div className="border p-1 text-center">
                                              {num}
                                            </div>
                                          ) : (
                                            <div className="border border-success p-1 text-center">
                                              {num}
                                            </div>
                                          )}
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              );
                            })
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                      <button className="btn btn-primary w-100 mt-2">
                        Send
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
          {firstVaccination.length !== 0 ? (
            <CardVaccination item={firstVaccination} />
          ) : (
            <></>
          )}
          {secondVaccination.length !== 0 ? (
            <CardVaccination item={secondVaccination} />
          ) : (
            <></>
          )}
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="alert alert-danger py-2 mt-2">
          Your consultation must be approved by doctor to get the vaccine
        </div>
      </>
    );
  }
};

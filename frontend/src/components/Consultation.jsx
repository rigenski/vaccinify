import React, { useEffect, useState } from "react";
import api from "../services/api";
import { CardConsultation } from "./CardConsultation";

export const Consultation = () => {
  const [consultations, setConsultations] = useState([]);

  const [isAcceptConsultation, setIsAcceptConsultation] = useState(false);

  const [haveDiseaseHistory, setHaveDiseaseHistory] = useState(false);
  const [haveCurrentSymptoms, setHaveCurrentSymptoms] = useState(false);

  const [successSendConsultation, setSuccessSendConsultation] = useState(false);

  const [diseaseHistory, setDiseaseHistory] = useState("");
  const [currentSymptoms, setCurrentSymptoms] = useState("");

  const getConsultations = () => {
    api
      .get("/api/v1/consultations")
      .then((res) => {
        setConsultations(res.data.consultations);

        if (res.data.consultations.length !== 0) {
          if (
            res.data.consultations[res.data.consultations.length - 1].status ===
            "accepted"
          ) {
            setIsAcceptConsultation(true);
          }
        }
      })
      .catch((err) => {
        console.log("error: ", err.message);
      });
  };

  const handleStoreConsultation = (e) => {
    e.preventDefault();

    const data = {
      disease_history: diseaseHistory,
      current_symptoms: currentSymptoms,
    };

    api
      .post("/api/v1/consultations/store", data)
      .then((res) => {
        setSuccessSendConsultation(true);

        setDiseaseHistory("");
        setCurrentSymptoms("");

        getConsultations();
      })
      .catch((err) => {
        setDiseaseHistory("");
        setCurrentSymptoms("");

        console.log("error: ", err.message);
      });
  };

  useEffect(() => {
    getConsultations();
  }, []);

  return (
    <>
      <div className="row mt-4">
        {consultations.map((item, index) => {
          return <CardConsultation item={item} key={index} />;
        })}

        {isAcceptConsultation || consultations.length === 0 ? (
          <div className="col-4 pb-3">
            <div className="card">
              <div className="card-header">
                <b>Consultation</b>
              </div>
              <div className="card-body">
                <a
                  className="btn btn-primary"
                  data-bs-toggle="collapse"
                  href="#collapse-add-consultation"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapse-add-consultation"
                >
                  + Request Consultation
                </a>
                <div className="collapse mt-4" id="collapse-add-consultation">
                  <form
                    action="#"
                    method="post"
                    onSubmit={(e) => handleStoreConsultation(e)}
                  >
                    <div className="mb-2">
                      <label
                        htmlFor="have_deases_history"
                        className="form-label"
                      >
                        Do you have Disease History ?
                      </label>
                      <select
                        className="form-select"
                        id="have_deases_history"
                        onChange={(e) => setHaveDiseaseHistory(e.target.value)}
                      >
                        <option value="false">No</option>
                        <option value="Yes, I have">Yes</option>
                      </select>
                    </div>
                    {haveDiseaseHistory ? (
                      <div className="mb-2">
                        <label htmlFor="disease_history" className="form-label">
                          Disease History
                        </label>
                        <textarea
                          className="form-control"
                          id="disease_history"
                          onChange={(e) => setDiseaseHistory(e.target.value)}
                        >
                          {diseaseHistory}
                        </textarea>
                      </div>
                    ) : (
                      <></>
                    )}
                    <div className="mb-2">
                      <label
                        htmlFor="have_current_symtoms"
                        className="form-label"
                      >
                        Do you have Current Symtoms
                      </label>
                      <select
                        className="form-select"
                        id="have_current_symtoms"
                        onChange={(e) => setHaveCurrentSymptoms(e.target.value)}
                      >
                        <option value="false">No</option>
                        <option value="Yes, I have">Yes</option>
                      </select>
                    </div>
                    {haveCurrentSymptoms ? (
                      <div className="mb-2">
                        <label
                          htmlFor="current_symptoms"
                          className="form-label"
                        >
                          Current Symtoms
                        </label>
                        <textarea
                          className="form-control"
                          id="current_symptoms"
                          onChange={(e) => setCurrentSymptoms(e.target.value)}
                        >
                          {currentSymptoms}
                        </textarea>
                      </div>
                    ) : (
                      <></>
                    )}

                    <button className="btn btn-primary w-100 mt-2">Send</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
        {successSendConsultation ? (
          <div className="col-4">
            <div className="alert alert-success py-2 mt-2">
              Request consultation successful
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

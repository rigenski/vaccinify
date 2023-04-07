import React from "react";

export const CardConsultation = (props) => {
  return (
    <>
      <div className="col-4 pb-3" key={props.index}>
        <div className="card">
          <div className="card-header">
            <b>Consultation</b>
          </div>
          <div className="card-body p-0">
            <table className="table table-striped m-0">
              <tbody>
                <tr>
                  <td className="ps-3">
                    <b>Status</b>
                  </td>
                  <td className="pe-3">
                    <span className="badge bg-primary">
                      {props.item.status}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="ps-3">
                    <b>Disease History</b>
                  </td>
                  <td className="pe-3">
                    {props.item.disease_history
                      ? props.item.disease_history
                      : "-"}
                  </td>
                </tr>
                <tr>
                  <td className="ps-3">
                    <b>Current Symtoms</b>
                  </td>
                  <td className="pe-3">
                    {props.item.current_symptoms
                      ? props.item.current_symptoms
                      : "-"}
                  </td>
                </tr>
                <tr>
                  <td className="ps-3">
                    <b>Doctor Name</b>
                  </td>
                  <td className="pe-3">
                    {props.item.doctor ? props.item.doctor.name : "-"}
                  </td>
                </tr>
                <tr>
                  <td className="ps-3">
                    <b>Doctor Notes</b>
                  </td>
                  <td className="pe-3">
                    {props.item.doctor_notes ? props.item.doctor_notes : "-"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

import React, { useEffect } from "react";

export const CardVaccination = (props) => {
  useEffect(() => {
    console.log(props);
  }, []);
  return (
    <>
      <div className="col-4">
        <div className="card">
          <div className="card-header">
            <b>Vaccinations</b>
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
                    <b>Date</b>
                  </td>
                  <td className="pe-3">
                    {props.item.vaccination_date
                      ? props.item.vaccination_date
                      : "-"}
                  </td>
                </tr>
                <tr>
                  <td className="ps-3">
                    <b>Spot</b>
                  </td>
                  <td className="pe-3">
                    {props.item.schedule ? props.item.spot.name : "-"}
                  </td>
                </tr>
                <tr>
                  <td className="ps-3">
                    <b>Vaccine</b>
                  </td>
                  <td className="pe-3">
                    {props.item.vaccine ? props.item.vaccine.name : "-"}
                  </td>
                </tr>
                <tr>
                  <td className="ps-3">
                    <b>Vaccinator</b>
                  </td>
                  <td className="pe-3">
                    {props.item.vaccinator ? props.item.vaccinator.name : "-"}
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

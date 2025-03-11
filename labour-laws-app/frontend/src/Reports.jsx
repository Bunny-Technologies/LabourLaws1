import React from "react";

const Reports = () => {
  return (
    <div>
      <h2>Power BI Dashboard</h2>
      <iframe
        title="Power BI Dashboard"
        width="100%"
        height="600px"
        src="https://app.powerbi.com/view?r=b1798f52-cd3e-4c92-a47c-3231e8c4a351"
        frameBorder="0"
        allowFullScreen={true}
      ></iframe>
    </div>
  );
};

export default Reports;

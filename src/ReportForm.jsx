
import { useEffect, useState } from "react";

export default function ReportForm() {
  const [area, setArea] = useState("");
  const [issue, setIssue] = useState("Street light not working");
  const [description, setDescription] = useState("");
  const [reports, setReports] = useState(() => {
  const savedReports = localStorage.getItem("saferoute-reports");
  return savedReports ? JSON.parse(savedReports) : [];
});
useEffect(() => {
  localStorage.setItem("saferoute-reports", JSON.stringify(reports));
}, [reports]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!area.trim() || !description.trim()) {
      alert("Please fill all the fields.");
      return;
    }

    const newReport = {
      id: Date.now(),
      area,
      issue,
      description,
      status: "Pending verification"
    };

    setReports((previous) => [newReport, ...previous]);

    setArea("");
    setDescription("");
    setIssue("Street light not working");
  }

  return (
    <section className="report-section">
      <h2>Community Safety Reports</h2>
      <p>Help others by reporting safety concerns in your area.</p>

      <form className="report-form" onSubmit={handleSubmit}>
        <label>Area / Location</label>
        <input
          value={area}
          onChange={(e) => setArea(e.target.value)}
          placeholder="e.g. Dwarka Sector 12"
          required
        />

        <label>Type of concern</label>
        <select
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
        >
          <option>Street light not working</option>
          <option>Isolated or deserted area</option>
          <option>Harassment concern</option>
          <option>Low public activity</option>
          <option>Other safety concern</option>
        </select>

        <label>Describe the concern</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Tell us what you noticed..."
          rows="4"
          required
        />

        <button type="submit">Submit Report</button>
      </form>

      <div className="submitted-reports">
        <h3>Recent Community Reports</h3>

        {reports.length === 0 ? (
          <p>No reports submitted yet.</p>
        ) : (
          reports.map((report) => (
            <div className="report-card" key={report.id}>
              <h4>{report.issue}</h4>
              <p><strong>Area:</strong> {report.area}</p>
              <p>{report.description}</p>
              <small>{report.status}</small>
            </div>
          ))
        )}
      </div>

      <p className="report-disclaimer">
        Demo prototype: Reports are stored locally and are not independently verified.
      </p>
    </section>
  );
}

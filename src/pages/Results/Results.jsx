import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUser } from "../../utils/auth";
import { getDate } from "../../utils/date";
import { notifyError } from "../../utils/notifyToasts";
import "./Results.css";

const Results = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchResults() {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.REACT_APP_BASE_URL}/results/${getUser().email}`,
          {
            headers: {
              Authorization: `Bearer ${getUser().token}`,
              "Content-type": "application/json",
            },
          }
        );
        const data = await res.json();
        console.log(data);
        setResults(data.results);
      } catch (err) {
        console.log(err);
        notifyError("Failed to fetch past results");
      } finally {
        setLoading(false);
      }
    }

    fetchResults();
  }, []);

  return (
    <div>
      <Navbar />
      {loading ? (
        <h3 style={{ textAlign: "center", marginTop: "6rem" }}>Loading...</h3>
      ) : results.length ? (
        <>
          {results.map((item) => (
            <div key={item._id} className="results-container">
              <p>Category: {item.category}</p>
              <p>Score: {item.score}/100</p>
              <p>Date: {getDate(item.createdAt)}</p>
            </div>
          ))}
        </>
      ) : (
        <div
          style={{
            marginTop: "6rem",
            width: "100vw",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h3>You did not attempt any quiz yet</h3>
          <br />
          <br />
          <Link to="/">
            <button>Take a quiz</button>
          </Link>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Results;

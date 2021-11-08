import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { getUser } from "../../utils/auth";
import { getDate } from "../../utils/date";
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
      ) : (
        <>
          {results.map((item) => (
            <div>
              <p>Category: {item.category}</p>
              <p>Score: {item.score}/100</p>
              <p>Date: {getDate(item.createdAt)}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Results;

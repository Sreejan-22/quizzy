import { useState, useEffect } from "react";
import { getUser } from "../../utils/auth";
import "./Results.css";

const getDate = (dateString) => {
  const now = new Date(dateString);
  let day = now.getDate();
  day = day < 10 ? "0" + day : day;
  let month = now.getMonth() + 1;
  month = month < 10 ? "0" + month : month;
  const year = now.getFullYear();
  const date = `${day}/${month}/${year}`;

  return date;
};

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
      {loading ? (
        <h3 style={{ textAlign: "center" }}>Loading...</h3>
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

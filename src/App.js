import React, { useState, useEffect } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";

function App() {
   const [loading, setLoading] = useState(true);
   const [jobs, setJobs] = useState();
   const [value, setValue] = useState(0);

   const fetchJobs = async () => {
      const response = await fetch("data.json", {
         headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
         },
      });
      const newJobs = await response.json();
      setJobs(newJobs);
      setLoading(false);
   };
   useEffect(() => {
      fetchJobs();
   }, []);

   if (loading) {
      return (
         <section className="section loading">
            <h2>Loading...</h2>
         </section>
      );
   }
   const { company, title, duties, dates } = jobs[value];
   return (
      <section className="section">
         <div className="title">
            <h2>Experience</h2>
            <div className="underline"></div>
         </div>
         <div className="jobs-center">
            <div className="btn-container">
               {jobs.map((item, index) => (
                  <button
                     className={`job-btn ${index === value && "active-btn"}`}
                     onClick={() => setValue(index)}
                     key={item.id}
                  >
                     {item.company}
                  </button>
               ))}
            </div>
            <article className="job-info">
               <h3>{title}</h3>
               <h4>{company}</h4>
               <p className="job-date">{dates}</p>
               {duties.map((duty, index) => {
                  return (
                     <div className="job-desc" key={index}>
                        <FaAngleDoubleRight className="job-icon" />
                        <p>{duty}</p>
                     </div>
                  );
               })}
            </article>
         </div>
      </section>
   );
}

export default App;

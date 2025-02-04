import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/ExperimentView.css';

const ExperimentView = () => {
  const { courseId, experimentId } = useParams();
  const [experiment, setExperiment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExperiment();
  }, [courseId, experimentId]);

  const fetchExperiment = async () => {
    try {
      const response = await axios.get(`/api/experiments/${courseId}/${experimentId}`);
      setExperiment(response.data);
    } catch (error) {
      console.error('Error fetching experiment:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading experiment...</div>;
  }

  if (!experiment) {
    return <div className="error">Experiment not found</div>;
  }

  return (
    <div className="experiment-container">
      <h1>{experiment.title}</h1>
      
      <section className="experiment-section">
        <h2>Objective</h2>
        <p>{experiment.objective}</p>
      </section>

      <section className="experiment-section">
        <h2>Theory</h2>
        <div dangerouslySetInnerHTML={{ __html: experiment.theory }} />
      </section>

      <section className="experiment-section">
        <h2>Procedure</h2>
        <ol>
          {experiment.procedure.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="experiment-section">
        <h2>MATLAB Simulation</h2>
        <div className="matlab-container">
          <iframe
            src={experiment.matlabUrl}
            title="MATLAB Experiment"
            className="matlab-frame"
          />
        </div>
      </section>

      <section className="experiment-section">
        <h2>Results</h2>
        <div dangerouslySetInnerHTML={{ __html: experiment.results }} />
      </section>

      <section className="experiment-section">
        <h2>Discussion</h2>
        <p>{experiment.discussion}</p>
      </section>
    </div>
  );
};

export default ExperimentView; 
import React from "react";

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="w-full bg-yellow-100 py-16 px-6 flex items-center justify-center">
        <div className="max-w-3xl text-center">
          <h1 className="text-4xl font-bold text-yellow-600 mb-4">
            About Smart Fleet Guardian
          </h1>
          <p className="text-lg text-gray-700">
            Smart Fleet Guardian is designed to revolutionize fleet maintenance
            and reliability. We harness the power of real-time data and
            AI-driven analytics to detect issues early, optimize maintenance
            schedules, and reduce operational costs — all while boosting fleet
            performance.
          </p>
        </div>
      </div>

      <div className="w-full py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto grid gap-12 md:grid-cols-2">
          <div className="text-center px-4">
            <h2 className="text-2xl font-semibold text-yellow-600 mb-2">
              Our Mission
            </h2>
            <p className="text-gray-700">
              We aim to empower fleet managers with smart insights and
              predictive tools that transform vehicle maintenance from reactive
              to proactive — ensuring safety, efficiency, and sustainability.
            </p>
          </div>

          <div className="text-center px-4">
            <h2 className="text-2xl font-semibold text-yellow-600 mb-2">
              Technology Stack
            </h2>
            <p className="text-gray-700">
              Our system integrates FastAPI, PostgreSQL, and MongoDB for robust
              data processing and storage. We use TensorFlow/PyTorch for
              predictive analytics, and React with D3.js for an interactive
              dashboard experience.
            </p>
          </div>

          <div className="text-center px-4">
            <h2 className="text-2xl font-semibold text-yellow-600 mb-2">
              AI-Driven Decisions
            </h2>
            <p className="text-gray-700">
              With historical failure patterns and real-time telematics data,
              our platform predicts vehicle health trends — allowing for
              data-informed decisions before breakdowns occur.
            </p>
          </div>

          <div className="text-center px-4">
            <h2 className="text-2xl font-semibold text-yellow-600 mb-2">
              Sustainable Impact
            </h2>
            <p className="text-gray-700">
              By optimizing maintenance and reducing unexpected downtime, we
              help fleets conserve resources, lower emissions, and support a
              greener future in transportation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

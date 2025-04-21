import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <div className="w-full flex-1 bg-yellow-100 flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-yellow-600 mb-4">
              Welcome to Our Platform
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              A simple and secure way to get started.
            </p>
            <Link to="/Auth">
              <button className="bg-yellow-500 text-white px-6 py-3 rounded-xl hover:bg-yellow-600 transition cursor-pointer">
                Get Started
              </button>
            </Link>
          </div>
        </div>

        <div className="w-full bg-white py-16 px-6">
          <h2 className="text-3xl font-bold text-yellow-600 mb-4 text-center">
            Empowering Sustainable Solutions
          </h2>
          <p className="text-lg text-gray-700 mb-6 text-center">
            Our platform aims to provide innovative software solutions to help
            address global sustainability challenges. By harnessing the power of
            AI, we aim to make sustainability decisions more accessible,
            actionable, and impactful.
          </p>
          <div className="flex justify-center gap-8 mt-8">
            <div className="max-w-xs text-center">
              <h3 className="text-2xl font-semibold text-gray-800">
                AI-Driven Insights
              </h3>
              <p className="mt-2 text-gray-600">
                Utilize machine learning models to predict trends, analyze data,
                and make informed decisions for sustainability.
              </p>
            </div>
            <div className="max-w-xs text-center">
              <h3 className="text-2xl font-semibold text-gray-800">
                Real-World Impact
              </h3>
              <p className="mt-2 text-gray-600">
                We focus on creating real-world solutions that have measurable
                impacts on energy conservation, resource management, and
                environmental preservation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;

import { Link } from 'react-router-dom';

const MoreStatistics = () => {
  const stats = [
    {
      title: 'Tyre Pressure',
      value: '131.95 psi',
      route: '/MoreStatistics/tyre-pressure',
    },
    {
      title: 'Total Life',
      value: '648.99',
      route: '/MoreStatistics/total-life',
    },
    {
      title: 'Engine Temperature',
      value: '109.33°C',
      route: '/MoreStatistics/engine-temperature',
    },
    {
      title: 'Oil Level',
      value: 'Good',
      route: '/MoreStatistics/oil-level',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-yellow-50 to-yellow-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-10 text-center">
          Vehicle Statistics
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition duration-300 ease-in-out flex flex-col justify-between"
            >
              <div>
                <h2 className="text-2xl font-semibold text-yellow-600 mb-2">
                  {stat.title}
                </h2>
                <p className="text-4xl font-bold text-gray-800">{stat.value}</p>
              </div>
              <div className="mt-6">
                <Link
                  to={stat.route}
                  className="inline-block w-full text-center bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 rounded-xl transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoreStatistics;
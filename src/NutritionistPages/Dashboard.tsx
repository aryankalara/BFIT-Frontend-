
const Dashboard = () => {
  return (
    <div className="bg-black/50 rounded-lg p-6 text-white">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-red-900/50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Active Clients</h3>
          <p className="text-3xl font-bold">24</p>
        </div>
        <div className="bg-red-900/50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Diet Plans Created</h3>
          <p className="text-3xl font-bold">156</p>
        </div>
        <div className="bg-red-900/50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Success Rate</h3>
          <p className="text-3xl font-bold">92%</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
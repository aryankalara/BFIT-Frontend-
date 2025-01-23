import React, { useState, useEffect } from "react";
import { Trash2, Search, Eye } from "lucide-react";
import axios from "axios";

const NutritionistsPage = () => {
  const [nutritionists, setNutritionists] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch nutritionists from backend
  useEffect(() => {
    const fetchNutritionists = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:2025/nutritionist/viewallnutritionists");
        setNutritionists(response.data); // Assuming response data is an array of nutritionists
      } catch (error) {
        console.error("Error fetching nutritionists:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNutritionists();
  }, []);

  // Delete a nutritionist
  const handleDelete = async (email) => {
    try {
      await axios.delete(`http://localhost:2025/nutritionist/deletenutritionist?email=${email}`);
      setNutritionists(nutritionists.filter((n) => n.email !== email));
    } catch (error) {
      console.error("Error deleting nutritionist:", error);
    }
  };

  // Filtered nutritionists based on search term
  const filteredNutritionists = nutritionists.filter((nutritionist) =>
    nutritionist.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fetch profile image URL
  const getProfileImageUrl = (email) =>
    `http://localhost:2025/nutritionist/image?email=${encodeURIComponent(email)}`;

  return (
    <div className="p-8 text-black">
      <div className="flex justify-between items-center mb-6 text-black">
        <h1 className="text-2xl font-bold text-black">Nutritionists Management</h1>

        <div className="relative">
          <input
            type="text"
            placeholder="Search nutritionists..."
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profile</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredNutritionists.map((nutritionist) => (
                <tr key={nutritionist.email}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={getProfileImageUrl(nutritionist.email)}
                      alt={nutritionist.fullName}
                      className="w-10 h-10 rounded-full object-cover"
                      onError={(e) => (e.currentTarget.src = "/default-profile.jpg")} // Fallback image
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{nutritionist.fullName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{nutritionist.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      <button onClick={() => alert("View details")} className="text-blue-600 hover:text-blue-900">
                        <Eye size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(nutritionist.email)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default NutritionistsPage;

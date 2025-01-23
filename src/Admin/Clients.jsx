import axios from "axios";
import { useEffect, useState } from "react";
import "./Clients.css"; // Import the external CSS file

export default function Clients() {
  const [users, setUsers] = useState([]);

  // Fetch all users from the backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:2025/user/viewusers"); // Update with the correct backend URL
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error.message);
    }
  };

  // Handle user deletion
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:2025/user/deleteuser?id=${id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id)); // Update the state
      alert("User deleted successfully.");
    } catch (error) {
      console.error("Error deleting user:", error.message);
      alert("Failed to delete user. Please try again.");
    }
  };

  useEffect(() => {
    fetchUsers(); // Fetch users on component mount
  }, []);

  return (
    <div className="clients-container">
      <h3>View All Users</h3>
      <table className="clients-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Activity Level</th>
            <th>Goals</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="8">No users available.</td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.gender}</td>
                <td>{user.activity_level}</td>
                <td>{user.goals.join(", ")}</td>
                <td>{user.location}</td>
                <td>
                  <button onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

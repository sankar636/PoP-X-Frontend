import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";
import { FiCamera } from "react-icons/fi"; // camera icon

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const { user, setUser } = useContext(UserDataContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const baseURL = import.meta.env.VITE_BASE_URL;
        const res = await axios.get(`${baseURL}/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleLogout = async () => {
    try {
      const baseURL = import.meta.env.VITE_BASE_URL;
      const token = localStorage.getItem("token");

      await axios.post(
        `${baseURL}/user/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.removeItem("token");
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center  justify-center bg-white">
      <div className="w-full h-[90vh] max-w-md border border-gray-300 rounded shadow-sm bg-[#f9f9f9]">
        <div className="flex items-center justify-between px-6 py-4 border-b-1 border-gray-300 bg-white">
          <h2 className="font-medium text-lg text-gray-800">Account Settings</h2>
          <button
            onClick={handleLogout}
            className="py-1 px-3 bg-violet-600 text-white rounded-md text-sm hover:bg-violet-700"
          >
            Logout
          </button>
        </div>

        {loading ? (
          <p className="text-center py-8">Loading...</p>
        ) : (
          <div className="px-6 py-4">
            <div className="flex items-start gap-4">
              <div className="relative w-16 h-16">
                <img
                  src={`https://randomuser.me/api/portraits/men/${Math.floor(
                    Math.random() * 100
                  )}.jpg`}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover border"
                />
                <div className="absolute bottom-0 right-0 bg-violet-600 rounded-full p-1">
                  <FiCamera className="text-white text-xs" />
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="font-semibold text-sm text-gray-900">{user?.name || "Marry Doe"}</h3>
                <p className="text-xs text-gray-500">{user?.email || "marry@gmail.com"}</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-600 leading-relaxed">
              Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore Magna Aliquyam Erat, Sed Diam
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FloatingLabel from "../components/FloatingLabel.jsx";
import { UserDataContext } from "../context/UserContext.jsx";

const LoginPage = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const {user, setUser} = useContext(UserDataContext)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const validate = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!form.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!emailRegex.test(form.email)) {
            newErrors.email = "Invalid email";
        }

        if (!form.password.trim()) {
            newErrors.password = "Password is required";
        } else if (form.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        try {
            const baseURL = import.meta.env.VITE_BASE_URL;
            const response = await axios.post(`${baseURL}/user/login`, form, {
                headers: { "Content-Type": "application/json" },
            });

            const data = response.data.data;
            setUser(data.user)
            localStorage.setItem("token", data.token);
            navigate("/home");
        } catch (err) {
            if (err.response && err.response.data) {
                setErrors({ loginError: err.response.data.message || "Login failed" });
            } else {
                setErrors({ loginError: "Server error. Please try again." });
            }
        } finally {
            setLoading(false);
        }
    };

    const allFieldsFilled = form.email && form.password;

    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-[#f5f5f5] rounded-lg shadow-lg p-8 w-full max-w-md h-[90vh] border-1 border-gray-300"
            >
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Signin to your <br /> PopX account
                </h2>
                <p className="text-gray-500 text-sm mb-6">
                    Lorem ipsum dolor sit amet, <br /> consectetur adipiscing elit,
                </p>

                <FloatingLabel
                    label="Email Address"
                    name="email"
                    type="text"
                    form={form}
                    setForm={setForm}
                    errors={errors}
                />
                <FloatingLabel
                    label="Password"
                    name="password"
                    type="password"
                    form={form}
                    setForm={setForm}
                    errors={errors}
                />

                {errors.loginError && (
                    <p className="text-red-500 text-sm mb-4">{errors.loginError}</p>
                )}

                <button
                    type="submit"
                    className={`w-full mt-2 py-2 rounded font-semibold transition duration-200 ${
                        allFieldsFilled
                            ? "bg-purple-600 text-white hover:bg-purple-700"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                    disabled={!allFieldsFilled || loading}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
};

export default LoginPage;

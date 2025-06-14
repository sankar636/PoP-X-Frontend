import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import FloatingLabel from "../components/FloatingLabel.jsx";
import { UserDataContext } from "../context/UserContext.jsx";

const RegisterPage = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        phone: "",
        email: "",
        password: "",
        company: "",
        isAgency: "",
    });

    const { user, setUser } = useContext(UserDataContext)
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validate = () => {
        const newErrors = {};
        if (!form.name.trim()) newErrors.name = "Full Name is required";
        if (!form.phone.trim()) newErrors.phone = "Phone number is required";
        else if (!/^\d{10}$/.test(form.phone)) newErrors.phone = "Phone must be 10 digits";
        if (!form.email.trim()) newErrors.email = "Email is required";
        else if (!/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) newErrors.email = "Invalid email format";
        if (!form.password.trim()) newErrors.password = "Password is required";
        else if (form.password.length < 6) newErrors.password = "Password must be at least 6 characters";
        if (!form.company.trim()) newErrors.company = "Company name is required";
        if (!form.isAgency) newErrors.isAgency = "Please select if you are an agency";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setMessage("");
        if (!validate()) return;

        setLoading(true);
        const baseURL = import.meta.env.VITE_BASE_URL;
        try {
            const response = await axios.post(`${baseURL}/user/register`, form, {
                headers: { "Content-Type": "application/json" },
            });

            if (response.status === 200) {
                const data = response.data.data
                // console.log(data);
                setUser(data)
                localStorage.setItem('token', data.token)
                navigate('/home');
            }

            setMessage("✅ Account created successfully!");
            setForm({
                name: "",
                phone: "",
                email: "",
                password: "",
                company: "",
                isAgency: "",
            });
            setTimeout(() => navigate("/home"), 1000);
        } catch (error) {
            if (error.response && error.response.data) {
                setErrors({ general: error.response.data.message || "Registration failed" });
            } else {
                setErrors({ general: "Server error. Please try again later." });
            }
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-whitep-6">
            <form onSubmit={handleSubmit} className="bg-[#f9f9f9] p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Create your <br /> PopX account
                </h2>

                <FloatingLabel
                    label="Full Name"
                    name="name"
                    type="text"
                    form={form}
                    setForm={setForm}
                    errors={errors}
                />
                <FloatingLabel
                    label="Phone number"
                    name="phone"
                    type="text"
                    form={form}
                    setForm={setForm}
                    errors={errors}
                />
                <FloatingLabel
                    label="Email address"
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
                <FloatingLabel
                    label="Company name"
                    name="company"
                    type="text"
                    form={form}
                    setForm={setForm}
                    errors={errors}
                />

                <div className="mb-4">
                    <label className="block text-sm font-medium text-purple-600 mb-2">
                        Are you an Agency? <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center gap-6">
                        <label className="flex items-center space-x-2">
                            <input
                                type="radio"
                                name="isAgency"
                                value="yes"
                                checked={form.isAgency === "yes"}
                                onChange={handleChange}
                                className="accent-purple-600"
                            />
                            <span className="text-sm">Yes</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input
                                type="radio"
                                name="isAgency"
                                value="no"
                                checked={form.isAgency === "no"}
                                onChange={handleChange}
                                className="accent-purple-600"
                            />
                            <span className="text-sm">No</span>
                        </label>
                    </div>
                    {errors.isAgency && <p className="text-red-500 text-xs mt-1">{errors.isAgency}</p>}
                </div>

                {errors.general && <p className="text-red-500 text-sm mb-2">{errors.general}</p>}
                {message && <p className="text-green-600 text-sm mb-2">{message}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-purple-600 text-white py-2 mt-4 rounded-md hover:bg-purple-700 transition"
                >
                    {loading ? "Creating Account..." : "Create Account"}
                </button>
            </form>
        </div>
    );
};

export default RegisterPage;

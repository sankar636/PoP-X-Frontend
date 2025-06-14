import React from "react";

const FloatingLabel = ({ label, name, type, form, setForm, errors }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="relative mb-4">
            <label
                htmlFor={name}
                className="absolute -top-2 left-3 bg-white px-1 text-sm text-purple-600 font-medium"
            >
                {label} <span className="text-red-600">*</span>
            </label>
            <input
                id={name}
                type={type}
                name={name}
                value={form[name]}
                onChange={handleChange}
                placeholder={label}
                className="w-full px-4 py-2 mt-1 rounded-md border border-gray-300 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors[name] && (
                <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
            )}
        </div>
    );
};

export default FloatingLabel;

import { useState } from 'react';

const useUnicornForm = (initialValues = {}) => {
    const [formData, setFormData] = useState(initialValues);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (callback) => (e) => {
        e.preventDefault();
        callback(formData);
        setFormData(initialValues); // Reset form after submission
    };

    return {
        formData,
        handleInputChange,
        handleSubmit,
    };
};

export default useUnicornForm;
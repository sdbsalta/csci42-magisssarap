import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AddFoodItem = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        description: "",
        price: "",
        is_vegan: false,
        is_halal: false,
        calories: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Get the JWT token from localStorage
        const token = localStorage.getItem('access_token');

        try {
            const response = await fetch("http://127.0.0.1:8000/api/add-food-item/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`  // Include the JWT token
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            
            if (response.ok) {
                // Redirect to menu page after successful addition
                navigate('/menu/edit');
            } else {
                console.error("Error:", data);
            }
        } catch (error) {
            console.error("Error adding food item:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    return (
        <div className="min-h-screen bg-accent-20 p-5">
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center mb-6">Add New Menu Item</h1>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <input
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Price</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Calories</label>
                        <input
                            type="number"
                            name="calories"
                            value={formData.calories}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                        />
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="is_vegan"
                                checked={formData.is_vegan}
                                onChange={handleChange}
                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                            />
                            <label className="ml-2 block text-sm text-gray-700">Vegan</label>
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="is_halal"
                                checked={formData.is_halal}
                                onChange={handleChange}
                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                            />
                            <label className="ml-2 block text-sm text-gray-700">Halal</label>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={() => navigate('/menu/edit')}
                            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark"
                        >
                            Add Item
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddFoodItem; 
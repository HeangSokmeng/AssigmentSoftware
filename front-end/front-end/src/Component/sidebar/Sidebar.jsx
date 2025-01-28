import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../../ThemeContext'; // Import theme context

export const Sidebar = () => {
    const { theme } = useTheme(); // Get the current theme
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/web/category');
                const result = await response.json();

                if (result.error) {
                    setError(result.message || 'Failed to fetch categories');
                } else {
                    setCategories(result.data);
                }
            } catch (err) {
                setError('An error occurred while fetching data');
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    // Sidebar styles, including border for dark theme
    const sidebarClasses = `fixed top-0 left-0 w-64 shadow-lg h-screen p-6 ${
        theme === 'dark'
            ? 'bg-gray-800 text-gray-200 border border-gray-600'
            : 'bg-gradient-to-b to-white'
    }`;

    return (
        <aside className={sidebarClasses}>
            {/* Sidebar Header */}
            <h2 className="text-2xl font-bold mb-8 text-center">
                Home Page
            </h2>

            {/* Sidebar Categories */}
            <ul className="space-y-4 border-gray-50">
                {/* Dynamic Categories */}
                <li className="mt-6">
                    <h3 className="text-xl font-semibold">Categories</h3>
                    {loading ? (
                        <p className="text-gray-500 mt-2">Loading...</p>
                    ) : error ? (
                        <p className="text-red-500 mt-2">{error}</p>
                    ) : (
                        <ul className="mt-2 space-y-2">
                             {categories.map((category) => (
                                <li key={category.cate_id}>
                                    <NavLink
                                        to={`/category/${category.cate_id}`}
                                        className="flex items-center hover:text-yellow-600 transition-colors duration-200"
                                    >
                                        <span className="text-2xl mr-3">📚</span>
                                        <span className="font-medium">{category.cate_name}</span>
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    )}
                </li>
                <li className="mt-6">
                    <h3 className="text-xl font-semibold">Saved Document</h3>
                    <NavLink to="saved-documents">
                        <span className='text-2xl mr-3'>📝</span>
                        <span className="font-medium">Saved</span>
                    </NavLink>
                </li>
            </ul>
        </aside>
    );
};
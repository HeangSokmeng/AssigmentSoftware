import { Calendar, Download, FileText, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '../../ThemeContext';

const DocumentGrid = () => {
    const { theme } = useTheme();
    const { categoryId } = useParams(); // Use useParams to get categoryId from URL
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDocuments = async () => {
            if (!categoryId) {
                setError('No category ID provided');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const response = await fetch(`http://127.0.0.1:8000/api/web/doc/by/category/${categoryId}`);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();
                console.log("Response result: ", result);

                if (result.error) {
                    setError(result.message || 'Failed to fetch documents');
                } else {
                    setDocuments(result.data);
                }
            } catch (err) {
                setError(`An error occurred while fetching documents: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchDocuments();
    }, [categoryId]);

    if (loading) {
        return (
            <div className={`flex justify-center items-center h-screen w-full ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <p className={`text-xl ${theme === 'dark' ? 'text-gray-200' : 'text-gray-600'}`}>
                    Loading documents...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`flex justify-center items-center h-screen w-full ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <p className={`text-xl ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>
                    {error}
                </p>
            </div>
        );
    }

    return (
        <div className={`w-full p-6 ${theme === 'dark' ? 'bg-gray-900 ' : 'bg-white text-gray-800'}`} style={{ marginLeft: '270px', height:'500vh   ' }}>
            <h2 className="text-2xl font-bold mb-6">Documents</h2>
            <div className="w-full space-y-4">
                {documents.map((doc) => (
                    <div
                        key={doc.id}
                        className={`w-full flex flex-col sm:flex-row border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden ${theme === 'dark' ? 'bg-gray-800 white-100 border-gray-700' : 'bg-white text-black border-gray-300'}`}
                        onClick={() => navigate(`/documents/${doc.id}`)}
                    >
                        <div className="w-full sm:w-80 h-48 sm:h-60 flex-shrink-0">
                            <img
                                src={doc.doc_photo_url || '/api/placeholder/400/225'} // Use placeholder if no image
                                alt={doc.doc_name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="flex-1 p-6">
                            <div className="flex flex-col h-full">
                                <h3 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'white-100' : 'text-black'}`}>
                                    {doc.doc_name}
                                </h3>

                                <div className="space-y-3 flex-grow">
                                    <div className="flex items-center">
                                        <User size={18} className="mr-3" />
                                        <span className={`text-lg ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                                            {doc.author_name}
                                        </span>
                                    </div>

                                    <div className="flex items-center">
                                        <Calendar size={18} className="mr-3" />
                                        <span className={`text-lg ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                                            {doc.created_at}
                                        </span>
                                    </div>

                                    <div className="flex items-center">
                                        <FileText size={18} className="mr-3" />
                                        <span className={`text-lg ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                                            {doc.category_name}
                                        </span>
                                    </div>
                                </div>

                                {doc.doc_file_url && (
                                    <div className="mt-6 text-white">
                                        <a
                                            href={doc.doc_file_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`inline-flex items-center px-4 py-2 rounded-lg transition-colors duration-200 ${theme === 'dark' ? 'bg-blue-800 hover:bg-gray-600 white-100' : 'bg-blue-800 hover:bg-blue-900 white-100'}`}
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <Download size={18} className="mr-2" />
                                            Download Document
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DocumentGrid;
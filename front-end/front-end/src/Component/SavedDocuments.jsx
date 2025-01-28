import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Custom hook to manage saved documents
// eslint-disable-next-line react-refresh/only-export-components
export const useSavedDocuments = () => {
    const [savedDocs, setSavedDocs] = useState([]);

    useEffect(() => {
        const stored = localStorage.getItem('savedDocuments');
        if (stored) {
            setSavedDocs(JSON.parse(stored));
        }
    }, []);

    const saveDocument = (doc) => {
        setSavedDocs(prev => {
            const newSavedDocs = [...prev, { ...doc, savedAt: new Date().toISOString() }];
            localStorage.setItem('savedDocuments', JSON.stringify(newSavedDocs));
            return newSavedDocs;
        });
    };

    const removeDocument = (docId) => {
        setSavedDocs(prev => {
            const newSavedDocs = prev.filter(doc => doc.id !== docId);
            localStorage.setItem('savedDocuments', JSON.stringify(newSavedDocs));
            return newSavedDocs;
        });
    };

    const isDocumentSaved = (docId) => {
        return savedDocs.some(doc => doc.id === docId);
    };

    return {
        savedDocs,
        saveDocument,
        removeDocument,
        isDocumentSaved
    };
};

// SavedDocuments component
export const SavedDocuments = () => {
    const { savedDocs, removeDocument } = useSavedDocuments();

    return (
        <main className="flex-1 p-6 " style={{height:'500vh'}}>
            <div className="max-w-3xl mx-auto space-y-5">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Saved Documents</h2>
                    <Link to="/" className="text-blue-500 hover:text-blue-700">
                        Back to Home
                    </Link>
                </div>

                {savedDocs.length > 0 ? (
                    savedDocs.map(doc => (
                        <div key={doc.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-lg">{doc.doc_name}</h3>
                                    <p className="text-sm text-gray-500">
                                        Saved on: {new Date(doc.savedAt).toLocaleDateString()}
                                    </p>
                                    {doc.doc_title && (
                                        <p className="text-gray-600 mt-2">{doc.doc_title}</p>
                                    )}
                                </div>
                                <button
                                    onClick={() => removeDocument(doc.id)}
                                    className="text-red-500 hover:text-red-700 flex items-center space-x-1"
                                >
                                    <span>🗑️</span>
                                    <span>Remove</span>
                                </button>
                            </div>

                            {doc.doc_photo_url && (
                                <img
                                    src={doc.doc_photo_url}
                                    alt="Document"
                                    className="mt-4 rounded-lg w-full object-cover"
                                    style={{ maxHeight: '200px' }}
                                />
                            )}

                            {doc.doc_file_url && (
                                <div className="mt-4">
                                    <a
                                        href={doc.doc_file_url}
                                        download
                                        className="text-blue-500 hover:text-blue-700 flex items-center space-x-1"
                                    >
                                        <span>📥</span>
                                        <span>Download Document</span>
                                    </a>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="text-center text-gray-500 py-8">
                        <p className="text-lg">No saved documents yet.</p>
                        <Link to="/" className="text-blue-500 hover:text-blue-700 mt-2 inline-block">
                            Browse documents to save
                        </Link>
                    </div>
                )}
            </div>
        </main>
    );
};
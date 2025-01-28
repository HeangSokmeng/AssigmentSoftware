import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useTheme } from '../ThemeContext';
import { fetchDocuments } from '../services/apiService';
import { useSavedDocuments } from './SavedDocuments';

export const MainContent = () => {
  const { theme } = useTheme();
  const { saveDocument, removeDocument, isDocumentSaved } = useSavedDocuments();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editCommentId, setEditCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadDocuments = async () => {
      try {
        const fetchedDocuments = await fetchDocuments();
        const documentsWithLikesAndComments = fetchedDocuments.map(doc => {
          const storedComments = JSON.parse(localStorage.getItem(`comments_${doc.id}`)) || [];
          return {
            ...doc,
            liked: JSON.parse(localStorage.getItem(`liked_${doc.id}`)) || false,
            comments: storedComments,
          };
        });
        setDocuments(documentsWithLikesAndComments);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadDocuments();
  }, []);

  const handleLikeToggle = (docId) => {
    setDocuments(prevDocs =>
      prevDocs.map(doc => {
        if (doc.id === docId) {
          const newLikedState = !doc.liked;
          localStorage.setItem(`liked_${doc.id}`, JSON.stringify(newLikedState));
          return { ...doc, liked: newLikedState };
        }
        return doc;
      })
    );
  };

  const handleCommentSubmit = async (docId, comment) => {
    const postData = {
      document_id: docId,
      docr_comment: comment,
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/web/doc/review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit comment');
      }

      setDocuments(prevDocs =>
        prevDocs.map(doc => {
          if (doc.id === docId) {
            const updatedComments = [...doc.comments, comment];
            localStorage.setItem(`comments_${doc.id}`, JSON.stringify(updatedComments));
            return { ...doc, comments: updatedComments };
          }
          return doc;
        })
      );
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const handleCommentDelete = (docId, commentToDelete) => {
    setDocuments(prevDocs =>
      prevDocs.map(doc => {
        if (doc.id === docId) {
          const updatedComments = doc.comments.filter(comment => comment !== commentToDelete);
          localStorage.setItem(`comments_${doc.id}`, JSON.stringify(updatedComments));
          return { ...doc, comments: updatedComments };
        }
        return doc;
      })
    );
  };

  const handleCommentEditToggle = (comment) => {
    setEditCommentId(comment);
    setEditCommentText(comment);
  };

  const handleCommentEditSubmit = (docId) => {
    setDocuments(prevDocs =>
      prevDocs.map(doc => {
        if (doc.id === docId) {
          const updatedComments = doc.comments.map(c => (c === editCommentId ? editCommentText : c));
          localStorage.setItem(`comments_${doc.id}`, JSON.stringify(updatedComments));
          return { ...doc, comments: updatedComments };
        }
        return doc;
      })
    );

    setEditCommentId(null);
    setEditCommentText('');
  };

  const filteredDocuments = documents.filter(doc =>
    (doc.doc_title && doc.doc_title.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (doc.author_name && doc.author_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (doc.doc_name && doc.doc_name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <section className="flex justify-center items-center space-x-2 p-4 bg-gray-100">
        <div className="animate-spin rounded-full h-10 w-10 border-gray-400 border-8 border-t-8 text-green-500"></div>
        <p>Loading documents...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex justify-center items-center space-x-2 p-4 bg-red-100">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-red-500">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 0M5.636 5.636l.045.045a15.364 15.364 0 117.828 17.828 15.364 15.364 0 00-17.828-17.828l-.045-.045"></path>
        </svg>
        <p>Failed to fetch documents: {error}</p>
      </section>
    );
  }

  return (
    <main className="flex-1 p-6" style={{height:"500vh"}}>
      <div className="max-w-3xl mx-auto space-y-5">
        <div className="mb-4 relative">
          <input
            type="text"
            className="border border-gray-300 text-blue-700 rounded p-2 w-full pl-10"
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 4a6 6 0 100 12 6 6 0 000-12zm8 8h2m-2 0a8 8 0 11-8-8 8 8 0 018 8z"></path>
          </svg>
        </div>
        {filteredDocuments.length > 0 ? (
          filteredDocuments.map((document) => (
            <div key={document.id} className="bg-white p-4 rounded-lg shadow-md transition-transform hover:shadow-lg space-y-4">
              <div className="flex items-center space-x-3">
                <div>
                  <h4 className="text-md text-gray-800 font-bold">{document.doc_name}</h4>
                  <p className="text-xs text-gray-500">Published Date: {new Date(document.doc_published_date).toLocaleDateString()}</p>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">{document.doc_title}</h3>
              <div className="">
                {document.doc_photo_url && (
                  <Link to={`/documents/${document.id}`}>
                    <img src={document.doc_photo_url} alt={document.doc_name} className="block w-full object-cover" style={{ maxHeight: '200px' }} />
                  </Link>
                )}
              </div>

              <div className="flex justify-between items-center text-blue-800 mt-2">
                <button
                  className={`flex items-center space-x-1 ${document.liked ? 'text-blue-500' : 'hover:text-blue-500'}`}
                  onClick={() => handleLikeToggle(document.id)}
                >
                  <span className="mr-1">{document.liked ? '❤️' : '👍'}</span>
                  <span>{document.liked ? 'Liked' : 'Like'}</span>
                </button>
                <button
                  className={`flex items-center space-x-1 ${isDocumentSaved(document.id) ? 'text-blue-800' : 'text-gray-500 hover:text-green-500'}`}
                  onClick={() => isDocumentSaved(document.id) ? removeDocument(document.id) : saveDocument(document)}
                >
                  <span className="mr-1">{isDocumentSaved(document.id) ? '📑' : '📄'}</span>
                  <span>{isDocumentSaved(document.id) ? 'Saved' : 'Save'}</span>
                </button>
                {document.doc_file_url ? (
                  <Link
                    href={document.doc_file_url}
                    download
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <span className="mr-1">📥</span>
                    <span>Download</span>
                  </Link>
                ) : (
                  <p className="text-gray-400">No file available</p>
                )}
              </div>

              <div className="mt-2 flex flex-col space-y-2">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && e.target.value.trim()) {
                      handleCommentSubmit(document.id, e.target.value);
                      e.target.value = '';
                    }
                  }}
                  className="block text-blue-800 px-3 py-2 rounded-md text-base transition-all bg-white border-gray-400 w-full"
                />

                {document.comments.length > 0 && (
                  <div className="mt-2">
                    {document.comments.map((comment, index) => (
                      <div key={index} className="flex items-center justify-between space-x-2 py-2">
                        {editCommentId === comment ? (
                          <>
                            <input
                              type="text"
                              value={editCommentText}
                              onChange={(e) => setEditCommentText(e.target.value)}
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') handleCommentEditSubmit(document.id);
                              }}
                              className="block px-3 py-2 w-full rounded-md text-base transition-all bg-white border-gray-400"
                            />
                            <button
                              onClick={() => handleCommentEditSubmit(document.id)}
                              className="text-blue-500 bg-green-500 hover:bg-green-700 py-1 px-3 rounded text-sm"
                            >
                              Save
                            </button>
                          </>
                        ) : (
                          <>
                            <p className="text-base text-gray-600">{comment}</p>
                            <div className="flex items-center justify-end space-x-2">
                              <FaEdit
                                onClick={() => handleCommentEditToggle(comment)}
                                className={`mr-2 ${theme === 'dark' ? 'text-gray-300' : 'text-blue-500'} hover:${theme === 'dark' ? 'text-gray-400' : 'text-blue-700'}`}
                              />
                              <FaTrash
                                onClick={() => handleCommentDelete(document.id, comment)}
                                className={`mr-2 ${theme === 'dark' ? 'text-gray-300' : 'text-red-500'} hover:${theme === 'dark' ? 'text-gray-400' : 'text-red-700'}`}
                              />
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 bg-white rounded-md shadow-md">No documents available.</div>
        )}
      </div>
    </main>
  );
};
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTheme } from '../../ThemeContext';
// Assuming you have the useSavedDocuments hook in the same directory or import it from wherever it's defined
import { useSavedDocuments } from '../../Component/SavedDocuments';
import './DocumentDetail.css';

const DocumentDetail = () => {
  const { id } = useParams();
  const { theme } = useTheme();
  const { saveDocument, isDocumentSaved } = useSavedDocuments(); // Use the saved documents hook
  const [documentData, setDocumentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/web/doc/${id}`);
        if (!response.ok) throw new Error('Failed to fetch document');
        const data = await response.json();
        setDocumentData(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDocument();
  }, [id]);

  const downloadFile = () => {
    if (!documentData?.doc_file) {
      setError('No file available to download');
      return;
    }
    setDownloading(true);
    window.location.href = `http://127.0.0.1:8000/api/web/doc/download/${id}`;
    setSuccessMessage('Your download has started! Please check your downloads folder.');
    setTimeout(() => {
      setSuccessMessage('');
      setDownloading(false); // reset downloading state after timeout
    }, 5000);
  };

  const saveDocumentHandler = () => {
    if (documentData) {
      saveDocument({...documentData});
      setSuccessMessage('Document saved successfully!');
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
    }
  };

  if (loading) return <div style={{ alignItems: 'center', textAlign: 'center' }}>Loading...</div>;
  if (error) return <div style={{ alignItems: 'center', textAlign: 'center' }}>Error: {error}</div>;
  if (!documentData) return <div style={{ alignItems: 'center', textAlign: 'center' }}>No document found</div>;

  return (
    <div className={`document-detail ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <h2 className="document-title">{documentData.doc_title}</h2>
      
      {/* Document Info Section */}
      <div className="document-info-container">
        <div className="document-info">
          <img
            src={documentData.doc_photo_url}
            alt=""
            className="document-image"
          />
        </div>
        <div className="document-details">
          <p><strong>Author:</strong> {documentData.author_name}</p>
          <p><strong>Name Documents:</strong> {documentData.doc_name}</p>
          <p><strong>Title Documents:</strong> {documentData.doc_title}</p>
          <p><strong>Size:</strong> {documentData.doc_size} KB</p>
          <p><strong>Keywords:</strong> {documentData.doc_keywords}</p>
          <p><strong>Category:</strong> {documentData.category_name}</p>
          <p><strong>Publication Year:</strong> {documentData.doc_publication_year}</p>
          <p><strong>Created Date:</strong> {documentData.created_at}</p>
        </div>
      </div>

      <div className="button-container">
        <button 
          onClick={downloadFile}
          className={`download-button ${downloading ? 'downloading' : ''}`}
          disabled={downloading}
        >
          {downloading ? 'Downloading...' : 'Download Document'}
        </button>

        <button 
          onClick={saveDocumentHandler}
          className="save-button"
          disabled={isDocumentSaved(documentData.id)} // Disable if already saved
        >
          {isDocumentSaved(documentData.id) ? 'Saved' : 'Save Document'}
        </button>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="success-message" style={{ textAlign: 'center', marginTop: '100px', color: 'green' }}>
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default DocumentDetail;
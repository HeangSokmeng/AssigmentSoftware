// services/documentService.js
const API_URL = 'http://127.0.0.1:8000/api/web/doc';

/**
 * Fetch documents from the API.
 * @returns {Promise<Object>} The response data containing documents.
 */
export const fetchDocuments = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    if (!response.ok || data.error) {
      throw new Error(data.message || 'Could not fetch documents');
    }

    return data.data; // Return the list of documents
  } catch (error) {
    console.error('Error fetching documents:', error);
    throw error;
  }
};
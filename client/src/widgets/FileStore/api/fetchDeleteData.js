

export default async function fetchDeleteData(url) {
    try {
      const response = await fetch(url, { 
        method: 'DELETE',
        headers: {
          'authorization': `Bearer ${localStorage.getItem("token")}`,
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.error || errorData.errors || 'Delete failed'; 
        throw new Error(errorMessage); 
      }
  
      const result = await response.json();
      return result; 
  
    } catch (error) {
      console.error('Delete error:', error);
    }
}
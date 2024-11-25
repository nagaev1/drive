
export default async function fetchRenameData(event, url) {
    const formData = new FormData(event.target);

    try {
      const response = await fetch(url, { 
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({newName: formData.get('newName')}), 
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.error || errorData.errors || 'Rename failed'; 
        throw new Error(errorMessage); 
      }
  
      const result = await response.json();
      return result; 
  
    } catch (error) {
      console.error('Rename error:', error);
    }
}
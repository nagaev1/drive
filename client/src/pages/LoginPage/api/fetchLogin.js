export default async function fetchLogin(event) {
    event.preventDefault();
  
    const formData = new FormData(event.target);
  
    const data = {
      email: formData.get('email'),
      password: formData.get('password'),
    };

    try {
      const response = await fetch('/api/login', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(data), 
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.error || errorData.errors || 'Login failed'; 
        throw new Error(errorMessage); 
      }
  
      const result = await response.json();
      return result; 
  
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }
  
  
  
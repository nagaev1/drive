export default async function fetchRegister(event) {
    event.preventDefault();
  
    const formData = new FormData(event.target);
  
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      password_confirmation: formData.get('password_confirmation'),
    };
  
    try {
      const response = await fetch('/api/register', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(data), 
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.error || errorData.errors || 'Registration failed'; 
        throw new Error(errorMessage); 
      }
  
      const result = await response.json();
      return result; 
  
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }
  
  
  
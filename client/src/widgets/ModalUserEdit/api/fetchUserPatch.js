export default async function fetchUserPatch(event) {
  event.preventDefault();

  const formData = new FormData(event.target);

  const data = {}
  formData.get('name') && (data.name = formData.get('name'))
  formData.get('email') && (data.email = formData.get('email'))
  formData.get('password') && (data.password = formData.get('password'))
  formData.get('password_confirmation') && (data.password_confirmation = formData.get('password_confirmation'))

  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token found. User is not logged in.");
  }

  try {
    const response = await fetch("/api/user", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage =
        errorData.error || errorData.errors || "User Edit failed";
      throw new Error(errorMessage);
    }

    formData.get('name') && (localStorage.setItem('name', data.name))    
    formData.get('email') && (localStorage.setItem('email', data.email))
    formData.get('password') && (localStorage.setItem('password', data.password))

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("User Edit failed:", error);
    throw error;
  }
}

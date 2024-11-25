export default async function fetchLogout() {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No token found. User is not logged in.");
    }

    const response = await fetch('/api/logout', {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.error || "Logout failed";
      throw new Error(errorMessage);
    }

    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("name");

    return true;
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
}

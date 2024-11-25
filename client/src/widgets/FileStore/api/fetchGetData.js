export default async function fetchGetData(url, folderId) {
    try {
      const response = await fetch(url, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage =
          errorData.error || errorData.errors || "Get failed";
        throw new Error(errorMessage);
      }
  
      return await response.json();
    } catch (error) {
      console.log(error);
    }
  }
  
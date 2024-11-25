export default async function fetchFolderCreate(event, parent_id) {
    const data = new FormData(event.target);
    parent_id && data.append('parent_id', parent_id)
  
    try {
      const response = await fetch("/api/folders", {
        method: "POST",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: data,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage =
          errorData.error || errorData.errors || "Get files failed";
        throw new Error(errorMessage);
      }
  
      return await response.json();
    } catch (error) {
      console.log(error);
    }
  }
  
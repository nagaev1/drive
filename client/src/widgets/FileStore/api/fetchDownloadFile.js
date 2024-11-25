export default async function fetchDownloadtFile(id, name) {
    try {
      const response = await fetch(`/api/files/${id}`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage =
          errorData.error || errorData.errors || "Get files failed";
        throw new Error(errorMessage);
      }
  
      const blob = await response.blob();
      const url = window.URL.createObjectURL(
        new Blob([blob])
      )
      const link = document.createElement('a')
      link.href = url
      link.setAttribute(
        'download',
        name
      );
      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)
    } catch (error) {
      console.log(error);
    }
  }
  
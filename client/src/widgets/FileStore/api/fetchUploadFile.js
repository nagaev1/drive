export default async function fetchUploadFile(files, parent_id) {
  const data = new FormData();
  for (let i = 0; i < files.length; i++) {
    data.append("files[]", files[i]); // The [] is crucial her
  }
  parent_id && data.append('parent_id', parent_id)

  try {
    const response = await fetch("/api/files/upload", {
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

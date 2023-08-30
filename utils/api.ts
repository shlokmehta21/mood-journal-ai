const createURL = (path: string) => {
  return window.location.origin + path;
};

// export const getEntries = async () => {
//   const response = await fetch(
//     new Request(createURL("/api/journal"), {
//       method: "GET",
//     })
//   );

//   if (response.ok) {
//     const data = await response.json();
//     return data.data;
//   } else {
//     throw new Error("Something went wrong on API server!");
//   }
// };

export const deleteEntry = async (id: string) => {
  const response = await fetch(
    new Request(createURL(`/api/journal/${id}`), {
      method: "DELETE",
    })
  );

  console.log(await response.json());

  if (response.ok) {
    // const data = await response.json();
    // return data.data;
    return true;
  } else {
    throw new Error("Something went wrong on API server!");
  }
};

export const createNewEntry = async () => {
  const response = await fetch(
    new Request(createURL("/api/journal"), {
      method: "POST",
    })
  );

  if (response.ok) {
    const data = await response.json();
    return data.data;
  }
};

export const updateEntry = async (id: string, content: string) => {
  const response = await fetch(
    new Request(createURL(`/api/journal/${id}`), {
      method: "PATCH",
      body: JSON.stringify({ content }),
    })
  );

  console.log(response);

  if (response.ok) {
    const data = await response.json();
    return data.data;
  }
};

export const askQuestion = async (question: string) => {
  const response = await fetch(
    new Request(createURL("/api/question"), {
      method: "POST",
      body: JSON.stringify({ question }),
    })
  );

  if (response.ok) {
    const data = await response.json();
    return data.data;
  }
};

import { Dispatch, SetStateAction } from "react";

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

export const askQuestion = async (
  question: string,
  setState: Dispatch<SetStateAction<string>>
) => {
  const response = await fetch(
    new Request(createURL("/api/question"), {
      method: "POST",
      body: JSON.stringify({ question }),
    })
  );

  const stream = response?.body;

  try {
    const reader = stream?.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let result = "";

    while (!done) {
      // @ts-ignore
      const { value, done: doneReading } = await reader?.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      console.log(chunkValue);
      setState((prev) => prev + chunkValue);
    }

    return result;
  } catch (error) {
    console.log(error);
  }

  console.log(response, "Question");
};

export const getMethod = async url => {
  return await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  }).then(response => response.json());
};

export const postMethod = async (url, body) => {
  console.log(body);
  return await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body
  }).then(response => response.json());
};

export const putMethod = async (url, body) => {
  return await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body
  }).then(response => response.json());
};

export const patchMethod = async (url, body) => {
  return await fetch(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body
  }).then(response => response.json());
};

export const deleteMethod = async url => {
  return await fetch(url, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" }
  }).then(response => response.json());
};

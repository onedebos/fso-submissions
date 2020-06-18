import axios from 'axios';

const baseUrl = 'http://localhost:3002/api/blogs';

const getAll = () => {
  const request = axios.get(baseUrl);

  return request.then(response => response.data);
};

const createBlog = async (token, request) => {
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };

  const response = await axios.post(baseUrl, request, config);
  return response;
};

const increaseLikes = async (id, token, request) => {
  const uniqueUrl = `${baseUrl}/${id}`;
  const config = {
    headers: { authorization: `Bearer ${token}` },
  };

  const response = await axios.put(uniqueUrl, request, config);
  return response;
};

const deleteBlog = async (id, token) => {
  const uniqueUrl = `${baseUrl}/${id}`;

  const config = {
    headers: { authorization: `Bearer ${token}` },
  };
  const response = await axios.delete(uniqueUrl, config);
  return response;
};

export default { getAll, createBlog, increaseLikes, deleteBlog };

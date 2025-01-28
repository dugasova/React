export const API = "https://679286cdcf994cc6804a5368.mockapi.io/tasks";

const service = {
    get: (id) => fetch(API+ (id ? `/${id}` : ``)).then(response => response.json()),
    delete: (id) => fetch(`${API}/${id}`, {method: 'DELETE'}).then(data => data.json()),
    put: (id, item) => fetch(`${API}/${id}`, {method: 'PUT', body: JSON.stringify(item), 
        headers: {'Content-Type': 'application/json'}}).then(data => data.json()), 
    
}
export default service;

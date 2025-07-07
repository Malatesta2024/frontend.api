import { useEffect, useState } from "react";
import { getProductos as fetchProductos } from "../api/Producto.js";

export const useProductos = () => {
const [data, setData] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

const getProductos = async () => {
    setLoading(true);
    setError("");

    try {
    const response = await fetchProductos();
    setData(response.data);
    } catch (error) {
    setError(error.message);
    } finally {
    setLoading(false);
    }
};

useEffect(() => {
    getProductos();
}, []);

return { data, loading, error, getProductos };
};
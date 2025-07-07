export const getProductos = async () => {
    try {
    const response = await fetch("https://backend-pm3u.onrender.com/api/productos", {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("No se pudo obtener la información");
    }

    const result = await response.json();
    return { data: result };
    } catch (error) {
    return Promise.reject(error);
    }
};

export const createProducto = async (producto) => {
    try {
    const response = await fetch("https://backend-pm3u.onrender.com/api/productos", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(producto),
    });

    if (!response.ok) {
        throw new Error("Error al crear el producto");
    }

    const result = await response.json();
    return { data: result };
    } catch (error) {
    return Promise.reject(error);
    }
};

export const getProductoById = async (id_producto) => {
    try {
    const response = await fetch(`https://backend-pm3u.onrender.com/api/productos/${id_producto}`, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Error al obtener el producto");
    }

    const result = await response.json();
    return { data: result };
    } catch (error) {
    return Promise.reject(error);
    }
};

export const deleteProducto = async (id_producto) => {
    try {
    const response = await fetch(`https://backend-pm3u.onrender.com/api/productos/${id_producto}`, {
        method: "DELETE",
        headers: {
        "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Error al eliminar el producto");
    }

    return { data: { message: "Producto eliminado exitosamente" } };
    } catch (error) {
    return Promise.reject(error);
    }
};

export const updateProducto = async (id_producto, producto) => {
    try {
    const response = await fetch(`https://backend-pm3u.onrender.com/api/productos/${id_producto}`, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(producto),
    });

    if (!response.ok) {
        throw new Error("Error al actualizar el producto");
    }

    const result = await response.json();
    return { data: result };
    } catch (error) {
    return Promise.reject(error);
    }
};
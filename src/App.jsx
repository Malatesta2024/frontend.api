import React, { useState } from "react";
import { useProductos } from "./domain/useProductos";
import {
  createProducto,
  updateProducto,
  deleteProducto,
} from "./api/producto";

export default function App() {
  const { data, loading, error, getProductos } = useProductos();
  const [form, setForm] = useState({ nombre_producto: "", RUT_proveedor: "" });
  const [formError, setFormError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setMensaje("");

    if (!form.nombre_producto || !form.RUT_proveedor) {
      setFormError("Todos los campos son obligatorios");
      return;
    }

    try {
      if (editingId) {
        console.log("Actualizando producto:", editingId, form); // Para depuración
        const response = await updateProducto(editingId, form);
        if (response.data) {
          await getProductos(); // 👈 Esto asegura que se vean los datos actualizados
          setForm({ nombre_producto: "", RUT_proveedor: "" });
          setEditingId(null);
          setMensaje("✅ Producto actualizado con éxito");
        }
      } else {
        const response = await createProducto(form);
        if (response.data) {
          await getProductos();
          setForm({ nombre_producto: "", RUT_proveedor: "" });
          setMensaje("✅ Producto agregado con éxito");
        }
      }
    } catch (error) {
      setFormError(error.message);
    }
  };

  const handleEdit = (producto) => {
    setForm({
      nombre_producto: producto.nombre_producto,
      RUT_proveedor: producto.RUT_proveedor,
    });
    setEditingId(producto.id_producto);
    setMensaje("");
  };

  const handleDelete = async (id) => {
    try {
      await deleteProducto(id);
      await getProductos();
      setMensaje("🗑️ Producto eliminado");
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "auto" }}>
      <h1 style={{ color: "#2c3e50", textAlign: "center" }}>📦 Gestión de Productos</h1>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ marginBottom: "0.5rem" }}>{editingId ? "✏️ Editar Producto" : "➕ Agregar Producto"}</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <label>
            Nombre del Producto:
            <input
              name="nombre_producto"
              value={form.nombre_producto}
              onChange={handleChange}
              style={{ padding: "0.5rem", width: "100%" }}
            />
          </label>
          <label>
            RUT del Proveedor:
            <input
              name="RUT_proveedor"
              value={form.RUT_proveedor}
              onChange={handleChange}
              style={{ padding: "0.5rem", width: "100%" }}
            />
          </label>
          <button type="submit" style={{ padding: "0.5rem", backgroundColor: editingId ? "#f39c12" : "#2ecc71", color: "white", border: "none" }}>
            {editingId ? "Actualizar" : "Agregar"}
          </button>
        </form>
        {formError && <p style={{ color: "red" }}>{formError}</p>}
        {mensaje && <p style={{ color: "green" }}>{mensaje}</p>}
      </section>

      <section>
        <h2 style={{ marginBottom: "0.5rem" }}>📋 Lista de Productos</h2>
        {loading && <p>Cargando productos...</p>}
        {error && <p style={{ color: "red" }}>Error: {error}</p>}
        <ul style={{ listStyle: "none", padding: 0 }}>
          {data.map((producto) => (
            <li key={producto.id_producto} style={{ marginBottom: "1rem", padding: "0.5rem", borderBottom: "1px solid #ccc" }}>
              <strong>{producto.nombre_producto}</strong> (ID: {producto.id_producto})<br />
              RUT: {producto.RUT_proveedor}<br />
              <button
                onClick={() => handleEdit(producto)}
                style={{ marginTop: "0.5rem", marginRight: "0.5rem", backgroundColor: "#3498db", color: "white", border: "none", padding: "0.25rem 0.5rem" }}
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(producto.id_producto)}
                style={{ marginTop: "0.5rem", backgroundColor: "red", color: "white", border: "none", padding: "0.25rem 0.5rem" }}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

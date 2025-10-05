import Producto from '../models/Producto.js';

class ProductoDAO {
    constructor() {}

    async crearProducto(productoData) {
        try {
            const producto = new Producto(productoData);
            return await producto.save();
        } catch (error) {
            throw error;
        }
    }

    async obtenerProductoPorId(id) {
        try {
            return await Producto.findById(id);
        } catch (error) {
            throw error;
        }
    }

    async obtenerProductos(limit = 10) {
        try {
            return await Producto.find().limit(limit);
        } catch (error) {
            throw error;
        }
    }

    async actualizarProducto(id, productoData) {
        try {
            return await Producto.findByIdAndUpdate(id, productoData, { new: true });
        } catch (error) {
            throw error;
        }
    }

    async eliminarProducto(id) {
        try {
            return await Producto.findByIdAndDelete(id);
        } catch (error) {
            throw error;
        }
    }
}

export default new ProductoDAO();
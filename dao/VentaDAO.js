import Venta from '../models/Venta.js';

class VentaDAO {
    constructor() {}

    async crearVenta(ventaData) {
        try {
            const venta = new Venta(ventaData);
            return await venta.save();
        } catch (error) {
            throw error;
        }
    }

    async agregarProductosAVenta(idVenta, productosVendidos) {
        try {
            const venta = await Venta.findById(idVenta);

            if (!venta) {
                throw new Error('Venta no encontrada.');
            }

            venta.productosventa.push(...productosVendidos.map(producto => ({
                idProducto: producto.idProducto,
                descripcion: producto.descripcion,
                precioVenta: producto.precioVenta,
                cantidad: producto.cantidad,
                subtotal: producto.precioVenta * producto.cantidad
            })));

            return await venta.save();
        } catch (error) {
            throw error;
        }
    }

    async obtenerVentaPorId(id) {
        try {
            return await Venta.findById(id);
        } catch (error) {
            throw error;
        }
    }

    async obtenerVentas(limit = 10) {
        try {
            return await Venta.find().limit(limit);
        } catch (error) {
            throw error;
        }
    }

    async actualizarVenta(id, ventaData) {
        try {
            return await Venta.findByIdAndUpdate(id, ventaData, { new: true });
        } catch (error) {
            throw error;
        }
    }

    async eliminarVenta(id) {
        try {
            return await Venta.findByIdAndDelete(id);
        } catch (error) {
            throw error;
        }
    }

}

export default new VentaDAO();
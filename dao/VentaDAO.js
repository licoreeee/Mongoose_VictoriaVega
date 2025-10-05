import Venta from './models/Venta.js';

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
}

export default new VentaDAO();
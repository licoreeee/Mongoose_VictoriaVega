import { conectar, desconectar } from './config/db.js';
import ProductoDAO from './dao/ProductoDAO.js';
import VentaDAO from './dao/VentaDAO.js';

async function main() {
    try {
        await conectar().then(() => console.log('Conexión con la BD exitosa.')).catch(error => {throw error});

        let respCreate = await ProductoDAO.crearProducto({
            nombre: 'Galletas',
            precio: 17.90,
            cantidad: 100
        })
        console.log('Producto creado', respCreate);

        let producto2 = await ProductoDAO.crearProducto({
            nombre: 'Paletas',
            precio: 5.00,
            cantidad: 10
        })

        let producto = await ProductoDAO.obtenerProductoPorId(respCreate._id);
        console.log('Producto encontrado: ', producto);

        let productos = await ProductoDAO.obtenerProductos(10);
        console.log('Productos encontrados: ', productos);

        let productoActualizado = await ProductoDAO.actualizarProducto(respCreate._id, { precio: 18.00 });
        console.log('Producto actualizado', productoActualizado);

        let productoEliminado = await ProductoDAO.eliminarProducto(producto2._id);
        console.log('Producto eliminado: ', productoEliminado);

        let productosActuales = await ProductoDAO.obtenerProductos(10);
        console.log('Productos encontrados: ', productos);

        const venta = await VentaDAO.crearVenta({
            total: 0,
            iva: 0,
            productosventa: []
        })
        console.log('Venta creada: ', venta);

        const VentaConProductos = await VentaDAO.agregarProductosAVenta(venta._id, [
            { idProducto: respCreate._id, descripcion: respCreate.nombre, precioVenta: respCreate.precio, cantidad: 2 }
        ])
        console.log("Venta con productos: ", VentaConProductos);

        let ventaEncontrada = await VentaDAO.obtenerVentaPorId(venta._id);
        console.log('Venta encontrada: ', ventaEncontrada);

        let ventas = await VentaDAO.obtenerVentas(10);
        console.log('Ventas encontradas: ', ventas);

        let ventaActualizada = await VentaDAO.actualizarVenta(venta._id, { total: 50.00 });
        console.log('Venta actualizada: ', ventaActualizada);

        let ventaEliminada = await VentaDAO.eliminarVenta(venta._id);
        console.log('Venta eliminada: ', ventaEliminada);

        await desconectar().then(() => console.log('Desconexión con la BD exitosa.')).catch(error => {throw error});
    } catch (error) {
        await desconectar();
        throw error;
    }
}

main();
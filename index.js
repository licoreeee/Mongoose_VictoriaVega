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

        await ProductoDAO.crearProducto({
            nombre: 'Galletas',
            precio: 17.90,
            cantidad: 100
        })

        await ProductoDAO.crearProducto({
            nombre: 'Galletas',
            precio: 17.90,
            cantidad: 100
        })

        await ProductoDAO.crearProducto({
            nombre: 'Galletas',
            precio: 17.90,
            cantidad: 100
        })

        let producto = await ProductoDAO.obtenerProductoPorId(respCreate._id);
        console.log('Producto encontrado: ', producto);

        let productos = await ProductoDAO.obtenerProductos(10);
        console.log('Productos encontrados: ', productos);

        const venta = await VentaDAO.crearVenta({
            total: 0,
            iva: 0,
            productosventa: []
        })
        console.log('Venta creada: ', venta);

        const VentaConProductos = await VentaDAO.agregarProductosAVenta(venta._id, [
            { idProducto: respCreate._id, nombre: respCreate.nombre, precio: respCreate.precio, cantidad: 2 }
        ])

        console.log

        await desconectar().then(() => console.log('Desconexión con la BD exitosa.')).catch(error => {throw error});
    } catch (error) {
        throw error;
        await desconectar();
    }
}
import { Component, OnInit } from '@angular/core';
import { FirebaseRealTimeDatabaseService } from '../../../../../services/firebase-Realtime-Database.service'; 
import { Router } from '@angular/router';
import { alertError,alertExito } from '../../../../../services/utils';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Importar FormsModule
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-inventario-producto-mal-estado',
  standalone: true,
  imports: [FormsModule, CommonModule, NavbarComponent],
  templateUrl: './inventario-producto-mal-estado.component.html',
  styleUrl: './inventario-producto-mal-estado.component.css'
})
export class InventarioProductoMalEstadoComponent implements OnInit {
  productos: any[] = [];
  productosFiltrados: any[] = []; // Productos filtrados
  searchTerm: string = ''; // Término de búsqueda

  constructor(
    private firebaseService: FirebaseRealTimeDatabaseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener listado de productos desde Firebase
    const carpeta = 'productosMalEstado';
    this.firebaseService.listado(carpeta).subscribe((productos) => {
      this.productos = productos;
      this.productosFiltrados = productos; // Inicializar con todos los productos
    });
  }

  // Actualizar el estado de existencia (cambiar color a verde)
  actualizarExistencia(producto: any): void {
    const carpeta = 'productosMalEstado';
    this.firebaseService.editar(carpeta, producto).then(() => {
      console.log(`Producto ${producto.codigo} actualizado: Existencia marcada`);
    }).catch((error) => {
      console.error('Error al actualizar el estado de existencia', error);
    });
  }

  // Marcar el producto como "vendido"
  marcarVendido(producto: any): void {
    // No se elimina de inmediato, solo se marca como vendido
    if (producto.vendido) {
      console.log(`Producto ${producto.codigo} marcado como vendido.`);
    }
  }

  // Filtrar productos por código o nombre
  filtrarProductos(): void {
    const searchTermLower = this.searchTerm.toLowerCase();
    this.productosFiltrados = this.productos.filter(producto =>
      producto.codigo.toLowerCase().includes(searchTermLower) ||
      producto.producto.toLowerCase().includes(searchTermLower)
    );
  }

  guardarDatos(): void {
    const carpeta = 'productosMalEstado';
    const productosVendidos = this.productos.filter(producto => producto.vendido);

    // Eliminar los productos vendidos
    const eliminarVendidos = productosVendidos.map(producto => {
      return this.firebaseService.eliminar(producto.id, carpeta);
    });

    // Desmarcar los productos existentes
    const desmarcarExistencia = this.productos.filter(producto => producto.existencia).map(producto => {
      producto.existencia = false;
      return this.firebaseService.editar(carpeta, producto);
    });

    // Unimos todas las promesas (eliminar + desmarcar)
    const todasLasOperaciones = [...eliminarVendidos, ...desmarcarExistencia];

    // Ejecutamos todas las promesas
    Promise.all(todasLasOperaciones)
      .then(() => {
        // Si todas las operaciones fueron exitosas, mostramos el mensaje de éxito
        alertExito('Operación exitosa', 'Los productos vendidos han sido eliminados y los existentes desmarcados correctamente.', this.router);
        
        // Actualizamos la lista visualmente sin recargar la página
        this.productos = this.productos.filter(producto => !producto.vendido); // Eliminar los productos vendidos de la vista
        this.filtrarProductos(); // Volver a filtrar la lista
      })
      .catch(() => {
        // Si alguna operación falla, mostramos el mensaje de error
        alertError('Hubo un error al guardar los datos. Por favor, intenta nuevamente.');
      });
  }

  regresar(): void {
    // Redirigir a la página principal
    this.router.navigate(['/menu-administrativo']);
  }
}

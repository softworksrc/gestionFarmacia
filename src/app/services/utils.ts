import Swal from 'sweetalert2';
import { Router } from '@angular/router';  // Importa el Router


export function alertResultado(accion: 'crear' | 'editar',nombreMedicamento: string,onConfirm: () => Promise<void>,rutaRedireccion: string
) {
  onConfirm()
    .then(() => {
      Swal.fire({
        title: '¡Éxito!',
        text: `El producto "${nombreMedicamento}" ha sido ${accion === 'crear' ? 'creado' : 'editado'} correctamente.`,
        icon: 'success',
        confirmButtonColor: '#3085d6',
      }).then(() => {
        window.location.href = rutaRedireccion;
      });
    })
    .catch(() => {
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al guardar los datos. Intenta nuevamente.',
        icon: 'error',
        confirmButtonColor: '#d33',
      });
    });
}
export function alertExito(titulo: string, mensaje: string, router: Router) {
  // Primero, redirigir al usuario
  router.navigate(['/menu-administrativo']).then(() => {
    // Después de redirigir, mostramos el toast
    Swal.fire({
      toast: true, // Habilita el modo toast
      position: 'top-end', // Posición en la esquina superior derecha
      icon: 'success',
      title: titulo,
      text: mensaje,
      showConfirmButton: false, // Oculta el botón de confirmación
      timer: 3000, // Tiempo que se mostrará el toast (en milisegundos)
      timerProgressBar: true, // Muestra una barra de progreso
      background: '#ffffff', // Fondo blanco
      confirmButtonColor: '#3085d6',
    });
  });
}



export function alertError(mensaje: string) {
  Swal.fire({
    toast: true, // Habilita el modo toast
    position: 'top-end', // Posición en la esquina superior derecha
    icon: 'error',
    title: '¡Error!',
    text: mensaje,
    showConfirmButton: false, // Oculta el botón de confirmación
    timer: 3000, // Tiempo que se mostrará el toast
    timerProgressBar: true, // Muestra una barra de progreso
    background: '#ffffff', // Fondo blanco
    confirmButtonColor: '#d33',
  });
}
export function alertEliminar(onConfirm: () => Promise<void>, nombreMedicamento: string, rutaRedireccion: string) {
  Swal.fire({
    title: `¿Estás seguro de eliminar el registro "${nombreMedicamento}"?`,
    text: 'Esta acción no se puede deshacer.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirm()
        .then(() => {
          Swal.fire(
            'Eliminado!',
            `El registro "${nombreMedicamento}" ha sido eliminado correctamente.`,
            'success'
          ).then(() => {
            window.location.href = rutaRedireccion;
          });
        })
        .catch(() => {
          Swal.fire(
            'Error!',
            'Hubo un problema al eliminar el registro. Intenta nuevamente.',
            'error'
          );
        });
    } else {
      Swal.fire(
        'Cancelado',
        'El registro no ha sido eliminado.',
        'info'
      );
    }
  });
}


export function alertPeticion(onConfirm: () => void) {
  const codigoCorrecto = 'roberto';

  Swal.fire({
    title: 'Ingrese el código',
    input: 'password', // Campo de entrada como contraseña
    inputAttributes: {
      autocapitalize: 'off',
    },
    showCancelButton: true,
    confirmButtonText: 'Confirmar',
    cancelButtonText: 'Cancelar',
    preConfirm: (codigoIngresado) => {
      if (codigoIngresado === codigoCorrecto) {
        return true; // Indica que el código es correcto
      } else {
        Swal.showValidationMessage('Código incorrecto'); // Muestra el mensaje de validación
        return false; // No permite continuar con la confirmación
      }
    },
    allowOutsideClick: () => !Swal.isLoading(), // Evita cerrar el modal al hacer clic fuera
  }).then((result) => {
    if (result.isConfirmed) {
      // Código correcto
      Swal.fire({
        icon: 'success',
        title: 'Acceso concedido',
        text: 'Todo fue exitoso.',
        confirmButtonText: 'Aceptar',
      }).then(() => {
        onConfirm(); // Ejecutar la acción si es necesario
      });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      // Modal cancelado, no hace nada
      console.log('Operación cancelada');
    }
  }).catch(() => {
    // Código incorrecto
    Swal.fire({
      icon: 'error',
      title: 'Acceso denegado',
      text: 'El código ingresado es incorrecto.',
      confirmButtonText: 'Aceptar',
    });
  });
}

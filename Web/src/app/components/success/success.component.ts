import { Component, Input } from '@angular/core';
import { Order } from 'src/common/models/order';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css'],
})
export class SuccessComponent {
  @Input() orders!: Array<Order>;

  ordersFake = [
    {
      shop_order_id: 5,
      total: 12.35,
      cantidad: 1,
      product: {
        id: 3,
        name: '16GB RAM DDR4',
        brand: 'Kingston',
        about:
          'Kingston es sinónimo de trayectoria y excelencia en el mercado tecnológico, principalmente en lo que a memorias ram refiere. Mejorar la capacidad y rendimiento de tu computadora va a ser fácil con la incorporación de una memoria de la línea ValueRAM, que cubrirá todas tus necesidades. Dispará la productividad y ejecutá tus programas y aplicaciones con mayor velocidad.\n\nPotenciá tu PC\nCon su tecnología DDR4, mejorará el desempeño de tu equipo, ya que aumentará la fluidez y la velocidad en la transferencia de datos ¡Optimizá al máximo el rendimiento de tu computadora y reducí el consumo energético!\n\nTu equipo como nuevo\nEsta memoria de formato SODIMM es ideal para tu Notebooks. ¡Instalala y comenzá a disfrutar de un óptimo funcionamiento!',
        imageUrl: [
          'https://www.atajo.com.ar/images/000KVR26N19S8-1612073KVR26N19S816.jpg',
        ],
        price: 12.35,
        prod_type: {
          id: 3,
          name: 'RAM',
        },
      },
      user_id: 1,
      order_state: 'PENDING',
    },
    {
      shop_order_id: 6,
      total: 89.99,
      cantidad: 1,
      product: {
        id: 2,
        name: 'NVIDIA GEFORCE 2070 SUPER',
        brand: 'ASUS',
        about:
          'ASUS Turbo GeForce® RTX 2070 SUPER™ EVO 8GB GDDR6 con refrigeración de alto rendimiento para disfrutar de juegos triple A con frecuencias de refresco más altas y VR gaming\nNúcleos RT: El hardware de trazado de rayos produce una representación en tiempo real de objetos y entornos más realista, con sombras, reflejos, refracciones y una iluminación global más precisa y natural.\nPunto flotante concurrente y procesamiento de enteros: Las GPU Turing procesan de manera más eficiente las pesadas cargas de trabajo de los juegos actuales.\nGDDR6 de alta velocidad: Disfruta de juegos con una acción trepidante en alta resolución con un ancho de banda de memoria de hasta 496 GB/s.\nEl nuevo diseño de cubierta permite que ventile mejor en configuraciones con un espacio limitado.\nLos rodamientos a bolas llegan a durar el doble que los cojinetes de fricción tradicionales.\nLa tecnología Auto-Extreme aumenta la fiabilidad automatizando la manufactura.\nGPU Tweak II permite ajustar el rendimiento, la temperatura y supervisar el sistema de forma intuitiva.\nEl programa de validación de 144 horas contrasta la compatibilidad con los últimos juegos.',
        imageUrl: [
          'https://http2.mlstatic.com/D_NQ_NP_670500-MLA51412092733_092022-O.jpg',
          'https://http2.mlstatic.com/D_NQ_NP_806156-MLA40339821636_012020-O.jpg',
        ],
        price: 89.99,
        prod_type: {
          id: 2,
          name: 'GPU',
        },
      },
      user_id: 1,
      order_state: 'PENDING',
    },
    {
      shop_order_id: 7,
      total: 167.45,
      cantidad: 1,
      product: {
        id: 8,
        name: 'i9 13900k',
        brand: 'Intel',
        about:
          'The 13th Gen Intel® Core™ desktop processors deliver the next generation of breakthrough core performance. Now with up to 24 cores (8 Performance-cores and 16 Efficient-cores) and up to 32 threads.',
        imageUrl: [
          'https://http2.mlstatic.com/D_NQ_NP_851671-MLA52221724022_102022-O.webp',
        ],
        price: 167.45,
        prod_type: {
          id: 1,
          name: 'CPU',
        },
      },
      user_id: 1,
      order_state: 'PENDING',
    },
  ];
}

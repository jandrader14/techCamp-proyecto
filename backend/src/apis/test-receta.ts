// test-receta.ts

// En src/test-receta.ts
import { generarRecetas } from './openAI.service';

async function probarGenerarReceta() {
  const productosDePrueba = ['plátano maduro', 'queso costeño', 'bocadillo', 'harina de trigo'];

  try {
    console.log('Generando receta...');
    const receta = await generarRecetas(productosDePrueba);
    console.log('\n--- Receta Generada ---');
    console.log('Ingredientes:', receta.ingredientes);
    console.log('Pasos:', receta.pasos);
    console.log('URL de la imagen:', receta.imageUrl);
  } catch (error) {
    console.error('Error al generar la receta:', error);
  }
}

probarGenerarReceta();
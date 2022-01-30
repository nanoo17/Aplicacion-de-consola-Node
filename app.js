require ('colors');

//const { mostrarMenu, pausa } = require('./helpers/mensajes');

const {
   inquirerMenu,
    pausa,
   leerInput,
   listadoTareasBorrar,
   confirmar,
   listadoTareasCompletar} = require('./helpers/inquirer');
//const Tarea = require('./models/tarea');
//Tareas es una clase por ende al importarla
//se importa todos son metodos
const Tareas = require('./models/tareas');
//a diferencia de estos archivos.js que tenes que importar los metodos
//uno por uno
const {guardarInfo,leerBD} = require('./helpers/guardarArchivo');
//console.clear();
const main = async() =>{


let opt = '';
const tareas = new Tareas();

const tareasBD = leerBD();

if(tareasBD){
   //cargar tareas

   tareas.cargarTareasFromArray( tareasBD);
   
}



do{
   opt = await inquirerMenu();
   //console.log(opt);
   switch (opt) {
      case '1':
         //crear tarea
         const desc = await leerInput('Descripcion: ');
         console.log(desc);
         tareas.crearTarea(desc);
         break;
      case '2':
         //listar tareas
         //console.log(tareas.listadoArr);
         tareas.listadoCompleto();
         break;
      case '3':
         //listar tareas completadas
         console.log();
         console.log('Tareas Completadas: ');
         tareas.listarPendientesCompletadas(true);
         break;
      case '4':
         //listar tareas pendientes
         console.log();
         console.log('Tareas Pendientes: ');
         tareas.listarPendientesCompletadas(false);
         break;
      case '5':
         //completar tareas
         const ids = await listadoTareasCompletar(tareas.listadoArr);

         tareas.completarTareas(ids);


         break;
      case '6':
         const id = await listadoTareasBorrar(tareas.listadoArr);
         
         if(id!=='0'){
            const ok = await confirmar('¿Estas seguro?');
            if(ok){
               tareas.borrarTarea(id);
               console.log('Tarea borrada'.blue);
            }
            console.log({id});
         }
         
         break;
      case '0':
         console.log('El programa finalizo con exito'.rainbow);
         break;
      default:
         console.log('Ingreso incorrecto'.red);
         break;
   }

   
   //guarda los datos en el archivo por cada vuelta del do
   guardarInfo(tareas.listadoArr);
   
   
   
   /*const tareas = new Tareas(); 
   const tarea = new Tarea('Comprar Comida');
   tareas._listado[tarea.id] = tarea;
   console.log(tareas);*/
   console.log();
   if(opt !== '0')await pausa();
}while(opt !== '0')

//pausa();
}

main();

//
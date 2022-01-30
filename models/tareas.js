

const Tarea = require('./tarea');
/*
listado es un objeto con objetos(en este caso tareas) dentro
para acceder mejor a los datos
cuando se guarden ahi
*/

class Tareas{
_listado = {};

get listadoArr() {
const listadoArreglo = [];
Object.keys(this._listado).forEach(key =>{
    const tarea = this._listado[key];
    listadoArreglo.push(tarea);
})


return listadoArreglo;
}

constructor(){
    this._listado = {};
}


borrarTarea(id = ''){
if(this._listado[id]){
    delete this._listado[id];
}
}


cargarTareasFromArray(tareas = []){

    tareas.forEach(tarea =>{
    this._listado[tarea.id] = tarea;
    });
    
}

crearTarea(desc= ''){
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
}

listadoCompleto(){
    console.log();
    let numero = 0;
    this.listadoArr.forEach(tarea=>{
        numero = numero + 1;
        const {descripcion , completado} = tarea;
        const estado = (completado)
                        ? 'Completada'.green
                        : 'Pendiente'.red;

        console.log(`${numero}. `.green + descripcion + ':: ' + estado) ;
    })
}

listarPendientesCompletadas(completadas = true){
    let numero = 0;

    this.listadoArr.forEach(tarea=>{
        const {descripcion , completado} = tarea;
        const estado = (completado)
                        ? 'Completada'.green
                        : 'Pendiente'.red;

        if(completadas===true){
            if(completado){
            numero = numero + 1;
            console.log(`${numero}. `.green + descripcion + ':: ' + completado.green) ;
        }
        }else{
            if(!completado){
                numero = numero + 1;
                console.log(`${numero}. `.green + descripcion + ':: ' + estado) ;

            }
        }

    })

}


completarTareas(ids = []){

    ids.forEach(id=>{
        const tarea = this._listado[id];
        if(!tarea.completado){
            tarea.completado = new Date().toISOString();
        }
    });

    this.listadoArr.forEach(tarea=>{
        if(!ids.includes(tarea.id)){
             tarea = this._listado[tarea.id].completado = null;
           // tarea.completado = null;
        }
    })
}
}

module.exports = Tareas;
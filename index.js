class Usuario{
    constructor(nombre=String,apellido=String,libros=[],mascotas=[]){
        this.nombre= nombre
        this.apellido= apellido
        this.libros= libros
        this.mascotas= mascotas
    }

    getFullName(){
        return(
            console.log(`Nombre: ${this.nombre}, Apellido: ${this.apellido},`)
        )
    }

    addMascota(nombreMascota){
        this.mascotas.push(nombreMascota)
        console.log(`Mascota Agregada con exito. Mascotas: ${this.mascotas}`)
    }

    countMascotas(){
        let Count=this.mascotas.length
        return(
            console.log(`Numero de Mascotas: ${Count}`)
        )
    }

    addBook(libro, autor){
            let newBook={
                libro,
                autor,
            }

        this.libros.push(newBook)
        console.log(`Tu libro fue Agregado con exito.`)
    }
    getBookNames(){
       let librosDelUsuario="";
       for (const libro of this.libros){
        librosDelUsuario= `${librosDelUsuario}, ${libro.libro}`
       }
        console.log(`Los nombres de los libros del usuario son: ${librosDelUsuario}`)
    }
}


const usuario1= new Usuario("Samuel","Arzelan", [{libro:"El mago de Oz", autor:"L. Frank Baum"},{libro:"El Principito", autor: "Antoine de Saint-Exupéry"}], ["tino"])

const fs = require('fs');

class Contenedor {
    constructor(title, price, thumbnail){      
       this.title = title;
       this.price = price;
       this.thumbnail = thumbnail;
    }

   async save(obj){
        try{
            await fs.readFile('productos.json','utf-8', (error, contenido) => {
                if (error){
                    console.log(error);
                    return false;
                }else{                        
                    let idActual;
                    let json = [];
                    if (contenido.length == 0){
                        idActual = 1;
                        obj.id = idActual;
                        json.push(obj);
                        fs.writeFile("productos.json", JSON.stringify(json) + "\r\n", err => {
                            if (err){                                                   
                                return err;
                            }else {                                                            
                                return idActual;
                            }
                        });      
                    }else {          
                        json = JSON.parse(contenido);             
                        let lastItem = 0;
                        json.forEach((value, i) => { 
                            lastItem++;
                        });                                               
                        idActual = lastItem + 1;    
                        obj.id = idActual;          
                        json.push(obj); 
                        fs.writeFile("productos.json", JSON.stringify(json) + "\r\n", err => {
                            if (err){                                                   
                                return err;
                            }else {            
                                return idActual;
                            }
                        });     
                    }    
                }
            }); 
        }catch (err){
            console.log("ERROR!!! "+err);
        }
    }

   async getById(id){
        try {
            const contenido = JSON.parse(await fs.promises.readFile('productos.json','utf-8'));
            if (contenido.length == 0){
                return "No hay información en el archivo";
            }else {          
                let status = 0;
                let retorno = [];                           
                contenido.forEach((value,i) => { 
                                 
                    if(value.id == id){
                        status = 1;
                        retorno = value;   
                    }
                });
                if (status === 1){
                    return retorno;
                }else {
                    return "NO se encontro el valor";
                }
            } 
            
        }catch (error){
            console.log(error);
        }
    }

   async getAll(){
        try {
            const contenido = JSON.parse(await fs.promises.readFile('productos.json','utf-8'));
            return contenido;
        }catch (error){
            console.log(error);
        }
    }

    async deleteById(id){
        await fs.readFile('productos.json','utf-8', (error, contenido) => {
            if (error){
                console.log(error);
                return false;
            }else{                        
                let json = [];
                if (contenido.length == 0){
                    console.log("No hay información en el archivo");
                }else {          
                    json = JSON.parse(contenido);      
                    json.forEach((value, i) => {
                        if(value.id == id){                            
                            json.splice(i, 1);
                            let stat = this.deleteAll();
                            if (stat != ''){
                                this.save(json);                            
                                return id;
                            }
                        }
                    });               
                }           
            }
        }); 
    }

    async deleteAll(){
        await fs.writeFile("productos.json", "", err => {
            if (err){
                console.error(err);                            
            }else {
                //console.log('ok borrado todo');
                return 'ok';
            }
        });   
    }
}

//export default Contenedor;
module.exports = Contenedor;
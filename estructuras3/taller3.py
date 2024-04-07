from fastapi import FastAPI
import mook

app = FastAPI()

revisado = {}

@app.get('/')
def root():
    return {"Servicio": "Estructuras de datos"}

#Url que recibe un parametro tipo_tutela
@app.get('/api/v1/search')
def busqueda_tutela(tipo_tutela: str):
    
    #Verfica si ya se habia revisado este tipo de tutela
    if tipo_tutela in revisado:
        return revisado[tipo_tutela]

    #Diccionrio decretos revisado
    decretos = {}
    #Lista de respuesta
    result = []

    #Recorrer cada tutela en el archivo
    for indice, tutela_info in enumerate(mook.tutela):
        #comprobar si es el tipo de tutela
        if tipo_tutela.lower() in tutela_info["resumen"].lower():
            #obtener el numero de decreto
            decreto = tutela_info["decreto"] 
            #Comprueba si el decreto ya se habia revisado
            if decreto not in decretos:
                #Ubicar el decreto en la lista
                decretos[decreto] = len(result)
                data = { "decreto": decreto,
                        "tutelas":[]
                }
                result.append(data)
            else:
                #obtener datos de ese decreto
                data = result[decretos[decreto]]
            
            #añadir tutela a lista del decreto
            data["tutelas"].append(tutela_info)

    #añadir para futuras consultas
    revisado[tipo_tutela] = result
    return result
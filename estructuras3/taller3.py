from fastapi import FastAPI
import mook

app = FastAPI()

revisado = {}

@app.get('/')
def root():
    return {"Servicio": "Estructuras de datos"}

@app.post('/api/v1/search')
def busqueda_tutela(tipo_tutela: str):
    print (tipo_tutela)
    '''    if tipo_tutela in revisado:
        return revisado[tipo_tutela]

    result = {
        
    }

    for indice, tutela_info in enumerate(mook.tutela):
        if tipo_tutela.lower() in tutela_info["resumen"].lower():
            
            result["tutelas"].append(tutela_info)

    revisado[tipo_tutela] = result'''
    return "result"
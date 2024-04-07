import numpy as np
import time

# Definir el tamaño de las matrices
n = 1000
m = 1000
p = 1000

# Generar matrices aleatorias
A = np.random.rand(n, m)
B = np.random.rand(m, p)

# Multiplicación de matrices usando NumPy
start_time = time.time()
C = np.dot(A, B)
end_time = time.time()

# Imprimir el tiempo de ejecución
print("Tiempo de ejecución en CPU: {} segundos".format(end_time - start_time)) 


import tensorflow as tf
import time

# Definir el tamaño de los tensores
n = 1000
m = 1000
p = 1000

# Generar tensores aleatorios
A = tf.random.uniform((n, m))
B = tf.random.uniform((m, p))

# Multiplicación de tensores usando TensorFlow en CPU
start_time_cpu = time.time()
C_cpu = tf.matmul(A, B)
end_time_cpu = time.time()

# Multiplicación de tensores usando TensorFlow en GPU
with tf.device('/device:GPU:0'):
    start_time_gpu = time.time()
    C_gpu = tf.matmul(A, B)
    end_time_gpu = time.time()

# Multiplicación de tensores usando TensorFlow en TPU
resolver_tpu = tf.distribute.cluster_resolver.TPUClusterResolver()
tf.config.experimental_connect_to_cluster(resolver_tpu)
tf.tpu.experimental.initialize_tpu_system(resolver_tpu)
estrategia = tf.distribute.TPUStrategy(resolver_tpu)
with estrategia.scope():
    start_time_tpu = time.time()
    C_tpu = tf.matmul(A, B)
    end_time_tpu = time.time()

# Imprimir tiempos de ejecución
print("Tiempo de ejecución en CPU: {} segundos".format(end_time_cpu - start_time_cpu))
print("Tiempo de ejecución en GPU: {} segundos".format(end_time_gpu - start_time_gpu))
print("Tiempo de ejecución en TPU: {} segundos".format(end_time_tpu - start_time_tpu))

import time
import random

def binary_search(arr, x):
    left, right = 0, len(arr) - 1

    while left <= right:
        mid = (left + right) // 2

        if arr[mid] == x:
            return mid

        elif arr[mid] < x:
            left = mid + 1

        else:
            right = mid - 1

    return -1

def main():
    sizes = [1000, 10000, 100000, 1000000, 10000000, 100000000]

    for size in sizes:
        arr = generate_random_array(size)
        x = random.randint(0, size - 1)

        start_time = time.time()
        result = binary_search(arr, x)
        end_time = time.time()

        duration = (end_time - start_time) * 1000  # Convertir a milisegundos
        print(f"Tamaño de entrada: {size}, Tiempo de ejecución: {duration:.2f} ms, Resultado: {result}")

def generate_random_array(size):
    return sorted(random.sample(range(0, size * 2), size))

if __name__ == "__main__":
    main()

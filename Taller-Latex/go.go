package main

import (
    "fmt"
    "os"
    "runtime/pprof"
)

func main() {
    f, err := os.Create("profile.prof")
    if err != nil {
        fmt.Println("Error creating profile file:", err)
        return
    }
    defer f.Close()

    // Iniciar el profiling de CPU
    pprof.StartCPUProfile(f)
    defer pprof.StopCPUProfile()

    // Creamos un slice mutable
    mutableSlice := []int{1, 2, 3}
    
    // Modificamos el slice
    mutableSlice[0] = 10
    mutableSlice = append(mutableSlice, 4)
    
    fmt.Println("Slice mutable modificado:", mutableSlice)
}
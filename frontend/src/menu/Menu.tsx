
import { useEffect, useState } from "react";
import { obtenerProductos } from "../api/productos.api";
import type { Producto } from "../api/productos.schema";
import { SelectorCafe } from "../cafe/SelectorCafe";
import { Pasteleria } from "../pasteleria/Pasteleria";

export function Menu() {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function cargarProductos() {
            try {
                const resultado = await obtenerProductos();
                setProductos(resultado);
            } catch {
                setError(true);
            } finally {
                setCargando(false);
            }
        }

        void cargarProductos();
    }, []);

    return (
        <section aria-labelledby="titulo-menu">
            <h2 id="titulo-menu">Menú</h2>

            {cargando ? (
                <p role="status">Cargando menú...</p>
            ) : error ? (
                <p role="alert">No se pudo cargar el menú.</p>
            ) : (
                <>
                    <SelectorCafe productos={productos} />
                    <Pasteleria productos={productos} />
                </>
            )}
        </section>
    );
}


import { EncabezadoMesa } from "./mesa/EncabezadoMesa";
import { leerMesa } from "./mesa/leerMesa";
import { CarritoProvider } from "./carrito/CarritoContext";
import { Carrito } from "./carrito/Carrito";
import { Menu } from "./menu/Menu";
import { ConfirmarPedido } from "./pedidos/ConfirmarPedido";
import { SelectorCafe } from "./cafe/SelectorCafe";
import { Pasteleria } from "./pasteleria/Pasteleria";

export default function App() {
    const mesa = leerMesa(window.location.search);

    return (
        <CarritoProvider>
            <main className="container py-3">
                <EncabezadoMesa mesa={mesa} />

                <Menu />
                <SelectorCafe />
                <Pasteleria />

                <Carrito />
                <ConfirmarPedido mesa={mesa} />
            </main>
        </CarritoProvider>
    );
}

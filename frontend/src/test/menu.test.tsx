import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { obtenerProductos } from "../api/productos.api";
import { Menu } from "../menu/Menu";

vi.mock("../api/productos.api", () => ({
    obtenerProductos: vi.fn(),
}));

describe("Menu", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("muestra el encabezado del menú", () => {
        render(<Menu />);

        expect(
            screen.getByRole("heading", { name: "Menú" }),
        ).toBeInTheDocument();
    });

    it("es una región accesible con el nombre Menú", () => {
        render(<Menu />);

        expect(
            screen.getByRole("region", { name: "Menú" }),
        ).toBeInTheDocument();
    });

    it("no consulta la API ni muestra productos", () => {
        render(<Menu />);

        expect(obtenerProductos).not.toHaveBeenCalled();
        expect(screen.queryByText("Expreso")).not.toBeInTheDocument();
        expect(screen.queryByText("Muffin")).not.toBeInTheDocument();
    });
});
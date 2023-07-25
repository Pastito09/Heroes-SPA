import { fireEvent, render, screen } from "@testing-library/react";
import { AuthContext } from "../../../src/auth";
import { Navbar } from "../../../src/ui/components/Navbar";
import { MemoryRouter, useNavigate } from "react-router-dom";

const mockedUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),// desestructura todo lo que viene en la libreria
    useNavigate: () => mockedUseNavigate // solo sobreescribe el useNavigate
}));


describe('pruebas en <Navbar />', () => { 
        
        const contextValue = {
            user: {
                id: "123",
                name: "John",
            },
            logout: jest.fn()
        };

    test('debe de mostrar el nombre del usuario que esta logueado', () => { 
        
        render(
            <MemoryRouter>
                <AuthContext.Provider value={ contextValue }> 
                    <Navbar />
                </AuthContext.Provider>
            </MemoryRouter>

        )
        //screen.debug();
        //console.log(provider.user.name)
        expect( screen.getByText(contextValue.user.name) ).toBeTruthy();
        expect( screen.getByText("John") ).toBeTruthy();
     });

     test('debe de llamar el logout y navigate cuando hace click en el boton', () => { 
        
        render(
            <MemoryRouter>
                <AuthContext.Provider value={ contextValue }> 
                    <Navbar />
                </AuthContext.Provider>
            </MemoryRouter>
        )

        const logoutbtn = screen.getByRole("button");
        fireEvent.click( logoutbtn );

        expect( contextValue.logout ).toHaveBeenCalled();
        expect( mockedUseNavigate ).toHaveBeenCalledWith(
            '/login', {
            replace: true
        });
        

      });


 });
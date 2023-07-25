import { render, screen } from "@testing-library/react";
import { AuthContext } from "../../src/auth";
import { MemoryRouter } from "react-router-dom";
import { AppRouter } from "../../src/router/AppRouter";

describe('Pruebas en <AppRouter />', () => { 

    test('debe de mostrar el login su no esta autenticado', () => { 

        const contextValue = {
            logged: false,
        }

        render(
            
                <MemoryRouter initialEntries={['/marvel']}>
                    <AuthContext.Provider value={ contextValue }>
                        <AppRouter />
                    </AuthContext.Provider>
                </MemoryRouter>
            );
            //screen.debug();
            
            expect( screen.getByText("Login Page") ).toBeTruthy();
     });

     test('debe de mostrar el componenete de Marvel si esta autenticado', () => { 
        
        const contextValue = {
            logged: true,
            user: {
                id: "123",
                name: "Charles"
            }
        }

        render(
            
                <MemoryRouter initialEntries={['/login']}>
                    <AuthContext.Provider value={ contextValue }>
                        <AppRouter />
                    </AuthContext.Provider>
                </MemoryRouter>
            );
            //screen.debug();
            expect( screen.getByText("Marvel Page") ).toBeTruthy();
            expect( screen.getAllByText("Marvel").length ).toBeGreaterThanOrEqual(1);
      });

 });
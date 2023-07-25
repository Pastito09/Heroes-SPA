import { fireEvent, render, screen } from "@testing-library/react";
import { SearchPage } from "../../../src/heroes/pages/SearchPage";
import { MemoryRouter } from "react-router-dom";

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    mockedUseNavigate: () => mockedUseNavigate,
}));

describe('pruebas en <SearchPage />', () => { 

    beforeEach(() => jest.clearAllMocks());
    
        test('debe de mostrarse correctamente con valores por defecto', () => { 
        

            const { container } = render(
                <MemoryRouter>
                    <SearchPage />

                </MemoryRouter>
     
                );
            
            expect( container ).toMatchSnapshot();
            //screen.debug()
     });

     test('debe de mostrar a Batman y el input con el valor del queryString', () => { 
        

        render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage />
            </MemoryRouter>
            );
        
        const input = screen.getByRole("textbox")
        //expect( input.value ).toBe('batman');

        //const img = screen.getByRole("img");
        //expect( img.src ).toContain('/public/heroes/dc-batman.jpg');

        const alert = screen.getByLabelText("alert-danger");
        //expect( alert.style.display ).toBe('none');

 });

    test('debe de mostrar un erro si no se encuentra el heroe (batman123)', () => {

        render(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchPage />
            </MemoryRouter>
            );

        const alert = screen.getByLabelText("alert-danger");
        //expect( alert.style.display ).toBe('')

    });

    test('debe de llamar el navigate a la pantalla nueva', () => { 
        
        const inputValue = 'superman';

        render(
            <MemoryRouter initialEntries={['/search']}>
                <SearchPage />
            </MemoryRouter>
            );
            
            const input = screen.getByRole('textbox');
            fireEvent.change(input, { target: {name: 'searchText', value: inputValue }});
            //console.log(input.value)

            const form = screen.getByRole('form');
            fireEvent.submit(form);

            expect( mockedUseNavigate ).toHaveBeenCalledWith(`?=${ inputValue }`);
     });
     
 });
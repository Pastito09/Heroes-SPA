import { authReducer } from "../../../src/auth/context/authReducer";
import { types } from "../../../src/auth/types/types";

describe('pruebas en el authReducer', () => { 

    test('debe retornar el estado por defecto', () => { 
        
        const estadoInicial = authReducer({ logged: false }, {});
        expect( estadoInicial ).toEqual({ logged: false });
    

     });
     
    test('debe de llamar el login y autenticar y establecer el user', () => {
        const action = {
            type: types.login,
            payload: {
                name: "tu vieja",
                id: "123"
            }
        }
        const state = authReducer({ logged: false }, action);
        expect( state ).toEqual({
            logged: true,
            user: action.payload
        });
    });

    test('el logout debe de borrar el name del usuario y el logged en false', () => { 
        const state = {
            logged: true,
            user: {id: "123", name: "tu vieja"}
        }
        const action = {
            type: types.logout,
            payload: {
                name: "tu vieja",
                id: "123"
            }
        }
        const newState = authReducer( state, action );
        
        expect(newState ).toEqual({ logged: false })

     });

 });
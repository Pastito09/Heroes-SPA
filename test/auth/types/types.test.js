import { types } from "../../../src/auth/types/types";

describe('pruebas en Types', () => { 
    
    test('debe regresar estos types', () => { 

        expect(types).toEqual({
            login:  '[Auth] Login',
            logout: '[Auth] Logout',
        })
     });

 });
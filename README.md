La aplicación descrita es una API REST básica desarrollada en Node.js para consumir APIs de OpenExchangeRates, además de proporcionar un registro y inicio de sesión simple utilizando Firebase.

* **Registro en Firebase:**
    * Método: POST
    * URL: `localhost:3000/auth/register`
    * Body:
        
        jsonCopy code
        
        `{
            "email": "jorge@test.com",
            "password": "12345user"
        }` 
        
* **Inicio de sesión en Firebase:**
    * Método: POST
    * URL: `localhost:3000/auth/login`
    * Body:
        
        jsonCopy code
        
        `{
            "email": "jorge@test.com",
            "password": "12345user"
        }` 
        
* **Obtener lista de monedas disponibles:**
    * Método: GET
    * URL: `localhost:3000/rates/aviable-currency`
    * Autenticación: Token de Bearer
* **Obtener tasas más recientes:**
    * Método: GET
    * URL: `localhost:3000/rates/latest-rates`
    * Autenticación: Token de Bearer
    * Body:
        
        jsonCopy code
        
        `{
            "symbols": "COP"
        }` 
        
* **Obtener tasa histórica de una fecha:**
    * Método: GET
    * URL: `localhost:3000/rates/historical-rates`
    * Autenticación: Token de Bearer
    * Body:
        
        jsonCopy code
        
        `{
            "date": "2023-02-02"
        }` 
        
* **Convertir moneda:**
    * Método: GET
    * URL: `localhost:3000/rates/convert-currency`
    * Autenticación: Token de Bearer
    * Body:
        
        jsonCopy code
        
        `{
            "value": 1000,
            "from": "COP",
            "to": "USD"
        }`

---
## Copyright (c) 2024
 - [Jorge Ivan Carrillo](https://www.linkedin.com/in/jorgecarrillog/)
 - [MIT License](LICENSE.md) 
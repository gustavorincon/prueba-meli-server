const { Router } = require('express');

const router = Router();

router.get('/:id', (req, res) => {
    res.json({
        author: {
            name: 'Gustavo',
            lastname: 'Rincon'
        },
        item: {
            id: '123',
            title: 'Moto g ',
            price: {
                currency: '$',
                amount: 123,
                decimals: 123,
            },
            picture: 'https://http2.mlstatic.com/D_634147-MLA46042090524_052021-I.jpg',
            condition: 'Ninguna',
            free_shipping: true,
            sold_quantity: 123,
            description: 'Información importante: Por favor confirmar tallas y colores disponibles Modelo mejorado con Grupo Shimano Altus de 9 vel (27 cambios), set completo con Frenos Hidráulicos, Pacha, Tensor, Desviador, Cadenilla, etc... todo Shimano de la misma gama. Marco en Aluminio Alpha Silver con tubo de dirección semi integrado, tubos cónicos hidro formados, recorrido interno de los cables del desviador y puntera de cambio desmontable.'
        }
    })
});

/*router.get('?q:query', (req, res) => {
    res.json({
        ok: true,
        msg: 'Hola mundorrrrrrrr'
    })
});*/



module.exports = router;
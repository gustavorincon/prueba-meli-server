const axios = require('axios');
const author = {
    name: "Gustavo Adolfo",
    lastname: "Rincon Casallas"
};

const getItem = (req, res) => {
    axios(`${process.env.URL_BASE}/items/${req.params.id}`).then(responseitem => {
        return Promise.all([
                axios(`${process.env.URL_BASE}/categories/${responseitem.data.category_id}`).then(response => response.data),
                axios(`${process.env.URL_BASE}/items/${responseitem.data.id}/description`).then(response => response.data)
            ])
            .then(([category, description]) => {
                let categories = (category.path_from_root || [])
                    .map(path => path.name);
                let item = {
                    id: responseitem.data.id,
                    title: responseitem.data.title,
                    price: {
                        currency: responseitem.data.currency_id,
                        amount: responseitem.data.available_quantity,
                        decimals: responseitem.data.price
                    },
                    picture: responseitem.data.pictures && responseitem.data.pictures.length > 0 ? responseitem.data.pictures[0].url : responseitem.data.thumbnail,
                    condition: responseitem.data.condition,
                    free_shipping: (responseitem.data.shipping && responseitem.data.shipping.free_shipping === true),
                    sold_quantity: responseitem.data.sold_quantity,
                    description: description.plain_text
                };
                res.send({
                    author,
                    categories,
                    item
                });
            });
    }).catch(error => console.log(error));
}



const getItems = (req, res) => {
    res.json({
        author: {
            name: 'Gustavo',
            lastname: 'Rincon'
        },
        categories: ['Electronico', 'Digital', 'Celular'],
        items: [{
                id: '123',
                title: 'Moto g 5',
                price: {
                    currency: '$',
                    amount: 23,
                    decimals: 12
                },
                picture: 'https://http2.mlstatic.com/D_634147-MLA46042090524_052021-I.jpg',
                condition: 'Ninguna',
                free_shipping: false,
                location: {
                    state: 'DF',
                    city: 'Ciudad de mexico'
                }
            },
            {
                id: '1233',
                title: 'Moto G 6',
                price: {
                    currency: '$',
                    amount: 2322,
                    decimals: 1233
                },
                picture: 'https://http2.mlstatic.com/D_634147-MLA46042090524_052021-I.jpg',
                condition: 'Ninguna',
                free_shipping: true,
                location: {
                    state: 'DF',
                    city: 'Ciudad de mexico'
                },
            },
            {
                id: '1233',
                title: 'Moto G 6',
                price: {
                    currency: '$',
                    amount: 2322,
                    decimals: 1233
                },
                picture: 'https://http2.mlstatic.com/D_634147-MLA46042090524_052021-I.jpg',
                condition: 'Ninguna',
                free_shipping: false,
                location: {
                    state: 'DF',
                    city: 'Ciudad de mexico'
                },
            },
            {
                id: '1233',
                title: 'Moto G 6',
                price: {
                    currency: '$',
                    amount: 2322,
                    decimals: 1233
                },
                picture: 'https://http2.mlstatic.com/D_634147-MLA46042090524_052021-I.jpg',
                condition: 'Ninguna',
                free_shipping: true,
                location: {
                    state: 'DF',
                    city: 'Ciudad de mexico'
                },
            }

        ]
    })
}




module.exports = {
    getItems,
    getItem
}
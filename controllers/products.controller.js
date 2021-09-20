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
    axios(`${process.env.URL_BASE}${process.env.COMPLEMENT_URL_SEARCH}?q=${req.query.q}`).then(responseitems => {
        let listCategory = [];
        let items = [];
        if (responseitems.data) {
            listCategory = (responseitems.data.filters || [])
                .filter(category => category.id === 'category')
                .map(category => category.values
                    .map(value => value.path_from_root
                        .map(path => path.name)
                    )
                    .find(() => true)
                )
                .find(() => true);

            for (let i = 0; i < 4; i++) {
                const item = responseitems.data.results[i];
                items.push({
                    id: item.id,
                    title: item.title,
                    price: {
                        currency: item.currency_id,
                        amount: item.available_quantity,
                        decimals: item.price
                    },
                    picture: item.thumbnail,
                    condition: item.condition,
                    free_shipping: (item.shipping && item.shipping.free_shipping === true),
                    location: {
                        state: item.address.state_name,
                        city: item.address.city_name
                    }
                });
            }
        }
        res.send({
            author,
            listCategory,
            items
        });
    }).catch(error => console.log(error));;
}


module.exports = {
    getItems,
    getItem
}
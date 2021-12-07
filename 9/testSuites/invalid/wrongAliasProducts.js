const baseProductValues = {
    id: 1,
    category_id: 1,
    content: "текст",
    price: 100,
    old_price: 90,
    status: 1,
    keywords: "текст",
    description: "текст",
    hit: 1,
}

module.exports = [
    {
        ...baseProductValues,
        title: "тест",
        alias: "something_wrong",
    },
    {
        ...baseProductValues,
        title: "Casio MRP-700-1AVEF",
        alias: "casio-mrp-700-1avef",
    },
]

const baseProductValues = {
    id: 1,
    category_id: 10,
    title: "тест!!!!!!",
    alias: "test!!!!!!",
    content: "текст",
    price: 100,
    old_price: 90,
    keywords: "текст",
    description: "текст",
    hit: 1,
}

module.exports = [
    {
        ...baseProductValues,
        status: -1,
    },
    {
        ...baseProductValues,
        status: 2,
    },
]

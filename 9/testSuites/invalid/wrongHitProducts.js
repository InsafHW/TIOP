const baseProductValues = {
    id: 1,
    category_id: 10,
    title: "тест!!!!!",
    alias: "test!!!!!",
    content: "текст",
    price: 100,
    old_price: 90,
    status: 1,
    keywords: "текст",
    description: "текст",
}

module.exports = [
    {
        ...baseProductValues,
        hit: -1,
    },
    {
        ...baseProductValues,
        hit: 2,
    },
]

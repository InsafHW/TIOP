const baseProductValues = {
    id: 1,
    title: "тест!!!",
    alias: "test!!!",
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
        category_id: "не число",
    },
    {
        ...baseProductValues,
        category_id: 0,
    },
    {
        ...baseProductValues,
        category_id: 16,
    }
]

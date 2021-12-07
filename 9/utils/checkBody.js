function getAlias(text, existingAliases) {
    let alias = ''
    const converter = {
        'а': 'a',    'б': 'b',    'в': 'v',    'г': 'g',    'д': 'd',
        'е': 'e',    'ё': 'e',    'ж': 'zh',   'з': 'z',    'и': 'i',
        'й': 'y',    'к': 'k',    'л': 'l',    'м': 'm',    'н': 'n',
        'о': 'o',    'п': 'p',    'р': 'r',    'с': 's',    'т': 't',
        'у': 'u',    'ф': 'f',    'х': 'h',    'ц': 'c',    'ч': 'ch',
        'ш': 'sh',   'щ': 'sch',  'ь': '',     'ы': 'y',    'ъ': '',
        'э': 'e',    'ю': 'yu',   'я': 'ya',
    }

    for (let i = 0; i < text.length; i++) {
        if (converter[text[i]] == undefined){
            alias += text[i];
        } else {
            alias += converter[text[i]];
        }
    }

    return existingAliases.includes(alias)
        ? alias + '-0'
        : alias
}

function isRequestBodyOK({
    id,
    category_id,
    title,
    alias,
    content,
    price,
    old_price,
    status,
    keywords,
    description,
    hit,
}, existingAliases) {
    return  {
        id: typeof id === 'number',
        category_id: typeof category_id === 'number' && category_id >= 1 && category_id <= 15,
        title: typeof title === 'string',
        alias: typeof title === 'string' ? typeof alias === 'string' && alias === getAlias(title.toLowerCase(), existingAliases) : true,
        content: typeof content === 'string',
        price: typeof price === 'number',
        old_price: typeof old_price === 'number',
        status: status === 0 || status === 1,
        keywords: typeof keywords === 'string',
        description: typeof description === 'string',
        hit: hit === 0 || hit === 1,
    }
}

module.exports = isRequestBodyOK

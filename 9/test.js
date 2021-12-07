const request = require('supertest')('http://91.210.252.240:9010/api/')
const assert = require('chai').assert
const isRequestBodyOK = require('./utils/checkBody')

const wrongIdProduct = require('./testSuites/invalid/wrongIdProduct')
const wrongCategoryIdProducts = require('./testSuites/invalid/wrongCategoryIdProducts')
const wrongTitleProduct = require('./testSuites/invalid/wrongTitleProduct')
const wrongAliasProducts = require('./testSuites/invalid/wrongAliasProducts')
const wrongContentProduct = require('./testSuites/invalid/wrongContentProduct')
const wrongPriceProduct = require('./testSuites/invalid/wrongPriceProduct')
const wrongOldPriceProduct = require('./testSuites/invalid/wrongOldPriceProduct')
const wrongStatusProducts = require('./testSuites/invalid/wrongStatusProducts')
const wrongKeywordsProduct = require('./testSuites/invalid/wrongKeywordsProduct')
const wrongDescriptionProduct = require('./testSuites/invalid/wrongDescriptionProduct')
const wrongHitProducts = require('./testSuites/invalid/wrongHitProducts')

const validProduct1 = require('./testSuites/valid/validProduct1')
const validProduct2 = require('./testSuites/valid/validProduct2')
const validProduct3 = require('./testSuites/valid/validProduct3')
const validProduct4 = require('./testSuites/valid/validProduct4')

const existingAliases = []
const existingIds = []
const addedIds = []
const NON_EXISTING_ID = -1

const productFields = {
    id: 'id',
    categoryId: 'category_id',
    title: 'title',
    alias: 'alias',
    content: 'content',
    price: 'price',
    oldPrice: 'old_price',
    status: 'status',
    keywords: 'keywords',
    description: 'description',
    hit: 'hit',
}

function checkFieldIsWrong(product, fieldId = null) {
    const validatedResult = isRequestBodyOK(product, existingAliases)
    // console.log(validatedResult)
    Object.keys(validatedResult).forEach(key => {
        if (fieldId === null) {
            assert(validatedResult[key] === true)
        }
        else if (key === fieldId) {
            assert(validatedResult[key] === false)
        } else {
            assert(validatedResult[key] === true)
        }
    })
}

describe('Products API', () => {
    it('GET /products', (done) => {
        request.get('products')
            .expect(200)
            .then(res => {
                assert.isNotEmpty(res.body)
                res.body.forEach(r => {
                    existingAliases.push(r.alias)
                    existingIds.push(r.id)
                })
            })
        done()
    })
    it('POST /addproduct',  async () => {
        checkFieldIsWrong(wrongIdProduct, productFields.id)
        wrongCategoryIdProducts.forEach(p => {
            checkFieldIsWrong(p, productFields.categoryId)
        })
        checkFieldIsWrong(wrongTitleProduct, productFields.title)
        wrongAliasProducts.forEach(p => {
            checkFieldIsWrong(p, productFields.alias)
        })
        checkFieldIsWrong(wrongContentProduct, productFields.content)
        checkFieldIsWrong(wrongPriceProduct, productFields.price)
        checkFieldIsWrong(wrongOldPriceProduct, productFields.oldPrice)
        wrongStatusProducts.forEach(p => {
            checkFieldIsWrong(p, productFields.status)
        })
        checkFieldIsWrong(wrongKeywordsProduct, productFields.keywords)
        checkFieldIsWrong(wrongDescriptionProduct, productFields.description)
        wrongHitProducts.forEach(p => {
            checkFieldIsWrong(p, productFields.hit)
        })

        checkFieldIsWrong(validProduct1)
        checkFieldIsWrong(validProduct2)
        checkFieldIsWrong(validProduct3)
        checkFieldIsWrong(validProduct4)

        const validProducts = [validProduct1, validProduct2, validProduct3, validProduct4]
        for (let i = 0; i < validProducts.length; i++) {
            const res = await request
                .post('addproduct')
                .send(validProducts[i])
                .then(async (res) => {
                    assert(res.body.status === 1)
                    assert.isNumber(res.body.id)
                    addedIds.push(res.body.id)
                })
        }
        console.log(`addedProductIds: `, addedIds)
    })
    it('POST /editproduct',async () => {
        const editData = {
            id: 1,
            category_id: 2,
            title: "тест!",
            alias: "test!",
            content: "поменялся!",
            price: 100,
            old_price: 90,
            status: 1,
            keywords: "поменялся",
            description: "поменялся",
            hit: 1,
        }

        checkFieldIsWrong(editData)
        for (let i = 0; i < addedIds.length; i++) {
            const res = await request
                .post('editproduct')
                .send({
                    id: addedIds[i],
                    ...editData,
                    alias: i > 0 ? editData.alias + '-0' : editData.alias,
                })
                .expect(200)
                .then(res => {
                    assert(res.body.status === 1)
                })
        }
    })
    it('GET /deleteproduct', () => {
        addedIds.forEach(id => {
            return request
                .get('deleteproduct')
                .query({id})
                .expect(200)
                .then(res => {
                    assert(res.body.status === 1)
                })
        })
        // несуществующий id
        return request
            .get('deleteproduct')
            .query({id: NON_EXISTING_ID})
            .expect(200)
            .then(res => {
                assert(res.body.status === 0)
            })
    })
})

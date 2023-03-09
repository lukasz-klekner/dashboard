import { Router } from "express"
import { ChildRecord } from "../records/childRecord"
import { GiftRecord } from "../records/giftRecord"
import { GiftItemRequest } from "../types"
import { ValidationError } from "../utils/errors"


export const giftRouter = Router()

giftRouter
    .get('/', async (_, res) =>{
        const giftsList = await GiftRecord.listAll()
            res.json({
            giftsList
        })
    })
    .post('/', async (req, res) =>{
        const newGift = new GiftRecord(req.body)

        await newGift.insert()
        res.json(newGift)
    })
    .delete('/:id', async (req, res) =>{
        const gift = await GiftRecord.findOne(req.params.id)

        if(!gift._id){
            throw new ValidationError('Gift not found!')
        }

        // if(await ChildRecord.listAllWithTheSameGift(gift._id.toString())){
        //     throw new ValidationError('Gift cannot be removed!')
        // }

        const response = await gift.delete()

        res.end()
    })
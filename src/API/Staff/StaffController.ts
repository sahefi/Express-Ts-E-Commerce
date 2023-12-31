import HttpStatusCodes from '@src/constants/HttpStatusCodes'
import { ICreatedStaff, IDeleteStaff, IListStaff, IUpdatedStaff } from '@src/models/Staff'
import StaffServices from '@src/services/Staff/StaffServices'
import { createStaffValidator } from '@src/services/Validation/Validation'
import express,{Request,Response} from 'express'
import { requestValidator } from '../BaseController'


const router = express.Router()

router.post('/',createStaffValidator,requestValidator,async(req:Request,res:Response)=>{
    try {
        const reqDto = req.body as ICreatedStaff
        const create = await StaffServices.createStaff(reqDto)
        res.status(HttpStatusCodes.OK).send(create)
    } catch (error) {
        if(error.status){
            res.status(error.status).send({
                status:false,
                message:error.message,
                data:null
            })
        }else{
            res.status(500).send({
                status:false,
                message:error.message,
                data:null
            })
        }
        
    }
})

router.patch('/',async(req:Request,res:Response)=>{
    try {
        const reqDto = req.body as IUpdatedStaff
        const update = await StaffServices.updateStaff(reqDto)
        res.status(HttpStatusCodes.OK).send(update)
    } catch (error) {
        if(error.status){
            res.status(error.status).send({
                status:false,
                message:error.message,
                data:null
            })
        }else{
            res.status(500).send({
                status:false,
                message:error.message,
                data:null
            })
        } 
    }
})

router.get('/',async(req:Request,res:Response)=>{
    try {
        const reqDto:IListStaff = {page:Number(req.query.page),per_page:Number(req.query.per_page)}
        const list = await StaffServices.listStaff(reqDto)
        res.status(HttpStatusCodes.OK).send(list)
    } catch (error) {
        if(error.status){
            res.status(error.status).send({
                status:false,
                message:error.message,
                data:null
            })
        }else{
            res.status(500).send({
                status:false,
                message:error.message,
                data:null
            })
        } 
        
    }
})

router.delete('/',async(req:Request,res:Response)=>{
    try {
        const reqDto = req.body as IDeleteStaff
        const deleted = await StaffServices.DeleteStaff(reqDto)
        res.status(HttpStatusCodes.OK).send(deleted)
    } catch (error) {
        if(error.status){
            res.status(error.status).send({
                status:false,
                message:error.message,
                data:null
            })
        }else{
            res.status(500).send({
                status:false,
                message:error.message,
                data:null
            })
        } 
        
    }
})
export default router
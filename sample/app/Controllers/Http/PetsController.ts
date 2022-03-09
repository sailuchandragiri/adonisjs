import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {schema} from '@ioc:Adonis/Core/Validator';
import Pet from 'App/Models/Pet';

export default class PetsController {
    public async index(ctx:HttpContextContract){
        return Pet.all(); //select * from Pets
    }

    public async store({request,response}){
        try {
            const newPetSchema = schema.create({
                name:schema.string({trim:true}),
                email:schema.string({trim:true}),
                password:schema.string({trim:true}),
            })
    
            const payload = await request.validate({schema: newPetSchema});
    
           const pet  = await Pet.create(payload);//create instance and save in one go
    
            return response.status(201).send(pet);
    
        } catch(error){
            console.log(error)
            return response.status(500).send("Internal Server Error");

        }
       
    }

    public async show({params}:HttpContextContract){
        return Pet.findOrFail(params.id);
    }

    public async update({params, request}:HttpContextContract){
        
        const body = request.body();

        const pet  = await Pet.findOrFail(params.id);

        pet.name = body.name;

        pet.email = body.email;

        pet.password = body.password;

        return pet.save();
    }

    public async destroy({params, response}:HttpContextContract){

        const pet  = await Pet.findOrFail(params.id);

      //  response.status(204);

      await pet.delete();

        return pet;
    }
}

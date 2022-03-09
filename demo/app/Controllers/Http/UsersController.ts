import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';

export default class UsersController {
    public async index(ctx: HttpContextContract){
        return User.all();//select * from pets
    }

    public async store({request, response}: HttpContextContract){
      

       const body=request.body(); //todo validation

       const user = await User.create(body);//create instance and save in one go

       response.status(201);

       return user;
    }

    public async show({params}: HttpContextContract){
        return User.findOrFail(params.id);
    }

    public async update({params, request}: HttpContextContract){
        const body = request.body();

        const user = await User.findOrFail(params.id);

        user.name = body.name;

        return user.save();
    }

    public async destroy({params}:HttpContextContract){


        const user = await User.findOrFail(params.id);

        return user.delete();
    }
}

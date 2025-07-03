import mongoose from "mongoose";

export interface IConnectMongoose {
  (): Promise<void>;
}

export const connectMongoose: IConnectMongoose = async () => {
  try{
    await mongoose.connect('mongodb://localhost:27017/mongoose-server');
  }catch(err){
    console.log('❌ mongoose connection error!');
  }
};
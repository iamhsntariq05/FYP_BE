import Batch from "../../models/Batch";
import { IBatch } from "../../types/batch.interface";
import { NotFound } from "../../utils/errors";

export const IsBatchExist = async (id: string) => {
    const batch: IBatch | null = await Batch.findById(id).exec();
    return !!batch;
};


export const addBatch = async (obj: object) => {
    const batch = new Batch(obj)
    const response = await batch.save();

    if (!response) {
        throw new NotFound(`batch didn't register!`);
    }
    return response;
};

export const getallbatch = async () => {
    const studentsbatch: IBatch[] | null = await Batch.find({}).exec();
    if (!studentsbatch) {
        throw new NotFound(`No batch found!`);
    }
    return studentsbatch;
};

export const deletebatch = async (id: string) => {
    const batchExists: boolean = await IsBatchExist(id);
    if (!batchExists) {
        throw new NotFound(`faculty with id ${id} not found!`);
    }
    await Batch.findByIdAndDelete(id).exec();
};



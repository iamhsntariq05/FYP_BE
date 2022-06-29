import * as Batchservices from "../../services/batch/batchService";
import { BadRequest } from "../../utils/errors";


export const addbatch = async (req: any, res: any, next: any) => {
    const obj = {
        calenderId: req.body.calenderId,
    }
    try {
        const batch = await Batchservices.addBatch(obj);
        res.send({ message: `batch added successfully !`, batch });
    } catch (ex) {
        next(ex);
    }
};
export const getallbatch = async (req: any, res: any, next: any) => {
    const studentsbatch = await Batchservices.getallbatch();
    res.send({ message: `Student batch successfully fetched!`, studentsbatch });
};

export const deleteBatch = async (req: any, res: any, next: any) => {
    const id = req.params.id;
    try {
        if (!id) {
            throw new BadRequest("Missing required field: id");
        }
        await Batchservices.deletebatch(id);
        res.send({ message: `Batch successfully deleted!` });
    } catch (ex) {
        next(ex);
    }
};


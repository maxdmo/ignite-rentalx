import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/Upload";
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarscontroller } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { UploadCarImagesController } from "@modules/cars/useCases/uploadCarImages/UploadCarImagesController";

import { ensureAdmin } from "../middlewares/ensureADmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const carsRoutes = Router();

const createCarsController = new CreateCarController();
const listAvailableCarscontroller = new ListAvailableCarscontroller();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

const uploadImages = multer(uploadConfig.upload("./tmp/cars/images"));

carsRoutes.post(
    "/",
    ensureAuthenticated,
    ensureAdmin,
    createCarsController.handle
);

carsRoutes.get(
    "/",
    ensureAuthenticated,
    ensureAdmin,
    listAvailableCarscontroller.handle
);

carsRoutes.post("/specifications/:id", createCarSpecificationController.handle);

carsRoutes.post(
    "/images/:id",
    ensureAuthenticated,
    ensureAdmin,
    uploadImages.array("images"),
    uploadCarImagesController.handle
);

export { carsRoutes };

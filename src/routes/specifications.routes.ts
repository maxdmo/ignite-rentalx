import { Router } from "express";

import { SpecificationRepository } from "../modules/cars/repositories/SpecificationsRepository";
import { CreateSpecificationService } from "../modules/cars/services/CreateSpecificationService";

const specificationRoutes = Router();

const specificationsRepository = new SpecificationRepository();

specificationRoutes.post("/", (request, response) => {});

export { specificationRoutes };

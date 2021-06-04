import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
    dateNow(): Date {
        return dayjs().toDate();
    }

    convertToUtc(date: Date): string {
        return dayjs(date).utc().local().format();
    }

    compareInHours(startDate: Date, endDate: Date): number {
        const endDateToUtc = this.convertToUtc(endDate);
        const startDateToUtc = this.convertToUtc(startDate);

        return dayjs(endDateToUtc).diff(startDateToUtc, "hours");
    }
}

export { DayjsDateProvider };

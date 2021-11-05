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

    compareInHours(start_date: Date, end_date: Date): number {
        const endDateToUtc = this.convertToUtc(end_date);
        const startDateToUtc = this.convertToUtc(start_date);

        return dayjs(endDateToUtc).diff(startDateToUtc, "hours");
    }

    compareInDays(start_date: Date, end_date: Date): number {
        const endDateToUtc = this.convertToUtc(end_date);
        const startDateToUtc = this.convertToUtc(start_date);

        return dayjs(endDateToUtc).diff(startDateToUtc, "days");
    }

    addDays(days: number): Date {
        return dayjs().add(days, "days").toDate();
    }

    addHours(hours: number): Date {
        return dayjs().add(hours, "hour").toDate();
    }

    compareIfBefore(start_date: Date, end_date: Date): boolean {
        return dayjs(start_date).isBefore(end_date);
    }
}

export { DayjsDateProvider };

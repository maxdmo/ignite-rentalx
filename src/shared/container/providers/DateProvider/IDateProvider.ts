interface IDateProvider {
    compareInHours(startDate: Date, endDate: Date): number;
    convertToUtc(date: Date): string;
    dateNow(): Date;
}

export { IDateProvider };

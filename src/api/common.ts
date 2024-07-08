export function convertToDate(foundDateArray: number[]): Date {
    const [year, month, day, hour, minute, second, nanosecond] = foundDateArray;
    const utcDate = new Date(year, month - 1, day, hour, minute, second, nanosecond / 1000000);
    return utcDate;
  }
  
const year = new Date().getFullYear();
const month = new Date().getMonth();
const day = new Date().getDate();
const lastDay = new Date(year, month + 1, 0).getDate();

export const startOfDay = new Date(Date.UTC(year, month, day, 0, 0, 0));
export const endOfDay = new Date(Date.UTC(year, month, day, 23, 59, 59));

export const startOfMonth = new Date(Date.UTC(year, month, 1, 0, 0, 0));
export const endOfMonth = new Date(Date.UTC(year, month, lastDay, 23, 59, 59));

export const startOfYear = new Date(Date.UTC(year, 0, 1, 0, 0, 0)); // 1 Januari tahun ini
export const endOfYear = new Date(Date.UTC(year, 11, 31, 23, 59, 59)); // 31 Desember tahun ini

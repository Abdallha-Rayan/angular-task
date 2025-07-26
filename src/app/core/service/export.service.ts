import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor() { }
  exportToCsv(data: any[], fileName: string): void {
    if (!data || data.length === 0) {
      console.warn('لا توجد بيانات لتصديرها.');
      return;
    }

    const headers = Object.keys(data[0]);

    const csvData = data.map(row =>
      headers.map(header => {
        const value = (row as any)[header];
        return typeof value === 'string' && value.includes(',') ? `"${value}"` : value;
      }).join(',')
    );

    csvData.unshift(headers.join(','));

    const csvString = csvData.join('\r\n');

    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });

    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `${fileName}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}

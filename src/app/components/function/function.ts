
import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class function_ {

  // แปลงเป็นอายุ 1957-11-24T01:00:00.000Z --> อายุ
  calculateAge(birthdate: string | null | undefined): number {
    if (!birthdate) return 0;
    const birthDate = new Date(birthdate);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    return age;
  }

  // แปลงเป็น 2025-02-18T11:04:45.064Z -->    11:04:45
  formatTime(dateString: string | null | undefined): string {
    if (!dateString) return "";

    const date = new Date(dateString);
    date.setHours(date.getHours() - 7); // ลบ 7 ชั่วโมง

    return date.toLocaleTimeString('en-GB', { hour12: false }); // คืนค่าเป็น "HH:mm:ss"

  }


  formatTime7(dateString: string | null | undefined): string {
    if (!dateString) return "";

    const date = new Date(dateString);
    date.setHours(date.getHours() + 7); // ลบ 7 ชั่วโมง

    return date.toLocaleTimeString('en-GB', { hour12: false }); // คืนค่าเป็น "HH:mm:ss"

  }

  convertToThaiTime(utcDate: string): string {
    if (!utcDate) return "";

    const date = new Date(utcDate); // รับค่า UTC จริง
    const bangkokTime = new Date(date.getTime() + 7 * 60 * 60 * 1000); // บวก 7 ชั่วโมง
  
    // Format เป็น HH:mm:ss
    return bangkokTime.toISOString().substring(11, 19);
  
    // แปลงเป็นรูปแบบ 00:00:00
    // return date.toTimeString().split(' ')[0];
  }
  
  //  ตัวอย่างการใช้งาน
  // const utcTime = "2025-03-10T06:48:34.000Z";
  // console.log(convertToThaiTime(utcTime)); // 
  



  // exportToExcel
  exportToExcel(data: any[], reportTitle: string): void {
    if (!data || data.length === 0) {
      console.warn("No data available to export.");
      return;
    }
    const headers = Object.keys(data[0]); 
    const worksheetData = [[reportTitle], headers, ...data.map(item => headers.map(header => item[header]))];
    const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(worksheetData);
    worksheet['!cols'] = headers.map(() => ({ wch: 15 })); // Set column width to 15 characters
    const workbook: XLSX.WorkBook = { Sheets: { 'Sheet1': worksheet }, SheetNames: ['Sheet1'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, `${reportTitle}.xlsx`);
  }


  printDataSource(data: any[], reportTitle: string): void {
    const printWindow = window.open('', '_blank', 'width=800,height=600');
  
    if (!printWindow) {
      console.error('Failed to open print window.');
      return;
    }
  
    if (!data || data.length === 0) {
      printWindow.document.write('<html><head><title>Print Data</title></head><body>');
      printWindow.document.write('<h1>No Data Available</h1>');
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      return;
    }
  
    // ดึงชื่อคอลัมน์จาก Object แถวแรก
    const columns = Object.keys(data[0]);
  
    // สร้างตาราง HTML
    let tableHtml = '<table border="1" cellpadding="5" cellspacing="0" style="width: 100%;">';
  
    // สร้างส่วนหัวของตาราง
    tableHtml += '<thead style="background-color: #789DBC;"><tr>';
    columns.forEach(col => {
      tableHtml += `<th>${col}</th>`;
    });
    tableHtml += '</tr></thead>';
  
    // สร้างข้อมูลในตาราง
    tableHtml += '<tbody>';
    data.forEach((row: { [x: string]: any; }) => {
      tableHtml += '<tr>';
      columns.forEach(col => {
        tableHtml += `<td>${row[col]}</td>`;
      });
      tableHtml += '</tr>';
    });
    tableHtml += '</tbody></table>';
  
    // แสดงผลในหน้าต่างใหม่
    printWindow.document.write('<html><head><title>Print Data</title></head><body>');
    printWindow.document.write(`<center><h3>${reportTitle}</h3></center>`);
    printWindow.document.write(tableHtml);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  }
  
}


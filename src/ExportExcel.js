import ExcelJS from 'exceljs';

export async function exportDataExcel(items, headerColumnName) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Data');

    // Add headers to the worksheet
    const headerRow = worksheet.addRow(headerColumnName.map(header => header.text));
    headerRow.font = {bold: true};

    // Add data to the worksheet column by column
    headerColumnName.forEach(header => {
        const columnData = items.map(item => item[header.value]);
        worksheet.getColumn(headerColumnName.indexOf(header) + 1).values = [header.text, ...columnData];
    });

    // Export Excel file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
    const filename = 'exported_data.xlsx';

    // Create and trigger download link
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();

}

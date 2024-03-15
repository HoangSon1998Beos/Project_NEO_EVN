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

    //Khi tính tổng theo dòng

    // const sum = items.reduce((total, currentObject) => total + parseInt(currentObject['id']), 0);
    //
    // // Sử dụng phương thức getCell() để truy cập ô
    // const cell = worksheet.getCell(items.length + 2,1);
    //
    // // Đặt giá trị cho ô
    // cell.value =  sum;


    //format lại các cột
    worksheet.columns.forEach(column => {
        const lengths = column.values.map((v) => v.toString().length);
        const maxLength = Math.max(...lengths.filter((v) => typeof v === "number"));
        column.width = maxLength + 10;
        column.alignment = {
            vertical: "middle",
            horizontal: "center",
            wrapText: true,
        };
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

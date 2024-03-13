import ExcelJS from "exceljs";

export const exportFile = (objs, rowTable, headers,fileName,sheetName) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(sheetName);
    const headerRow = worksheet.addRow(headers);

    //fix style cell
    headerRow.eachCell((cell, number) => {
        cell.font = {
            name: "Times New Roman",
            bold: true,
        };
        cell.border = {
            top: {style: "thin"},
            left: {style: "thin"},
            bottom: {style: "thin"},
            right: {style: "thin"},
        };
    });

    // Thêm data qua obj
    objs.forEach((d, i) => {
        let row = worksheet.addRow(rowTable(d, i));
        row.eachCell((cell) => {
            cell.font = {
                name: "Times New Roman",
            };
        });
    });

    // Tính toán tổng và thêm hàng tổng vào cuối cùng
    // const totalsRow = worksheet.addRow([]);
    // headers.forEach((header, index) => {
    //     const cell = totalsRow.getCell(index + 1);
    //     if (index === 0) {
    //         cell.value = "Tổng";
    //         cell.font = {
    //             bold: true,
    //             name: "Times New Roman",
    //         };
    //     } else {
    //         if (header === "Số điện thoại (*)") {
    //             const columnLetter = String.fromCharCode(65 + index); // Chuyển đổi số thành chữ (A, B, C, ...)
    //             const totalFormula = `SUM(${columnLetter}2:${columnLetter}${objs.length + 1})`; // objs.length + 1 để bỏ qua hàng header
    //             cell.value = {
    //                 formula: totalFormula
    //             };
    //             cell.font = {
    //                 bold: true,
    //                 name: "Times New Roman",
    //             };
    //         } else {
    //             cell.value = ""; // Đặt giá trị của ô thành rỗng nếu không phải là cột bạn muốn tính tổng
    //         }
    //     }
    // });

    // fix width tự động
    worksheet.columns.forEach((column) => {
        const lengths = column.values.map((v) => v.toString().length);
        const maxLength = Math.max(...lengths.filter((v) => typeof v === "number"));
        column.width = maxLength + 10;
        column.alignment = {
            vertical: "middle",
            horizontal: "center",
            wrapText: true,
        };
    });

    workbook.xlsx.writeBuffer().then((data) => {
        let blob = new Blob([data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        saveAs(blob, fileName);
    });
}

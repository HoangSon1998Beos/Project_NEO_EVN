import ExcelJS from "exceljs";


export async function importDataExcel(files, headerNameValue) {

    return new Promise((resolve, reject) => {

        if (!files.length) return;

    const file = files[0];
    const workbook = new ExcelJS.Workbook();
    const reader = new FileReader();

    reader.onload = async (e) => {
        const data = new Uint8Array(e.target.result);
        await workbook.xlsx.load(data);
        const worksheet = workbook.worksheets[0];
        const excelData = [];
        const headers = [];
        let items = [];

        let isFirstRow = true;

        worksheet.eachRow((row, rowIndex) => {

            if (isFirstRow) {
                //Lấy header dòng đầu tiên
                row.eachCell((cell) => {
                    headers.push(cell.value);
                });
                isFirstRow = false;
            } else {
                //Gán giá trị theo tên header
                const rowData = {};
                row.eachCell((cell, colIndex) => {
                    rowData[headers[colIndex - 1]] = cell.value;
                });
                excelData.push(rowData);
            }
        });

        items = excelData;

        //Thay đổi lại tên các trường trong object
        const arrayImport = this.changeObjectNames(items, headerNameValue);
        resolve(arrayImport);
    };
    reader.readAsArrayBuffer(file);
    });

};


export function changeObjectNames(array, valueArray) {
    // Tạo một bảng ánh xạ text với value
    const textToValueMap = {};
    valueArray.forEach(item => {
        textToValueMap[item.text] = item.value;
    });
    // Thay đổi tên trường của các đối tượng
    return array.map(item => {
        const newItem = {};
        for (const key in item) {
            const value = textToValueMap[key];
            if (value !== undefined) {
                newItem[value] = item[key];
            } else {
                newItem[key] = item[key];
            }
        }
        return newItem;
    });
}
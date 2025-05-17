var DocTienBangChu = function () {
    this.ChuSo = new Array(" không ", " một ", " hai ", " ba ", " bốn ", " năm ", " sáu ", " bảy ", " tám ", " chín ");
    this.Tien = new Array("", " nghìn", " triệu", " tỷ", " nghìn tỷ", " triệu tỷ");
};

DocTienBangChu.prototype.docSo3ChuSo = function (baso) {
    var tram;
    var chuc;
    var donvi;
    var KetQua = "";
    tram = parseInt(baso / 100);
    chuc = parseInt((baso % 100) / 10);
    donvi = baso % 10;
    if (tram == 0 && chuc == 0 && donvi == 0) return "";
    if (tram != 0) {
        KetQua += this.ChuSo[tram] + " trăm ";
        if ((chuc == 0) && (donvi != 0)) KetQua += " linh ";
    }
    if ((chuc != 0) && (chuc != 1)) {
        KetQua += this.ChuSo[chuc] + " mươi";
        if ((chuc == 0) && (donvi != 0)) KetQua = KetQua + " linh ";
    }
    if (chuc == 1) KetQua += " mười ";
    switch (donvi) {
        case 1:
            if ((chuc != 0) && (chuc != 1)) {
                KetQua += " mốt ";
            }
            else {
                KetQua += this.ChuSo[donvi];
            }
            break;
        case 5:
            if (chuc == 0) {
                KetQua += this.ChuSo[donvi];
            }
            else {
                KetQua += " lăm ";
            }
            break;
        default:
            if (donvi != 0) {
                KetQua += this.ChuSo[donvi];
            }
            break;
    }
    return KetQua;
}

DocTienBangChu.prototype.doc = function (SoTien) {
    var lan = 0;
    var i = 0;
    var so = 0;
    var KetQua = "";
    var tmp = "";
    var soAm = false;
    var ViTri = new Array();
    if (SoTien < 0) soAm = true;//return "Số tiền âm !";
    if (SoTien == 0) return "Không đồng";//"Không đồng !";
    if (SoTien > 0) {
        so = SoTien;
    }
    else {
        so = -SoTien;
    }
    if (SoTien > 8999999999999999) {
        //SoTien = 0;
        return "";//"Số quá lớn!";
    }
    ViTri[5] = Math.floor(so / 1000000000000000);
    if (isNaN(ViTri[5]))
        ViTri[5] = "0";
    so = so - parseFloat(ViTri[5].toString()) * 1000000000000000;
    ViTri[4] = Math.floor(so / 1000000000000);
    if (isNaN(ViTri[4]))
        ViTri[4] = "0";
    so = so - parseFloat(ViTri[4].toString()) * 1000000000000;
    ViTri[3] = Math.floor(so / 1000000000);
    if (isNaN(ViTri[3]))
        ViTri[3] = "0";
    so = so - parseFloat(ViTri[3].toString()) * 1000000000;
    ViTri[2] = parseInt(so / 1000000);
    if (isNaN(ViTri[2]))
        ViTri[2] = "0";
    ViTri[1] = parseInt((so % 1000000) / 1000);
    if (isNaN(ViTri[1]))
        ViTri[1] = "0";
    ViTri[0] = parseInt(so % 1000);
    if (isNaN(ViTri[0]))
        ViTri[0] = "0";
    if (ViTri[5] > 0) {
        lan = 5;
    }
    else if (ViTri[4] > 0) {
        lan = 4;
    }
    else if (ViTri[3] > 0) {
        lan = 3;
    }
    else if (ViTri[2] > 0) {
        lan = 2;
    }
    else if (ViTri[1] > 0) {
        lan = 1;
    }
    else {
        lan = 0;
    }
    for (i = lan; i >= 0; i--) {
        tmp = this.docSo3ChuSo(ViTri[i]);
        KetQua += tmp;
        if (ViTri[i] > 0) KetQua += this.Tien[i];
        if ((i > 0) && (tmp.length > 0)) KetQua += '';//',';//&& (!string.IsNullOrEmpty(tmp))
    }
    if (KetQua.substring(KetQua.length - 1) == ',') {
        KetQua = KetQua.substring(0, KetQua.length - 1);
    }
    KetQua = KetQua.substring(1, 2).toUpperCase() + KetQua.substring(2);
    if (soAm) {
        return "Âm " + KetQua + " đồng";//.substring(0, 1);//.toUpperCase();// + KetQua.substring(1);
    }
    else {
        return KetQua + " đồng";//.substring(0, 1);//.toUpperCase();// + KetQua.substring(1);
    }
}

function formatNumber(numberString) {
    if (!numberString) return '';
    // Loại bỏ tất cả dấu chấm
    const num = numberString.replace(/\./g, '');
    const formatted = parseFloat(num).toString();
    return formatted.replace('.', ',');
}

function formatWithCommas(numberString) {
    if (!numberString) return '';
    const num = numberString.replace(',', '.');
    return parseFloat(num).toLocaleString('it-IT');
}

function replaceDotWithComma(value) {
    if (value === undefined || value === null) return '';

    // Chuyển giá trị thành số (nếu chưa phải)
    const numberValue = parseFloat(value);

    // Làm tròn số thập phân đến 3 chữ số
    const roundedValue = numberValue.toFixed(3);

    // Thay đổi dấu chấm thành dấu phẩy
    return roundedValue.replace('.', ',');
}


// Function to hide rows with empty maHatnhua values
function hideEmptyRows() {
    const maxRows = 4; // Số dòng tối đa
    const maxColumns = 4; // Số cột tối đa

    for (let rowIndex = 1; rowIndex <= maxRows; rowIndex++) {
        let allEmpty = true; // Giả định tất cả các cột trong hàng đều trống
        const row = document.getElementById(`row${rowIndex}`);

        for (let colIndex = 1; colIndex <= maxColumns; colIndex++) {
            const maHatnhua = document.getElementById(`maHatnhua${colIndex}_row${rowIndex}`);

            if (maHatnhua && maHatnhua.textContent.trim() !== '' && maHatnhua.textContent.trim() !== 'Đang tải...') {
                allEmpty = false; // Có dữ liệu hợp lệ trong cột
                break; // Không cần kiểm tra thêm
            }
        }

        // Ẩn hoặc hiển thị hàng dựa trên kết quả kiểm tra
        if (allEmpty) {
            row.style.display = 'none';
        } else {
            row.style.display = ''; // Hiển thị hàng nếu có dữ liệu hợp lệ
        }
    }
}

// Function to hide rows with empty maThanhphamPB values
function hideEmptyRowsSlice() {
    const maxRows = 8; // Tổng số dòng cần kiểm tra (từ row1 đến row8)

    for (let rowIndex = 1; rowIndex <= maxRows; rowIndex++) {
        const row = document.getElementById(`rowSlice${rowIndex}`);
        const maThanhpham = document.getElementById(`maThanhphamPB${rowIndex}`);

        // Kiểm tra nếu maThanhpham tồn tại và giá trị của nó là trống hoặc "Đang tải..."
        if (maThanhpham && (maThanhpham.textContent.trim() === '' || maThanhpham.textContent.trim() === 'Đang tải...')) {
            row.style.display = 'none'; // Ẩn hàng
        } else {
            row.style.display = ''; // Hiển thị hàng nếu có dữ liệu
        }
    }
}

// Function to hide rows with empty maThanhphamPB values
function hideEmptyRowsSliceHH() {
    const maxRows = 8; // Tổng số dòng cần kiểm tra (từ row1 đến row8)

    for (let rowIndex = 1; rowIndex <= maxRows; rowIndex++) {
        const row = document.getElementById(`rowSliceHH${rowIndex}`);
        const maThanhpham = document.getElementById(`maThanhphamPBHH${rowIndex}`);

        // Kiểm tra nếu maThanhpham tồn tại và giá trị của nó là trống hoặc "Đang tải..."
        if (maThanhpham && (maThanhpham.textContent.trim() === '' || maThanhpham.textContent.trim() === 'Đang tải...')) {
            row.style.display = 'none'; // Ẩn hàng
        } else {
            row.style.display = ''; // Hiển thị hàng nếu có dữ liệu
        }
    }
}

// Function to hide rows with empty maThanhphamPB values
function hideEmptyRowsSliceT() {
    const maxRows = 8; // Tổng số dòng cần kiểm tra (từ row1 đến row8)

    for (let rowIndex = 1; rowIndex <= maxRows; rowIndex++) {
        const row = document.getElementById(`rowSliceT${rowIndex}`);
        const maThanhpham = document.getElementById(`maThanhphamPBHH${rowIndex}`);

        // Kiểm tra nếu maThanhpham tồn tại và giá trị của nó là trống hoặc "Đang tải..."
        if (maThanhpham && (maThanhpham.textContent.trim() === '' || maThanhpham.textContent.trim() === 'Đang tải...')) {
            row.style.display = 'none'; // Ẩn hàng
        } else {
            row.style.display = ''; // Hiển thị hàng nếu có dữ liệu
        }
    }
}

function formatDate(dateString) {
    if (!dateString) return ''; // Kiểm tra nếu giá trị null hoặc undefined
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

function extractDay(dateString) {
    if (!dateString) return '';

    // Chuẩn hóa định dạng ngày về "DD/MM/YYYY"
    const parts = dateString.split(/[-/]/); // Chấp nhận cả "-" và "/"
    if (parts.length === 3) {
        let day, month, year;

        if (parts[0].length === 4) {
            // Định dạng ban đầu là "YYYY/MM/DD" hoặc "YYYY-MM-DD"
            [year, month, day] = parts;
        } else if (parts[1].length === 4) {
            // Định dạng ban đầu là "DD/MM/YYYY" (đã đúng)
            [day, month, year] = parts;
        } else {
            // Giả định định dạng "MM/DD/YYYY"
            [month, day, year] = parts;
        }

        // Đảm bảo các phần đều đủ 2 chữ số (nếu cần)
        day = day.padStart(2, '0');
        month = month.padStart(2, '0');

        // Chuẩn hóa thành "DD/MM/YYYY"
        dateString = `${day}/${month}/${year}`;
    }

    // Trích xuất ngày từ định dạng "DD/MM/YYYY"
    return dateString.split('/')[0];
}

const SPREADSHEET_ID = '1tUfZE9Ok2FQjhHY9sSbpl5VyuireOlv7iE9YTOvROj8';
const RANGE = 'lenh_san_xuat!A:DN'; // Mở rộng phạm vi đến cột DN
const RANGE_CHITIET = 'lenh_san_xuat_chi_tiet!A:AO'; // Dải dữ liệu từ sheet 'don_hang_chi_tiet'
const RANGE_HATNHUA = 'danh_sach_hat_nhua!A:B'; // Dải dữ liệu từ sheet "danh_sach_hat_nhua"
const RANGE_KHUON = 'danh_sach_khuon!A:AN'; // Dải dữ liệu từ sheet 'danh_sach_khuon'
const API_KEY = 'AIzaSyA9g2qFUolpsu3_HVHOebdZb0NXnQgXlFM';

// Lấy giá trị từ URI sau dấu "?" cho các tham số cụ thể
function getDataFromURI() {
    const url = window.location.href;

    // Sử dụng RegEx để trích xuất giá trị của ma_phieu_xuat, xuat_tai_kho, và nhap_tai_kho
    const maLenhsanxuatURIMatch = url.match(/ma_lenh_san_xuat=([^?&]*)/);

    // Gán các giá trị vào các biến
    const maLenhsanxuatURI = maLenhsanxuatURIMatch ? decodeURIComponent(maLenhsanxuatURIMatch[1]) : null;

    // Trả về một đối tượng chứa các giá trị
    return {
        maLenhsanxuatURI
    };
}

// Hàm để tải Google API Client
function loadGapiAndInitialize() {
    const script = document.createElement('script');
    script.src = "https://apis.google.com/js/api.js"; // Đường dẫn đến Google API Client
    script.onload = initialize; // Gọi hàm `initialize` sau khi thư viện được tải xong
    script.onerror = () => console.error('Failed to load Google API Client.');
    document.body.appendChild(script); // Gắn thẻ script vào tài liệu
}

// Hàm khởi tạo sau khi Google API Client được tải
function initialize() {
    gapi.load('client', async () => {
        try {
            await gapi.client.init({
                apiKey: API_KEY,
                discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4']
            });

            const uriData = getDataFromURI();
            if (!uriData.maLenhsanxuatURI) {
                updateContent('No valid data found in URI.');
                return;
            }

            findRowInSheet(uriData.maLenhsanxuatURI);
            findDetailsInSheet(uriData.maLenhsanxuatURI);

        } catch (error) {
            updateContent('Initialization error: ' + error.message);
            console.error('Initialization Error:', error);
        }
    });
}

// Gọi hàm tải Google API Client khi DOM đã sẵn sàng
document.addEventListener('DOMContentLoaded', () => {
    loadGapiAndInitialize();
});

function updateContent(message) {
    const contentElement = document.getElementById('content'); // Thay 'content' bằng ID của phần tử HTML cần hiển thị
    if (contentElement) {
        contentElement.textContent = message;
    } else {
        console.warn('Element with ID "content" not found.');
    }
}

// Tìm chỉ số dòng chứa dữ liệu khớp trong cột B và lấy các giá trị từ các cột khác
let orderDetails = null; // Thông tin đơn hàng chính
let orderItems = [];

async function findHatnhuaName(maHatnhua) {
    if (!maHatnhua) return '';

    try {
        const response = await gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: RANGE_HATNHUA,
        });

        const rows = response.result.values;
        if (!rows || rows.length === 0) return '';

        for (const row of rows) {
            if (row[0] === maHatnhua) {
                return row[1] || ''; // Trả về tên hạt nhựa từ cột B
            }
        }
    } catch (error) {
        console.error(`Error fetching hạt nhựa name for ${maHatnhua}:`, error);
        return '';
    }

    return ''; // Trả về chuỗi rỗng nếu không tìm thấy
}

async function findRowInSheet(maLenhsanxuatURI) {

    try {
        const response = await gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: RANGE,
        });

        const rows = response.result.values;
        if (!rows || rows.length === 0) {
            updateContent('No data found.');
            return;
        }

        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];

            const bColumnValue = row[0]; // Cột A
            if (bColumnValue === maLenhsanxuatURI) {
                // Lưu dữ liệu vào biến toàn cục
                orderDetails = {
                    maLenhsanxuat: row[0] || '', // Cột A
                    xuongSanXuat: row[4] || '', // Cột E
                    ngayXuat: row[1] || '', // Cột B
                    thangXuat: row[2] || '', // Cột C
                    namXuat: row[3] || '', // Cột D
                    maKhuon: row[5] || '', // Cột F
                    tongTrongluongXuat: row[8] || '', // Cột I
                    tongTrongluongNhap: row[9] || '', // Cột J
                    tyleHaohutThucte: row[10] || '', // Cột K
                    tyleHaohutDm: row[11] || '', // Cột L
                    chenhlechHaohut: row[12] || '', // Cột M
                    maHatnhua1: row[13] || '', // Cột N
                    socanHatnhua1: row[14] || '', // Cột O
                    maHatnhua2: row[15] || '', // Cột P
                    socanHatnhua2: row[16] || '', // Cột Q
                    maHatnhua3: row[17] || '', // Cột R
                    socanHatnhua3: row[18] || '', // Cột S
                    maHatnhua4: row[19] || '', // Cột T
                    socanHatnhua4: row[20] || '', // Cột U
                    maThanhphamPB1: row[21] || '', // Cột V
                    socanHN1_maThanhphamPB1: row[22] || '', // Cột W
                    socanHN2_maThanhphamPB1: row[23] || '', // Cột X
                    socanHN3_maThanhphamPB1: row[24] || '', // Cột Y
                    socanHN4_maThanhphamPB1: row[25] || '', // Cột Z
                    maThanhphamPB2: row[26] || '', // Cột AA
                    socanHN1_maThanhphamPB2: row[27] || '', // Cột AB
                    socanHN2_maThanhphamPB2: row[28] || '', // Cột AC
                    socanHN3_maThanhphamPB2: row[29] || '', // Cột AD
                    socanHN4_maThanhphamPB2: row[30] || '', // Cột AE
                    maThanhphamPB3: row[31] || '', // Cột AF
                    socanHN1_maThanhphamPB3: row[32] || '', // Cột AG
                    socanHN2_maThanhphamPB3: row[33] || '', // Cột AH
                    socanHN3_maThanhphamPB3: row[34] || '', // Cột AI
                    socanHN4_maThanhphamPB3: row[35] || '', // Cột AJ
                    maThanhphamPB4: row[36] || '', // Cột AK
                    socanHN1_maThanhphamPB4: row[37] || '', // Cột AL
                    socanHN2_maThanhphamPB4: row[38] || '', // Cột AM
                    socanHN3_maThanhphamPB4: row[39] || '', // Cột AN
                    socanHN4_maThanhphamPB4: row[40] || '', // Cột AO
                    maThanhphamPB5: row[41] || '', // Cột AP
                    socanHN1_maThanhphamPB5: row[42] || '', // Cột AQ
                    socanHN2_maThanhphamPB5: row[43] || '', // Cột AR
                    socanHN3_maThanhphamPB5: row[44] || '', // Cột AS
                    socanHN4_maThanhphamPB5: row[45] || '', // Cột AT
                    maThanhphamPB6: row[46] || '', // Cột AU
                    socanHN1_maThanhphamPB6: row[47] || '', // Cột AV
                    socanHN2_maThanhphamPB6: row[48] || '', // Cột AW
                    socanHN3_maThanhphamPB6: row[49] || '', // Cột AX
                    socanHN4_maThanhphamPB6: row[50] || '', // Cột AY
                    maThanhphamPB7: row[51] || '', // Cột AZ
                    socanHN1_maThanhphamPB7: row[52] || '', // Cột BA
                    socanHN2_maThanhphamPB7: row[53] || '', // Cột BB
                    socanHN3_maThanhphamPB7: row[54] || '', // Cột BC
                    socanHN4_maThanhphamPB7: row[55] || '', // Cột BD
                    maThanhphamPB8: row[56] || '', // Cột BE
                    socanHN1_maThanhphamPB8: row[57] || '', // Cột BF
                    socanHN2_maThanhphamPB8: row[58] || '', // Cột BG
                    socanHN3_maThanhphamPB8: row[59] || '', // Cột BH
                    socanHN4_maThanhphamPB8: row[60] || '', // Cột BI
                    maHN1_Taiche: row[61] || '', // Cột BJ
                    socanHN1_Taiche: row[62] || '', // Cột BK
                    maHN2_Taiche: row[63] || '', // Cột BL
                    socanHN2_Taiche: row[64] || '', // Cột BM
                    maHN3_Taiche: row[65] || '', // Cột BN
                    socanHN3_Taiche: row[66] || '', // Cột BO
                    maHN4_Taiche: row[67] || '', // Cột BP
                    socanHN4_Taiche: row[68] || '', // Cột BQ

                    socanHN1_maThanhphamPBHH1: row[70] || '', // Cột BS
                    socanHN2_maThanhphamPBHH1: row[71] || '', // Cột BT
                    socanHN3_maThanhphamPBHH1: row[72] || '', // Cột BU
                    socanHN4_maThanhphamPBHH1: row[73] || '', // Cột BV
                    socanHN1_maThanhphamPBHH2: row[74] || '', // Cột BW
                    socanHN2_maThanhphamPBHH2: row[75] || '', // Cột BX
                    socanHN3_maThanhphamPBHH2: row[76] || '', // Cột BY
                    socanHN4_maThanhphamPBHH2: row[77] || '', // Cột BZ
                    socanHN1_maThanhphamPBHH3: row[78] || '', // Cột CA
                    socanHN2_maThanhphamPBHH3: row[79] || '', // Cột CB
                    socanHN3_maThanhphamPBHH3: row[80] || '', // Cột CC
                    socanHN4_maThanhphamPBHH3: row[81] || '', // Cột CD
                    socanHN1_maThanhphamPBHH4: row[82] || '', // Cột CE
                    socanHN2_maThanhphamPBHH4: row[83] || '', // Cột CF
                    socanHN3_maThanhphamPBHH4: row[84] || '', // Cột CG
                    socanHN4_maThanhphamPBHH4: row[85] || '', // Cột CH
                    socanHN1_maThanhphamPBHH5: row[86] || '', // Cột CI
                    socanHN2_maThanhphamPBHH5: row[87] || '', // Cột CJ
                    socanHN3_maThanhphamPBHH5: row[88] || '', // Cột CK
                    socanHN4_maThanhphamPBHH5: row[89] || '', // Cột CL
                    socanHN1_maThanhphamPBHH6: row[90] || '', // Cột CM
                    socanHN2_maThanhphamPBHH6: row[91] || '', // Cột CN
                    socanHN3_maThanhphamPBHH6: row[92] || '', // Cột CO
                    socanHN4_maThanhphamPBHH6: row[93] || '', // Cột CP
                    socanHN1_maThanhphamPBHH7: row[94] || '', // Cột CQ
                    socanHN2_maThanhphamPBHH7: row[95] || '', // Cột CR
                    socanHN3_maThanhphamPBHH7: row[96] || '', // Cột CS
                    socanHN4_maThanhphamPBHH7: row[97] || '', // Cột CT
                    socanHN1_maThanhphamPBHH8: row[98] || '', // Cột CU
                    socanHN2_maThanhphamPBHH8: row[99] || '', // Cột CV
                    socanHN3_maThanhphamPBHH8: row[100] || '', // Cột CW
                    socanHN4_maThanhphamPBHH8: row[101] || '', // Cột CX

                };

                // Tìm tên hạt nhựa
                orderDetails.tenHatnhua1 = await findHatnhuaName(orderDetails.maHatnhua1);
                orderDetails.tenHatnhua2 = await findHatnhuaName(orderDetails.maHatnhua2);
                orderDetails.tenHatnhua3 = await findHatnhuaName(orderDetails.maHatnhua3);
                orderDetails.tenHatnhua4 = await findHatnhuaName(orderDetails.maHatnhua4);


                const socanHN1_maThanhphamPBT1 =
                    parseFloat(orderDetails.socanHN1_maThanhphamPB1 || 0) +
                    parseFloat(orderDetails.socanHN1_maThanhphamPBHH1 || 0);

                const socanHN2_maThanhphamPBT1 =
                    parseFloat(orderDetails.socanHN2_maThanhphamPB1 || 0) +
                    parseFloat(orderDetails.socanHN2_maThanhphamPBHH1 || 0);

                const socanHN3_maThanhphamPBT1 =
                    parseFloat(orderDetails.socanHN3_maThanhphamPB1 || 0) +
                    parseFloat(orderDetails.socanHN3_maThanhphamPBHH1 || 0);

                const socanHN4_maThanhphamPBT1 =
                    parseFloat(orderDetails.socanHN4_maThanhphamPB1 || 0) +
                    parseFloat(orderDetails.socanHN4_maThanhphamPBHH1 || 0);

                const socanHN1_maThanhphamPBT2 =
                    parseFloat(orderDetails.socanHN1_maThanhphamPB2 || 0) +
                    parseFloat(orderDetails.socanHN1_maThanhphamPBHH2 || 0);

                const socanHN2_maThanhphamPBT2 =
                    parseFloat(orderDetails.socanHN2_maThanhphamPB2 || 0) +
                    parseFloat(orderDetails.socanHN2_maThanhphamPBHH2 || 0);

                const socanHN3_maThanhphamPBT2 =
                    parseFloat(orderDetails.socanHN3_maThanhphamPB2 || 0) +
                    parseFloat(orderDetails.socanHN3_maThanhphamPBHH2 || 0);

                const socanHN4_maThanhphamPBT2 =
                    parseFloat(orderDetails.socanHN4_maThanhphamPB2 || 0) +
                    parseFloat(orderDetails.socanHN4_maThanhphamPBHH2 || 0);

                const socanHN1_maThanhphamPBT3 =
                    parseFloat(orderDetails.socanHN1_maThanhphamPB3 || 0) +
                    parseFloat(orderDetails.socanHN1_maThanhphamPBHH3 || 0);

                const socanHN2_maThanhphamPBT3 =
                    parseFloat(orderDetails.socanHN2_maThanhphamPB3 || 0) +
                    parseFloat(orderDetails.socanHN2_maThanhphamPBHH3 || 0);

                const socanHN3_maThanhphamPBT3 =
                    parseFloat(orderDetails.socanHN3_maThanhphamPB3 || 0) +
                    parseFloat(orderDetails.socanHN3_maThanhphamPBHH3 || 0);

                const socanHN4_maThanhphamPBT3 =
                    parseFloat(orderDetails.socanHN4_maThanhphamPB3 || 0) +
                    parseFloat(orderDetails.socanHN4_maThanhphamPBHH3 || 0);

                const socanHN1_maThanhphamPBT4 =
                    parseFloat(orderDetails.socanHN1_maThanhphamPB4 || 0) +
                    parseFloat(orderDetails.socanHN1_maThanhphamPBHH4 || 0);

                const socanHN2_maThanhphamPBT4 =
                    parseFloat(orderDetails.socanHN2_maThanhphamPB4 || 0) +
                    parseFloat(orderDetails.socanHN2_maThanhphamPBHH4 || 0);

                const socanHN3_maThanhphamPBT4 =
                    parseFloat(orderDetails.socanHN3_maThanhphamPB4 || 0) +
                    parseFloat(orderDetails.socanHN3_maThanhphamPBHH4 || 0);

                const socanHN4_maThanhphamPBT4 =
                    parseFloat(orderDetails.socanHN4_maThanhphamPB4 || 0) +
                    parseFloat(orderDetails.socanHN4_maThanhphamPBHH4 || 0);

                const socanHN1_maThanhphamPBT5 =
                    parseFloat(orderDetails.socanHN1_maThanhphamPB5 || 0) +
                    parseFloat(orderDetails.socanHN1_maThanhphamPBHH5 || 0);

                const socanHN2_maThanhphamPBT5 =
                    parseFloat(orderDetails.socanHN2_maThanhphamPB5 || 0) +
                    parseFloat(orderDetails.socanHN2_maThanhphamPBHH5 || 0);

                const socanHN3_maThanhphamPBT5 =
                    parseFloat(orderDetails.socanHN3_maThanhphamPB5 || 0) +
                    parseFloat(orderDetails.socanHN3_maThanhphamPBHH5 || 0);

                const socanHN4_maThanhphamPBT5 =
                    parseFloat(orderDetails.socanHN4_maThanhphamPB5 || 0) +
                    parseFloat(orderDetails.socanHN4_maThanhphamPBHH5 || 0);

                const socanHN1_maThanhphamPBT6 =
                    parseFloat(orderDetails.socanHN1_maThanhphamPB6 || 0) +
                    parseFloat(orderDetails.socanHN1_maThanhphamPBHH6 || 0);

                const socanHN2_maThanhphamPBT6 =
                    parseFloat(orderDetails.socanHN2_maThanhphamPB6 || 0) +
                    parseFloat(orderDetails.socanHN2_maThanhphamPBHH6 || 0);

                const socanHN3_maThanhphamPBT6 =
                    parseFloat(orderDetails.socanHN3_maThanhphamPB6 || 0) +
                    parseFloat(orderDetails.socanHN3_maThanhphamPBHH6 || 0);

                const socanHN4_maThanhphamPBT6 =
                    parseFloat(orderDetails.socanHN4_maThanhphamPB6 || 0) +
                    parseFloat(orderDetails.socanHN4_maThanhphamPBHH6 || 0);

                const socanHN1_maThanhphamPBT7 =
                    parseFloat(orderDetails.socanHN1_maThanhphamPB7 || 0) +
                    parseFloat(orderDetails.socanHN1_maThanhphamPBHH7 || 0);

                const socanHN2_maThanhphamPBT7 =
                    parseFloat(orderDetails.socanHN2_maThanhphamPB7 || 0) +
                    parseFloat(orderDetails.socanHN2_maThanhphamPBHH7 || 0);

                const socanHN3_maThanhphamPBT7 =
                    parseFloat(orderDetails.socanHN3_maThanhphamPB7 || 0) +
                    parseFloat(orderDetails.socanHN3_maThanhphamPBHH7 || 0);

                const socanHN4_maThanhphamPBT7 =
                    parseFloat(orderDetails.socanHN4_maThanhphamPB7 || 0) +
                    parseFloat(orderDetails.socanHN4_maThanhphamPBHH7 || 0);

                const socanHN1_maThanhphamPBT8 =
                    parseFloat(orderDetails.socanHN1_maThanhphamPB8 || 0) +
                    parseFloat(orderDetails.socanHN1_maThanhphamPBHH8 || 0);

                const socanHN2_maThanhphamPBT8 =
                    parseFloat(orderDetails.socanHN2_maThanhphamPB8 || 0) +
                    parseFloat(orderDetails.socanHN2_maThanhphamPBHH8 || 0);

                const socanHN3_maThanhphamPBT8 =
                    parseFloat(orderDetails.socanHN3_maThanhphamPB8 || 0) +
                    parseFloat(orderDetails.socanHN3_maThanhphamPBHH8 || 0);

                const socanHN4_maThanhphamPBT8 =
                    parseFloat(orderDetails.socanHN4_maThanhphamPB8 || 0) +
                    parseFloat(orderDetails.socanHN4_maThanhphamPBHH8 || 0);

                const tongSocanHatnhua1 =
                    parseFloat(orderDetails.socanHN1_maThanhphamPB1 || 0) +
                    parseFloat(orderDetails.socanHN1_maThanhphamPB2 || 0) +
                    parseFloat(orderDetails.socanHN1_maThanhphamPB3 || 0) +
                    parseFloat(orderDetails.socanHN1_maThanhphamPB4 || 0) +
                    parseFloat(orderDetails.socanHN1_maThanhphamPB5 || 0) +
                    parseFloat(orderDetails.socanHN1_maThanhphamPB6 || 0) +
                    parseFloat(orderDetails.socanHN1_maThanhphamPB7 || 0) +
                    parseFloat(orderDetails.socanHN1_maThanhphamPB8 || 0);

                const tongSocanHatnhua2 =
                    parseFloat(orderDetails.socanHN2_maThanhphamPB1 || 0) +
                    parseFloat(orderDetails.socanHN2_maThanhphamPB2 || 0) +
                    parseFloat(orderDetails.socanHN2_maThanhphamPB3 || 0) +
                    parseFloat(orderDetails.socanHN2_maThanhphamPB4 || 0) +
                    parseFloat(orderDetails.socanHN2_maThanhphamPB5 || 0) +
                    parseFloat(orderDetails.socanHN2_maThanhphamPB6 || 0) +
                    parseFloat(orderDetails.socanHN2_maThanhphamPB7 || 0) +
                    parseFloat(orderDetails.socanHN2_maThanhphamPB8 || 0);

                const tongSocanHatnhua3 =
                    parseFloat(orderDetails.socanHN3_maThanhphamPB1 || 0) +
                    parseFloat(orderDetails.socanHN3_maThanhphamPB2 || 0) +
                    parseFloat(orderDetails.socanHN3_maThanhphamPB3 || 0) +
                    parseFloat(orderDetails.socanHN3_maThanhphamPB4 || 0) +
                    parseFloat(orderDetails.socanHN3_maThanhphamPB5 || 0) +
                    parseFloat(orderDetails.socanHN3_maThanhphamPB6 || 0) +
                    parseFloat(orderDetails.socanHN3_maThanhphamPB7 || 0) +
                    parseFloat(orderDetails.socanHN3_maThanhphamPB8 || 0);

                const tongSocanHatnhua4 =
                    parseFloat(orderDetails.socanHN4_maThanhphamPB1 || 0) +
                    parseFloat(orderDetails.socanHN4_maThanhphamPB2 || 0) +
                    parseFloat(orderDetails.socanHN4_maThanhphamPB3 || 0) +
                    parseFloat(orderDetails.socanHN4_maThanhphamPB4 || 0) +
                    parseFloat(orderDetails.socanHN4_maThanhphamPB5 || 0) +
                    parseFloat(orderDetails.socanHN4_maThanhphamPB6 || 0) +
                    parseFloat(orderDetails.socanHN4_maThanhphamPB7 || 0) +
                    parseFloat(orderDetails.socanHN4_maThanhphamPB8 || 0);

                const tongSocanHatnhua1HH =
                    parseFloat(orderDetails.socanHN1_maThanhphamPBHH1 || 0) +
                    parseFloat(orderDetails.socanHN1_maThanhphamPBHH2 || 0) +
                    parseFloat(orderDetails.socanHN1_maThanhphamPBHH3 || 0) +
                    parseFloat(orderDetails.socanHN1_maThanhphamPBHH4 || 0) +
                    parseFloat(orderDetails.socanHN1_maThanhphamPBHH5 || 0) +
                    parseFloat(orderDetails.socanHN1_maThanhphamPBHH6 || 0) +
                    parseFloat(orderDetails.socanHN1_maThanhphamPBHH7 || 0) +
                    parseFloat(orderDetails.socanHN1_maThanhphamPBHH8 || 0);

                const tongSocanHatnhua2HH =
                    parseFloat(orderDetails.socanHN2_maThanhphamPBHH1 || 0) +
                    parseFloat(orderDetails.socanHN2_maThanhphamPBHH2 || 0) +
                    parseFloat(orderDetails.socanHN2_maThanhphamPBHH3 || 0) +
                    parseFloat(orderDetails.socanHN2_maThanhphamPBHH4 || 0) +
                    parseFloat(orderDetails.socanHN2_maThanhphamPBHH5 || 0) +
                    parseFloat(orderDetails.socanHN2_maThanhphamPBHH6 || 0) +
                    parseFloat(orderDetails.socanHN2_maThanhphamPBHH7 || 0) +
                    parseFloat(orderDetails.socanHN2_maThanhphamPBHH8 || 0);

                const tongSocanHatnhua3HH =
                    parseFloat(orderDetails.socanHN3_maThanhphamPBHH1 || 0) +
                    parseFloat(orderDetails.socanHN3_maThanhphamPBHH2 || 0) +
                    parseFloat(orderDetails.socanHN3_maThanhphamPBHH3 || 0) +
                    parseFloat(orderDetails.socanHN3_maThanhphamPBHH4 || 0) +
                    parseFloat(orderDetails.socanHN3_maThanhphamPBHH5 || 0) +
                    parseFloat(orderDetails.socanHN3_maThanhphamPBHH6 || 0) +
                    parseFloat(orderDetails.socanHN3_maThanhphamPBHH7 || 0) +
                    parseFloat(orderDetails.socanHN3_maThanhphamPBHH8 || 0);

                const tongSocanHatnhua4HH =
                    parseFloat(orderDetails.socanHN4_maThanhphamPBHH1 || 0) +
                    parseFloat(orderDetails.socanHN4_maThanhphamPBHH2 || 0) +
                    parseFloat(orderDetails.socanHN4_maThanhphamPBHH3 || 0) +
                    parseFloat(orderDetails.socanHN4_maThanhphamPBHH4 || 0) +
                    parseFloat(orderDetails.socanHN4_maThanhphamPBHH5 || 0) +
                    parseFloat(orderDetails.socanHN4_maThanhphamPBHH6 || 0) +
                    parseFloat(orderDetails.socanHN4_maThanhphamPBHH7 || 0) +
                    parseFloat(orderDetails.socanHN4_maThanhphamPBHH8 || 0);

                const tongSocanHatnhua1T =
                    parseFloat(orderDetails.socanHN1_maThanhphamPB1 || 0) +
                    parseFloat(orderDetails.socanHN1_maThanhphamPB2 || 0) +
                    parseFloat(orderDetails.socanHN1_maThanhphamPB3 || 0) +
                    parseFloat(orderDetails.socanHN1_maThanhphamPB4 || 0) +
                    parseFloat(orderDetails.socanHN1_maThanhphamPB5 || 0) +
                    parseFloat(orderDetails.socanHN1_maThanhphamPB6 || 0) +
                    parseFloat(orderDetails.socanHN1_maThanhphamPB7 || 0) +
                    parseFloat(orderDetails.socanHN1_maThanhphamPB8 || 0) +
                    parseFloat(orderDetails.socanHN1_maThanhphamPBHH1 || 0) +
                    parseFloat(orderDetails.socanHN1_maThanhphamPBHH2 || 0) +
                    parseFloat(orderDetails.socanHN1_maThanhphamPBHH3 || 0) +
                    parseFloat(orderDetails.socanHN1_maThanhphamPBHH4 || 0) +
                    parseFloat(orderDetails.socanHN1_maThanhphamPBHH5 || 0) +
                    parseFloat(orderDetails.socanHN1_maThanhphamPBHH6 || 0) +
                    parseFloat(orderDetails.socanHN1_maThanhphamPBHH7 || 0) +
                    parseFloat(orderDetails.socanHN1_maThanhphamPBHH8 || 0);

                const tongSocanHatnhua2T =
                    parseFloat(orderDetails.socanHN2_maThanhphamPB1 || 0) +
                    parseFloat(orderDetails.socanHN2_maThanhphamPB2 || 0) +
                    parseFloat(orderDetails.socanHN2_maThanhphamPB3 || 0) +
                    parseFloat(orderDetails.socanHN2_maThanhphamPB4 || 0) +
                    parseFloat(orderDetails.socanHN2_maThanhphamPB5 || 0) +
                    parseFloat(orderDetails.socanHN2_maThanhphamPB6 || 0) +
                    parseFloat(orderDetails.socanHN2_maThanhphamPB7 || 0) +
                    parseFloat(orderDetails.socanHN2_maThanhphamPB8 || 0) +
                    parseFloat(orderDetails.socanHN2_maThanhphamPBHH1 || 0) +
                    parseFloat(orderDetails.socanHN2_maThanhphamPBHH2 || 0) +
                    parseFloat(orderDetails.socanHN2_maThanhphamPBHH3 || 0) +
                    parseFloat(orderDetails.socanHN2_maThanhphamPBHH4 || 0) +
                    parseFloat(orderDetails.socanHN2_maThanhphamPBHH5 || 0) +
                    parseFloat(orderDetails.socanHN2_maThanhphamPBHH6 || 0) +
                    parseFloat(orderDetails.socanHN2_maThanhphamPBHH7 || 0) +
                    parseFloat(orderDetails.socanHN2_maThanhphamPBHH8 || 0);

                const tongSocanHatnhua3T =
                    parseFloat(orderDetails.socanHN3_maThanhphamPB1 || 0) +
                    parseFloat(orderDetails.socanHN3_maThanhphamPB2 || 0) +
                    parseFloat(orderDetails.socanHN3_maThanhphamPB3 || 0) +
                    parseFloat(orderDetails.socanHN3_maThanhphamPB4 || 0) +
                    parseFloat(orderDetails.socanHN3_maThanhphamPB5 || 0) +
                    parseFloat(orderDetails.socanHN3_maThanhphamPB6 || 0) +
                    parseFloat(orderDetails.socanHN3_maThanhphamPB7 || 0) +
                    parseFloat(orderDetails.socanHN3_maThanhphamPB8 || 0) +
                    parseFloat(orderDetails.socanHN3_maThanhphamPBHH1 || 0) +
                    parseFloat(orderDetails.socanHN3_maThanhphamPBHH2 || 0) +
                    parseFloat(orderDetails.socanHN3_maThanhphamPBHH3 || 0) +
                    parseFloat(orderDetails.socanHN3_maThanhphamPBHH4 || 0) +
                    parseFloat(orderDetails.socanHN3_maThanhphamPBHH5 || 0) +
                    parseFloat(orderDetails.socanHN3_maThanhphamPBHH6 || 0) +
                    parseFloat(orderDetails.socanHN3_maThanhphamPBHH7 || 0) +
                    parseFloat(orderDetails.socanHN3_maThanhphamPBHH8 || 0);

                const tongSocanHatnhua4T =
                    parseFloat(orderDetails.socanHN4_maThanhphamPB1 || 0) +
                    parseFloat(orderDetails.socanHN4_maThanhphamPB2 || 0) +
                    parseFloat(orderDetails.socanHN4_maThanhphamPB3 || 0) +
                    parseFloat(orderDetails.socanHN4_maThanhphamPB4 || 0) +
                    parseFloat(orderDetails.socanHN4_maThanhphamPB5 || 0) +
                    parseFloat(orderDetails.socanHN4_maThanhphamPB6 || 0) +
                    parseFloat(orderDetails.socanHN4_maThanhphamPB7 || 0) +
                    parseFloat(orderDetails.socanHN4_maThanhphamPB8 || 0) +
                    parseFloat(orderDetails.socanHN4_maThanhphamPBHH1 || 0) +
                    parseFloat(orderDetails.socanHN4_maThanhphamPBHH2 || 0) +
                    parseFloat(orderDetails.socanHN4_maThanhphamPBHH3 || 0) +
                    parseFloat(orderDetails.socanHN4_maThanhphamPBHH4 || 0) +
                    parseFloat(orderDetails.socanHN4_maThanhphamPBHH5 || 0) +
                    parseFloat(orderDetails.socanHN4_maThanhphamPBHH6 || 0) +
                    parseFloat(orderDetails.socanHN4_maThanhphamPBHH7 || 0) +
                    parseFloat(orderDetails.socanHN4_maThanhphamPBHH8 || 0);

                const tongSocanThanhpham1 =
                    parseFloat(orderDetails.socanHN1_maThanhphamPB1 || 0) +
                    parseFloat(orderDetails.socanHN2_maThanhphamPB1 || 0) +
                    parseFloat(orderDetails.socanHN3_maThanhphamPB1 || 0) +
                    parseFloat(orderDetails.socanHN4_maThanhphamPB1 || 0);

                const tongSocanThanhpham2 =
                    parseFloat(orderDetails.socanHN1_maThanhphamPB2 || 0) +
                    parseFloat(orderDetails.socanHN2_maThanhphamPB2 || 0) +
                    parseFloat(orderDetails.socanHN3_maThanhphamPB2 || 0) +
                    parseFloat(orderDetails.socanHN4_maThanhphamPB2 || 0);

                const tongSocanThanhpham3 =
                    parseFloat(orderDetails.socanHN1_maThanhphamPB3 || 0) +
                    parseFloat(orderDetails.socanHN2_maThanhphamPB3 || 0) +
                    parseFloat(orderDetails.socanHN3_maThanhphamPB3 || 0) +
                    parseFloat(orderDetails.socanHN4_maThanhphamPB3 || 0);

                const tongSocanThanhpham4 =
                    parseFloat(orderDetails.socanHN1_maThanhphamPB4 || 0) +
                    parseFloat(orderDetails.socanHN2_maThanhphamPB4 || 0) +
                    parseFloat(orderDetails.socanHN3_maThanhphamPB4 || 0) +
                    parseFloat(orderDetails.socanHN4_maThanhphamPB4 || 0);

                const tongSocanThanhpham5 =
                    parseFloat(orderDetails.socanHN1_maThanhphamPB5 || 0) +
                    parseFloat(orderDetails.socanHN2_maThanhphamPB5 || 0) +
                    parseFloat(orderDetails.socanHN3_maThanhphamPB5 || 0) +
                    parseFloat(orderDetails.socanHN4_maThanhphamPB5 || 0);

                const tongSocanThanhpham6 =
                    parseFloat(orderDetails.socanHN1_maThanhphamPB6 || 0) +
                    parseFloat(orderDetails.socanHN2_maThanhphamPB6 || 0) +
                    parseFloat(orderDetails.socanHN3_maThanhphamPB6 || 0) +
                    parseFloat(orderDetails.socanHN4_maThanhphamPB6 || 0);

                const tongSocanThanhpham7 =
                    parseFloat(orderDetails.socanHN1_maThanhphamPB7 || 0) +
                    parseFloat(orderDetails.socanHN2_maThanhphamPB7 || 0) +
                    parseFloat(orderDetails.socanHN3_maThanhphamPB7 || 0) +
                    parseFloat(orderDetails.socanHN4_maThanhphamPB7 || 0);

                const tongSocanThanhpham8 =
                    parseFloat(orderDetails.socanHN1_maThanhphamPB8 || 0) +
                    parseFloat(orderDetails.socanHN2_maThanhphamPB8 || 0) +
                    parseFloat(orderDetails.socanHN3_maThanhphamPB8 || 0) +
                    parseFloat(orderDetails.socanHN4_maThanhphamPB8 || 0);

                const tongSocanThanhphamHH1 =
                    parseFloat(orderDetails.socanHN1_maThanhphamPBHH1 || 0) +
                    parseFloat(orderDetails.socanHN2_maThanhphamPBHH1 || 0) +
                    parseFloat(orderDetails.socanHN3_maThanhphamPBHH1 || 0) +
                    parseFloat(orderDetails.socanHN4_maThanhphamPBHH1 || 0);

                const tongSocanThanhphamHH2 =
                    parseFloat(orderDetails.socanHN1_maThanhphamPBHH2 || 0) +
                    parseFloat(orderDetails.socanHN2_maThanhphamPBHH2 || 0) +
                    parseFloat(orderDetails.socanHN3_maThanhphamPBHH2 || 0) +
                    parseFloat(orderDetails.socanHN4_maThanhphamPBHH2 || 0);

                const tongSocanThanhphamHH3 =
                    parseFloat(orderDetails.socanHN1_maThanhphamPBHH3 || 0) +
                    parseFloat(orderDetails.socanHN2_maThanhphamPBHH3 || 0) +
                    parseFloat(orderDetails.socanHN3_maThanhphamPBHH3 || 0) +
                    parseFloat(orderDetails.socanHN4_maThanhphamPBHH3 || 0);

                const tongSocanThanhphamHH4 =
                    parseFloat(orderDetails.socanHN1_maThanhphamPBHH4 || 0) +
                    parseFloat(orderDetails.socanHN2_maThanhphamPBHH4 || 0) +
                    parseFloat(orderDetails.socanHN3_maThanhphamPBHH4 || 0) +
                    parseFloat(orderDetails.socanHN4_maThanhphamPBHH4 || 0);

                const tongSocanThanhphamHH5 =
                    parseFloat(orderDetails.socanHN1_maThanhphamPBHH5 || 0) +
                    parseFloat(orderDetails.socanHN2_maThanhphamPBHH5 || 0) +
                    parseFloat(orderDetails.socanHN3_maThanhphamPBHH5 || 0) +
                    parseFloat(orderDetails.socanHN4_maThanhphamPBHH5 || 0);

                const tongSocanThanhphamHH6 =
                    parseFloat(orderDetails.socanHN1_maThanhphamPBHH6 || 0) +
                    parseFloat(orderDetails.socanHN2_maThanhphamPBHH6 || 0) +
                    parseFloat(orderDetails.socanHN3_maThanhphamPBHH6 || 0) +
                    parseFloat(orderDetails.socanHN4_maThanhphamPBHH6 || 0);

                const tongSocanThanhphamHH7 =
                    parseFloat(orderDetails.socanHN1_maThanhphamPBHH7 || 0) +
                    parseFloat(orderDetails.socanHN2_maThanhphamPBHH7 || 0) +
                    parseFloat(orderDetails.socanHN3_maThanhphamPBHH7 || 0) +
                    parseFloat(orderDetails.socanHN4_maThanhphamPBHH7 || 0);

                const tongSocanThanhphamHH8 =
                    parseFloat(orderDetails.socanHN1_maThanhphamPBHH8 || 0) +
                    parseFloat(orderDetails.socanHN2_maThanhphamPBHH8 || 0) +
                    parseFloat(orderDetails.socanHN3_maThanhphamPBHH8 || 0) +
                    parseFloat(orderDetails.socanHN4_maThanhphamPBHH8 || 0);

                const tongSocanThanhphamT1 =
                    parseFloat(orderDetails.socanHN1_maThanhphamPB1 || 0) +
                    parseFloat(orderDetails.socanHN2_maThanhphamPB1 || 0) +
                    parseFloat(orderDetails.socanHN3_maThanhphamPB1 || 0) +
                    parseFloat(orderDetails.socanHN4_maThanhphamPB1 || 0) +
                    parseFloat(orderDetails.socanHN1_maThanhphamPBHH1 || 0) +
                    parseFloat(orderDetails.socanHN2_maThanhphamPBHH1 || 0) +
                    parseFloat(orderDetails.socanHN3_maThanhphamPBHH1 || 0) +
                    parseFloat(orderDetails.socanHN4_maThanhphamPBHH1 || 0);

                const tongSocanThanhphamT2 =
                    parseFloat(orderDetails.socanHN1_maThanhphamPB2 || 0) +
                    parseFloat(orderDetails.socanHN2_maThanhphamPB2 || 0) +
                    parseFloat(orderDetails.socanHN3_maThanhphamPB2 || 0) +
                    parseFloat(orderDetails.socanHN4_maThanhphamPB2 || 0) +
                    parseFloat(orderDetails.socanHN1_maThanhphamPBHH2 || 0) +
                    parseFloat(orderDetails.socanHN2_maThanhphamPBHH2 || 0) +
                    parseFloat(orderDetails.socanHN3_maThanhphamPBHH2 || 0) +
                    parseFloat(orderDetails.socanHN4_maThanhphamPBHH2 || 0);

                const tongSocanThanhphamT3 =
                    parseFloat(orderDetails.socanHN1_maThanhphamPB3 || 0) +
                    parseFloat(orderDetails.socanHN2_maThanhphamPB3 || 0) +
                    parseFloat(orderDetails.socanHN3_maThanhphamPB3 || 0) +
                    parseFloat(orderDetails.socanHN4_maThanhphamPB3 || 0) +
                    parseFloat(orderDetails.socanHN1_maThanhphamPBHH3 || 0) +
                    parseFloat(orderDetails.socanHN2_maThanhphamPBHH3 || 0) +
                    parseFloat(orderDetails.socanHN3_maThanhphamPBHH3 || 0) +
                    parseFloat(orderDetails.socanHN4_maThanhphamPBHH3 || 0);

                const tongSocanThanhphamT4 =
                    parseFloat(orderDetails.socanHN1_maThanhphamPB4 || 0) +
                    parseFloat(orderDetails.socanHN2_maThanhphamPB4 || 0) +
                    parseFloat(orderDetails.socanHN3_maThanhphamPB4 || 0) +
                    parseFloat(orderDetails.socanHN4_maThanhphamPB4 || 0) +
                    parseFloat(orderDetails.socanHN1_maThanhphamPBHH4 || 0) +
                    parseFloat(orderDetails.socanHN2_maThanhphamPBHH4 || 0) +
                    parseFloat(orderDetails.socanHN3_maThanhphamPBHH4 || 0) +
                    parseFloat(orderDetails.socanHN4_maThanhphamPBHH4 || 0);

                const tongSocanThanhphamT5 =
                    parseFloat(orderDetails.socanHN1_maThanhphamPB5 || 0) +
                    parseFloat(orderDetails.socanHN2_maThanhphamPB5 || 0) +
                    parseFloat(orderDetails.socanHN3_maThanhphamPB5 || 0) +
                    parseFloat(orderDetails.socanHN4_maThanhphamPB5 || 0) +
                    parseFloat(orderDetails.socanHN1_maThanhphamPBHH5 || 0) +
                    parseFloat(orderDetails.socanHN2_maThanhphamPBHH5 || 0) +
                    parseFloat(orderDetails.socanHN3_maThanhphamPBHH5 || 0) +
                    parseFloat(orderDetails.socanHN4_maThanhphamPBHH5 || 0);

                const tongSocanThanhphamT6 =
                    parseFloat(orderDetails.socanHN1_maThanhphamPB6 || 0) +
                    parseFloat(orderDetails.socanHN2_maThanhphamPB6 || 0) +
                    parseFloat(orderDetails.socanHN3_maThanhphamPB6 || 0) +
                    parseFloat(orderDetails.socanHN4_maThanhphamPB6 || 0) +
                    parseFloat(orderDetails.socanHN1_maThanhphamPBHH6 || 0) +
                    parseFloat(orderDetails.socanHN2_maThanhphamPBHH6 || 0) +
                    parseFloat(orderDetails.socanHN3_maThanhphamPBHH6 || 0) +
                    parseFloat(orderDetails.socanHN4_maThanhphamPBHH6 || 0);

                const tongSocanThanhphamT7 =
                    parseFloat(orderDetails.socanHN1_maThanhphamPB7 || 0) +
                    parseFloat(orderDetails.socanHN2_maThanhphamPB7 || 0) +
                    parseFloat(orderDetails.socanHN3_maThanhphamPB7 || 0) +
                    parseFloat(orderDetails.socanHN4_maThanhphamPB7 || 0) +
                    parseFloat(orderDetails.socanHN1_maThanhphamPBHH7 || 0) +
                    parseFloat(orderDetails.socanHN2_maThanhphamPBHH7 || 0) +
                    parseFloat(orderDetails.socanHN3_maThanhphamPBHH7 || 0) +
                    parseFloat(orderDetails.socanHN4_maThanhphamPBHH7 || 0);

                const tongSocanThanhphamT8 =
                    parseFloat(orderDetails.socanHN1_maThanhphamPB8 || 0) +
                    parseFloat(orderDetails.socanHN2_maThanhphamPB8 || 0) +
                    parseFloat(orderDetails.socanHN3_maThanhphamPB8 || 0) +
                    parseFloat(orderDetails.socanHN4_maThanhphamPB8 || 0) +
                    parseFloat(orderDetails.socanHN1_maThanhphamPBHH8 || 0) +
                    parseFloat(orderDetails.socanHN2_maThanhphamPBHH8 || 0) +
                    parseFloat(orderDetails.socanHN3_maThanhphamPBHH8 || 0) +
                    parseFloat(orderDetails.socanHN4_maThanhphamPBHH8 || 0);

                const tongSocanPhanbo =
                    tongSocanHatnhua1 + tongSocanHatnhua2 + tongSocanHatnhua3 + tongSocanHatnhua4;

                const tongSocanPhanboHH =
                    parseFloat(orderDetails.tongTrongluongXuat || 0) -
                    parseFloat(orderDetails.tongTrongluongNhap || 0);

                const tongSocanPhanboT =
                    tongSocanPhanbo + tongSocanPhanboHH

                const tongSocanTaiche =
                    parseFloat(orderDetails.tongTrongluongXuat || 0) - tongSocanPhanboT

                // Cập nhật vào orderDetails

                orderDetails.socanHN1_maThanhphamPBT1 = socanHN1_maThanhphamPBT1;
                orderDetails.socanHN2_maThanhphamPBT1 = socanHN2_maThanhphamPBT1;
                orderDetails.socanHN3_maThanhphamPBT1 = socanHN3_maThanhphamPBT1;
                orderDetails.socanHN4_maThanhphamPBT1 = socanHN4_maThanhphamPBT1;

                orderDetails.socanHN1_maThanhphamPBT2 = socanHN1_maThanhphamPBT2;
                orderDetails.socanHN2_maThanhphamPBT2 = socanHN2_maThanhphamPBT2;
                orderDetails.socanHN3_maThanhphamPBT2 = socanHN3_maThanhphamPBT2;
                orderDetails.socanHN4_maThanhphamPBT2 = socanHN4_maThanhphamPBT2;

                orderDetails.socanHN1_maThanhphamPBT3 = socanHN1_maThanhphamPBT3;
                orderDetails.socanHN2_maThanhphamPBT3 = socanHN2_maThanhphamPBT3;
                orderDetails.socanHN3_maThanhphamPBT3 = socanHN3_maThanhphamPBT3;
                orderDetails.socanHN4_maThanhphamPBT3 = socanHN4_maThanhphamPBT3;

                orderDetails.socanHN1_maThanhphamPBT4 = socanHN1_maThanhphamPBT4;
                orderDetails.socanHN2_maThanhphamPBT4 = socanHN2_maThanhphamPBT4;
                orderDetails.socanHN3_maThanhphamPBT4 = socanHN3_maThanhphamPBT4;
                orderDetails.socanHN4_maThanhphamPBT4 = socanHN4_maThanhphamPBT4;

                orderDetails.socanHN1_maThanhphamPBT5 = socanHN1_maThanhphamPBT5;
                orderDetails.socanHN2_maThanhphamPBT5 = socanHN2_maThanhphamPBT5;
                orderDetails.socanHN3_maThanhphamPBT5 = socanHN3_maThanhphamPBT5;
                orderDetails.socanHN4_maThanhphamPBT5 = socanHN4_maThanhphamPBT5;

                orderDetails.socanHN1_maThanhphamPBT6 = socanHN1_maThanhphamPBT6;
                orderDetails.socanHN2_maThanhphamPBT6 = socanHN2_maThanhphamPBT6;
                orderDetails.socanHN3_maThanhphamPBT6 = socanHN3_maThanhphamPBT6;
                orderDetails.socanHN4_maThanhphamPBT6 = socanHN4_maThanhphamPBT6;

                orderDetails.socanHN1_maThanhphamPBT7 = socanHN1_maThanhphamPBT7;
                orderDetails.socanHN2_maThanhphamPBT7 = socanHN2_maThanhphamPBT7;
                orderDetails.socanHN3_maThanhphamPBT7 = socanHN3_maThanhphamPBT7;
                orderDetails.socanHN4_maThanhphamPBT7 = socanHN4_maThanhphamPBT7;

                orderDetails.socanHN1_maThanhphamPBT8 = socanHN1_maThanhphamPBT8;
                orderDetails.socanHN2_maThanhphamPBT8 = socanHN2_maThanhphamPBT8;
                orderDetails.socanHN3_maThanhphamPBT8 = socanHN3_maThanhphamPBT8;
                orderDetails.socanHN4_maThanhphamPBT8 = socanHN4_maThanhphamPBT8;

                orderDetails.tongSocanHatnhua1 = tongSocanHatnhua1;
                orderDetails.tongSocanHatnhua2 = tongSocanHatnhua2;
                orderDetails.tongSocanHatnhua3 = tongSocanHatnhua3;
                orderDetails.tongSocanHatnhua4 = tongSocanHatnhua4;

                orderDetails.tongSocanHatnhua1HH = tongSocanHatnhua1HH;
                orderDetails.tongSocanHatnhua2HH = tongSocanHatnhua2HH;
                orderDetails.tongSocanHatnhua3HH = tongSocanHatnhua3HH;
                orderDetails.tongSocanHatnhua4HH = tongSocanHatnhua4HH;

                orderDetails.tongSocanHatnhua1T = tongSocanHatnhua1T;
                orderDetails.tongSocanHatnhua2T = tongSocanHatnhua2T;
                orderDetails.tongSocanHatnhua3T = tongSocanHatnhua3T;
                orderDetails.tongSocanHatnhua4T = tongSocanHatnhua4T;

                orderDetails.tongSocanThanhpham1 = tongSocanThanhpham1;
                orderDetails.tongSocanThanhpham2 = tongSocanThanhpham2;
                orderDetails.tongSocanThanhpham3 = tongSocanThanhpham3;
                orderDetails.tongSocanThanhpham4 = tongSocanThanhpham4;
                orderDetails.tongSocanThanhpham5 = tongSocanThanhpham5;
                orderDetails.tongSocanThanhpham6 = tongSocanThanhpham6;
                orderDetails.tongSocanThanhpham7 = tongSocanThanhpham7;
                orderDetails.tongSocanThanhpham8 = tongSocanThanhpham8;

                orderDetails.tongSocanThanhphamHH1 = tongSocanThanhphamHH1;
                orderDetails.tongSocanThanhphamHH2 = tongSocanThanhphamHH2;
                orderDetails.tongSocanThanhphamHH3 = tongSocanThanhphamHH3;
                orderDetails.tongSocanThanhphamHH4 = tongSocanThanhphamHH4;
                orderDetails.tongSocanThanhphamHH5 = tongSocanThanhphamHH5;
                orderDetails.tongSocanThanhphamHH6 = tongSocanThanhphamHH6;
                orderDetails.tongSocanThanhphamHH7 = tongSocanThanhphamHH7;
                orderDetails.tongSocanThanhphamHH8 = tongSocanThanhphamHH8;

                orderDetails.tongSocanThanhphamT1 = tongSocanThanhphamT1;
                orderDetails.tongSocanThanhphamT2 = tongSocanThanhphamT2;
                orderDetails.tongSocanThanhphamT3 = tongSocanThanhphamT3;
                orderDetails.tongSocanThanhphamT4 = tongSocanThanhphamT4;
                orderDetails.tongSocanThanhphamT5 = tongSocanThanhphamT5;
                orderDetails.tongSocanThanhphamT6 = tongSocanThanhphamT6;
                orderDetails.tongSocanThanhphamT7 = tongSocanThanhphamT7;
                orderDetails.tongSocanThanhphamT8 = tongSocanThanhphamT8;

                orderDetails.tongSocanPhanbo = tongSocanPhanbo;

                orderDetails.tongSocanPhanboHH = tongSocanPhanboHH;

                orderDetails.tongSocanPhanboT = tongSocanPhanboT;

                orderDetails.tongSocanTaiche = tongSocanTaiche;

                // Cập nhật nội dung HTML
                document.getElementById('maLenhsanxuat').textContent = orderDetails.maLenhsanxuat;
                document.getElementById('xuongSanXuat').textContent = orderDetails.xuongSanXuat;
                document.getElementById('ngayXuat').textContent = extractDay(orderDetails.ngayXuat);
                document.getElementById('thangXuat').textContent = orderDetails.thangXuat;
                document.getElementById('namXuat').textContent = orderDetails.namXuat;
                document.getElementById('maKhuon').textContent = orderDetails.maKhuon;
                document.getElementById('tongTrongluongXuat').textContent = formatWithCommas(orderDetails.tongTrongluongXuat);
                document.getElementById('tongTrongluongXuat2').textContent = formatWithCommas(orderDetails.tongTrongluongXuat);
                document.getElementById('tongTrongluongNhap').textContent = formatWithCommas(orderDetails.tongTrongluongNhap);
                document.getElementById('tyleHaohutThucte').textContent = formatWithCommas(orderDetails.tyleHaohutThucte);
                document.getElementById('tyleHaohutDm').textContent = formatWithCommas(orderDetails.tyleHaohutDm);
                document.getElementById('chenhlechHaohut').textContent = formatWithCommas(orderDetails.chenhlechHaohut);
                document.getElementById('maHatnhua1_row1').textContent = orderDetails.maHatnhua1;
                document.getElementById('maHatnhua1_row1.1').textContent = orderDetails.maHatnhua1;
                document.getElementById('maHatnhua1_row1.2').textContent = orderDetails.maHatnhua1;
                document.getElementById('maHatnhua1_row1.3').textContent = orderDetails.maHatnhua1;
                document.getElementById('tenHatnhua1').textContent = orderDetails.tenHatnhua1; // Thêm phần này
                document.getElementById('socanHatnhua1').textContent = formatWithCommas(orderDetails.socanHatnhua1);
                document.getElementById('maHatnhua2_row2').textContent = orderDetails.maHatnhua2;
                document.getElementById('maHatnhua2_row2.1').textContent = orderDetails.maHatnhua2;
                document.getElementById('maHatnhua2_row2.2').textContent = orderDetails.maHatnhua2;
                document.getElementById('maHatnhua2_row2.3').textContent = orderDetails.maHatnhua2;
                document.getElementById('tenHatnhua2').textContent = orderDetails.tenHatnhua2; // Thêm phần này
                document.getElementById('socanHatnhua2').textContent = formatWithCommas(orderDetails.socanHatnhua2);
                document.getElementById('maHatnhua3_row3').textContent = orderDetails.maHatnhua3;
                document.getElementById('maHatnhua3_row3.1').textContent = orderDetails.maHatnhua3;
                document.getElementById('maHatnhua3_row3.2').textContent = orderDetails.maHatnhua3;
                document.getElementById('maHatnhua3_row3.3').textContent = orderDetails.maHatnhua3;
                document.getElementById('tenHatnhua3').textContent = orderDetails.tenHatnhua3; // Thêm phần này
                document.getElementById('socanHatnhua3').textContent = formatWithCommas(orderDetails.socanHatnhua3);
                document.getElementById('maHatnhua4_row4').textContent = orderDetails.maHatnhua4;
                document.getElementById('maHatnhua4_row4.1').textContent = orderDetails.maHatnhua4;
                document.getElementById('maHatnhua4_row4.2').textContent = orderDetails.maHatnhua4;
                document.getElementById('maHatnhua4_row4.3').textContent = orderDetails.maHatnhua4;
                document.getElementById('tenHatnhua4').textContent = orderDetails.tenHatnhua4; // Thêm phần này
                document.getElementById('socanHatnhua4').textContent = formatWithCommas(orderDetails.socanHatnhua4);

                document.getElementById('maThanhphamPB1').textContent = orderDetails.maThanhphamPB1;
                document.getElementById('maThanhphamPBHH1').textContent = orderDetails.maThanhphamPB1;
                document.getElementById('maThanhphamPBT1').textContent = orderDetails.maThanhphamPB1;
                document.getElementById('socanHN1_maThanhphamPB1').textContent = formatWithCommas(orderDetails.socanHN1_maThanhphamPB1);
                document.getElementById('socanHN2_maThanhphamPB1').textContent = formatWithCommas(orderDetails.socanHN2_maThanhphamPB1);
                document.getElementById('socanHN3_maThanhphamPB1').textContent = formatWithCommas(orderDetails.socanHN3_maThanhphamPB1);
                document.getElementById('socanHN4_maThanhphamPB1').textContent = formatWithCommas(orderDetails.socanHN4_maThanhphamPB1);

                document.getElementById('socanHN1_maThanhphamPBHH1').textContent = formatWithCommas(orderDetails.socanHN1_maThanhphamPBHH1);
                document.getElementById('socanHN2_maThanhphamPBHH1').textContent = formatWithCommas(orderDetails.socanHN2_maThanhphamPBHH1);
                document.getElementById('socanHN3_maThanhphamPBHH1').textContent = formatWithCommas(orderDetails.socanHN3_maThanhphamPBHH1);
                document.getElementById('socanHN4_maThanhphamPBHH1').textContent = formatWithCommas(orderDetails.socanHN4_maThanhphamPBHH1);

                document.getElementById('socanHN1_maThanhphamPBT1').textContent = replaceDotWithComma(orderDetails.socanHN1_maThanhphamPBT1);
                document.getElementById('socanHN2_maThanhphamPBT1').textContent = replaceDotWithComma(orderDetails.socanHN2_maThanhphamPBT1);
                document.getElementById('socanHN3_maThanhphamPBT1').textContent = replaceDotWithComma(orderDetails.socanHN3_maThanhphamPBT1);
                document.getElementById('socanHN4_maThanhphamPBT1').textContent = replaceDotWithComma(orderDetails.socanHN4_maThanhphamPBT1);

                document.getElementById('maThanhphamPB2').textContent = orderDetails.maThanhphamPB2;
                document.getElementById('maThanhphamPBHH2').textContent = orderDetails.maThanhphamPB2;
                document.getElementById('maThanhphamPBT2').textContent = orderDetails.maThanhphamPB2;
                document.getElementById('socanHN1_maThanhphamPB2').textContent = formatWithCommas(orderDetails.socanHN1_maThanhphamPB2);
                document.getElementById('socanHN2_maThanhphamPB2').textContent = formatWithCommas(orderDetails.socanHN2_maThanhphamPB2);
                document.getElementById('socanHN3_maThanhphamPB2').textContent = formatWithCommas(orderDetails.socanHN3_maThanhphamPB2);
                document.getElementById('socanHN4_maThanhphamPB2').textContent = formatWithCommas(orderDetails.socanHN4_maThanhphamPB2);

                document.getElementById('socanHN1_maThanhphamPBHH2').textContent = formatWithCommas(orderDetails.socanHN1_maThanhphamPBHH2);
                document.getElementById('socanHN2_maThanhphamPBHH2').textContent = formatWithCommas(orderDetails.socanHN2_maThanhphamPBHH2);
                document.getElementById('socanHN3_maThanhphamPBHH2').textContent = formatWithCommas(orderDetails.socanHN3_maThanhphamPBHH2);
                document.getElementById('socanHN4_maThanhphamPBHH2').textContent = formatWithCommas(orderDetails.socanHN4_maThanhphamPBHH2);

                document.getElementById('socanHN1_maThanhphamPBT2').textContent = replaceDotWithComma(orderDetails.socanHN1_maThanhphamPBT2);
                document.getElementById('socanHN2_maThanhphamPBT2').textContent = replaceDotWithComma(orderDetails.socanHN2_maThanhphamPBT2);
                document.getElementById('socanHN3_maThanhphamPBT2').textContent = replaceDotWithComma(orderDetails.socanHN3_maThanhphamPBT2);
                document.getElementById('socanHN4_maThanhphamPBT2').textContent = replaceDotWithComma(orderDetails.socanHN4_maThanhphamPBT2);

                document.getElementById('maThanhphamPB3').textContent = orderDetails.maThanhphamPB3;
                document.getElementById('maThanhphamPBHH3').textContent = orderDetails.maThanhphamPB3;
                document.getElementById('maThanhphamPBT3').textContent = orderDetails.maThanhphamPB3;
                document.getElementById('socanHN1_maThanhphamPB3').textContent = formatWithCommas(orderDetails.socanHN1_maThanhphamPB3);
                document.getElementById('socanHN2_maThanhphamPB3').textContent = formatWithCommas(orderDetails.socanHN2_maThanhphamPB3);
                document.getElementById('socanHN3_maThanhphamPB3').textContent = formatWithCommas(orderDetails.socanHN3_maThanhphamPB3);
                document.getElementById('socanHN4_maThanhphamPB3').textContent = formatWithCommas(orderDetails.socanHN4_maThanhphamPB3);

                document.getElementById('socanHN1_maThanhphamPBHH3').textContent = formatWithCommas(orderDetails.socanHN1_maThanhphamPBHH3);
                document.getElementById('socanHN2_maThanhphamPBHH3').textContent = formatWithCommas(orderDetails.socanHN2_maThanhphamPBHH3);
                document.getElementById('socanHN3_maThanhphamPBHH3').textContent = formatWithCommas(orderDetails.socanHN3_maThanhphamPBHH3);
                document.getElementById('socanHN4_maThanhphamPBHH3').textContent = formatWithCommas(orderDetails.socanHN4_maThanhphamPBHH3);

                document.getElementById('socanHN1_maThanhphamPBT3').textContent = replaceDotWithComma(orderDetails.socanHN1_maThanhphamPBT3);
                document.getElementById('socanHN2_maThanhphamPBT3').textContent = replaceDotWithComma(orderDetails.socanHN2_maThanhphamPBT3);
                document.getElementById('socanHN3_maThanhphamPBT3').textContent = replaceDotWithComma(orderDetails.socanHN3_maThanhphamPBT3);
                document.getElementById('socanHN4_maThanhphamPBT3').textContent = replaceDotWithComma(orderDetails.socanHN4_maThanhphamPBT3);

                document.getElementById('maThanhphamPB4').textContent = orderDetails.maThanhphamPB4;
                document.getElementById('maThanhphamPBHH4').textContent = orderDetails.maThanhphamPB4;
                document.getElementById('maThanhphamPBT4').textContent = orderDetails.maThanhphamPB4;
                document.getElementById('socanHN1_maThanhphamPB4').textContent = formatWithCommas(orderDetails.socanHN1_maThanhphamPB4);
                document.getElementById('socanHN2_maThanhphamPB4').textContent = formatWithCommas(orderDetails.socanHN2_maThanhphamPB4);
                document.getElementById('socanHN3_maThanhphamPB4').textContent = formatWithCommas(orderDetails.socanHN3_maThanhphamPB4);
                document.getElementById('socanHN4_maThanhphamPB4').textContent = formatWithCommas(orderDetails.socanHN4_maThanhphamPB4);

                document.getElementById('socanHN1_maThanhphamPBHH4').textContent = formatWithCommas(orderDetails.socanHN1_maThanhphamPBHH4);
                document.getElementById('socanHN2_maThanhphamPBHH4').textContent = formatWithCommas(orderDetails.socanHN2_maThanhphamPBHH4);
                document.getElementById('socanHN3_maThanhphamPBHH4').textContent = formatWithCommas(orderDetails.socanHN3_maThanhphamPBHH4);
                document.getElementById('socanHN4_maThanhphamPBHH4').textContent = formatWithCommas(orderDetails.socanHN4_maThanhphamPBHH4);

                document.getElementById('socanHN1_maThanhphamPBT4').textContent = replaceDotWithComma(orderDetails.socanHN1_maThanhphamPBT4);
                document.getElementById('socanHN2_maThanhphamPBT4').textContent = replaceDotWithComma(orderDetails.socanHN2_maThanhphamPBT4);
                document.getElementById('socanHN3_maThanhphamPBT4').textContent = replaceDotWithComma(orderDetails.socanHN3_maThanhphamPBT4);
                document.getElementById('socanHN4_maThanhphamPBT4').textContent = replaceDotWithComma(orderDetails.socanHN4_maThanhphamPBT4);

                document.getElementById('maThanhphamPB5').textContent = orderDetails.maThanhphamPB5;
                document.getElementById('maThanhphamPBHH5').textContent = orderDetails.maThanhphamPB5;
                document.getElementById('maThanhphamPBT5').textContent = orderDetails.maThanhphamPB5;
                document.getElementById('socanHN1_maThanhphamPB5').textContent = formatWithCommas(orderDetails.socanHN1_maThanhphamPB5);
                document.getElementById('socanHN2_maThanhphamPB5').textContent = formatWithCommas(orderDetails.socanHN2_maThanhphamPB5);
                document.getElementById('socanHN3_maThanhphamPB5').textContent = formatWithCommas(orderDetails.socanHN3_maThanhphamPB5);
                document.getElementById('socanHN4_maThanhphamPB5').textContent = formatWithCommas(orderDetails.socanHN4_maThanhphamPB5);

                document.getElementById('socanHN1_maThanhphamPBHH5').textContent = formatWithCommas(orderDetails.socanHN1_maThanhphamPBHH5);
                document.getElementById('socanHN2_maThanhphamPBHH5').textContent = formatWithCommas(orderDetails.socanHN2_maThanhphamPBHH5);
                document.getElementById('socanHN3_maThanhphamPBHH5').textContent = formatWithCommas(orderDetails.socanHN3_maThanhphamPBHH5);
                document.getElementById('socanHN4_maThanhphamPBHH5').textContent = formatWithCommas(orderDetails.socanHN4_maThanhphamPBHH5);

                document.getElementById('socanHN1_maThanhphamPBT5').textContent = replaceDotWithComma(orderDetails.socanHN1_maThanhphamPBT5);
                document.getElementById('socanHN2_maThanhphamPBT5').textContent = replaceDotWithComma(orderDetails.socanHN2_maThanhphamPBT5);
                document.getElementById('socanHN3_maThanhphamPBT5').textContent = replaceDotWithComma(orderDetails.socanHN3_maThanhphamPBT5);
                document.getElementById('socanHN4_maThanhphamPBT5').textContent = replaceDotWithComma(orderDetails.socanHN4_maThanhphamPBT5);

                document.getElementById('maThanhphamPB6').textContent = orderDetails.maThanhphamPB6;
                document.getElementById('maThanhphamPBHH6').textContent = orderDetails.maThanhphamPB6;
                document.getElementById('maThanhphamPBT6').textContent = orderDetails.maThanhphamPB6;
                document.getElementById('socanHN1_maThanhphamPB6').textContent = formatWithCommas(orderDetails.socanHN1_maThanhphamPB6);
                document.getElementById('socanHN2_maThanhphamPB6').textContent = formatWithCommas(orderDetails.socanHN2_maThanhphamPB6);
                document.getElementById('socanHN3_maThanhphamPB6').textContent = formatWithCommas(orderDetails.socanHN3_maThanhphamPB6);
                document.getElementById('socanHN4_maThanhphamPB6').textContent = formatWithCommas(orderDetails.socanHN4_maThanhphamPB6);

                document.getElementById('socanHN1_maThanhphamPBHH6').textContent = formatWithCommas(orderDetails.socanHN1_maThanhphamPBHH6);
                document.getElementById('socanHN2_maThanhphamPBHH6').textContent = formatWithCommas(orderDetails.socanHN2_maThanhphamPBHH6);
                document.getElementById('socanHN3_maThanhphamPBHH6').textContent = formatWithCommas(orderDetails.socanHN3_maThanhphamPBHH6);
                document.getElementById('socanHN4_maThanhphamPBHH6').textContent = formatWithCommas(orderDetails.socanHN4_maThanhphamPBHH6);

                document.getElementById('socanHN1_maThanhphamPBT6').textContent = replaceDotWithComma(orderDetails.socanHN1_maThanhphamPBT6);
                document.getElementById('socanHN2_maThanhphamPBT6').textContent = replaceDotWithComma(orderDetails.socanHN2_maThanhphamPBT6);
                document.getElementById('socanHN3_maThanhphamPBT6').textContent = replaceDotWithComma(orderDetails.socanHN3_maThanhphamPBT6);
                document.getElementById('socanHN4_maThanhphamPBT6').textContent = replaceDotWithComma(orderDetails.socanHN4_maThanhphamPBT6);

                document.getElementById('maThanhphamPB7').textContent = orderDetails.maThanhphamPB7;
                document.getElementById('maThanhphamPBHH7').textContent = orderDetails.maThanhphamPB7;
                document.getElementById('maThanhphamPBT7').textContent = orderDetails.maThanhphamPB7;
                document.getElementById('socanHN1_maThanhphamPB7').textContent = formatWithCommas(orderDetails.socanHN1_maThanhphamPB7);
                document.getElementById('socanHN2_maThanhphamPB7').textContent = formatWithCommas(orderDetails.socanHN2_maThanhphamPB7);
                document.getElementById('socanHN3_maThanhphamPB7').textContent = formatWithCommas(orderDetails.socanHN3_maThanhphamPB7);
                document.getElementById('socanHN4_maThanhphamPB7').textContent = formatWithCommas(orderDetails.socanHN4_maThanhphamPB7);

                document.getElementById('socanHN1_maThanhphamPBHH7').textContent = formatWithCommas(orderDetails.socanHN1_maThanhphamPBHH7);
                document.getElementById('socanHN2_maThanhphamPBHH7').textContent = formatWithCommas(orderDetails.socanHN2_maThanhphamPBHH7);
                document.getElementById('socanHN3_maThanhphamPBHH7').textContent = formatWithCommas(orderDetails.socanHN3_maThanhphamPBHH7);
                document.getElementById('socanHN4_maThanhphamPBHH7').textContent = formatWithCommas(orderDetails.socanHN4_maThanhphamPBHH7);

                document.getElementById('socanHN1_maThanhphamPBT7').textContent = replaceDotWithComma(orderDetails.socanHN1_maThanhphamPBT7);
                document.getElementById('socanHN2_maThanhphamPBT7').textContent = replaceDotWithComma(orderDetails.socanHN2_maThanhphamPBT7);
                document.getElementById('socanHN3_maThanhphamPBT7').textContent = replaceDotWithComma(orderDetails.socanHN3_maThanhphamPBT7);
                document.getElementById('socanHN4_maThanhphamPBT7').textContent = replaceDotWithComma(orderDetails.socanHN4_maThanhphamPBT7);

                document.getElementById('maThanhphamPB8').textContent = orderDetails.maThanhphamPB8;
                document.getElementById('maThanhphamPBHH8').textContent = orderDetails.maThanhphamPB8;
                document.getElementById('maThanhphamPBT8').textContent = orderDetails.maThanhphamPB8;
                document.getElementById('socanHN1_maThanhphamPB8').textContent = formatWithCommas(orderDetails.socanHN1_maThanhphamPB8);
                document.getElementById('socanHN2_maThanhphamPB8').textContent = formatWithCommas(orderDetails.socanHN2_maThanhphamPB8);
                document.getElementById('socanHN3_maThanhphamPB8').textContent = formatWithCommas(orderDetails.socanHN3_maThanhphamPB8);
                document.getElementById('socanHN4_maThanhphamPB8').textContent = formatWithCommas(orderDetails.socanHN4_maThanhphamPB8);

                document.getElementById('socanHN1_maThanhphamPBHH8').textContent = formatWithCommas(orderDetails.socanHN1_maThanhphamPBHH8);
                document.getElementById('socanHN2_maThanhphamPBHH8').textContent = formatWithCommas(orderDetails.socanHN2_maThanhphamPBHH8);
                document.getElementById('socanHN3_maThanhphamPBHH8').textContent = formatWithCommas(orderDetails.socanHN3_maThanhphamPBHH8);
                document.getElementById('socanHN4_maThanhphamPBHH8').textContent = formatWithCommas(orderDetails.socanHN4_maThanhphamPBHH8);

                document.getElementById('socanHN1_maThanhphamPBT8').textContent = replaceDotWithComma(orderDetails.socanHN1_maThanhphamPBT8);
                document.getElementById('socanHN2_maThanhphamPBT8').textContent = replaceDotWithComma(orderDetails.socanHN2_maThanhphamPBT8);
                document.getElementById('socanHN3_maThanhphamPBT8').textContent = replaceDotWithComma(orderDetails.socanHN3_maThanhphamPBT8);
                document.getElementById('socanHN4_maThanhphamPBT8').textContent = replaceDotWithComma(orderDetails.socanHN4_maThanhphamPBT8);

                document.getElementById('tongSocanHatnhua1').textContent = replaceDotWithComma(orderDetails.tongSocanHatnhua1);
                document.getElementById('tongSocanHatnhua2').textContent = replaceDotWithComma(orderDetails.tongSocanHatnhua2);
                document.getElementById('tongSocanHatnhua3').textContent = replaceDotWithComma(orderDetails.tongSocanHatnhua3);
                document.getElementById('tongSocanHatnhua4').textContent = replaceDotWithComma(orderDetails.tongSocanHatnhua4);

                document.getElementById('tongSocanHatnhua1HH').textContent = replaceDotWithComma(orderDetails.tongSocanHatnhua1HH);
                document.getElementById('tongSocanHatnhua2HH').textContent = replaceDotWithComma(orderDetails.tongSocanHatnhua2HH);
                document.getElementById('tongSocanHatnhua3HH').textContent = replaceDotWithComma(orderDetails.tongSocanHatnhua3HH);
                document.getElementById('tongSocanHatnhua4HH').textContent = replaceDotWithComma(orderDetails.tongSocanHatnhua4HH);

                document.getElementById('tongSocanHatnhua1T').textContent = replaceDotWithComma(orderDetails.tongSocanHatnhua1T);
                document.getElementById('tongSocanHatnhua2T').textContent = replaceDotWithComma(orderDetails.tongSocanHatnhua2T);
                document.getElementById('tongSocanHatnhua3T').textContent = replaceDotWithComma(orderDetails.tongSocanHatnhua3T);
                document.getElementById('tongSocanHatnhua4T').textContent = replaceDotWithComma(orderDetails.tongSocanHatnhua4T);

                document.getElementById('tongSocanThanhpham1').textContent = replaceDotWithComma(orderDetails.tongSocanThanhpham1);
                document.getElementById('tongSocanThanhpham2').textContent = replaceDotWithComma(orderDetails.tongSocanThanhpham2);
                document.getElementById('tongSocanThanhpham3').textContent = replaceDotWithComma(orderDetails.tongSocanThanhpham3);
                document.getElementById('tongSocanThanhpham4').textContent = replaceDotWithComma(orderDetails.tongSocanThanhpham4);
                document.getElementById('tongSocanThanhpham5').textContent = replaceDotWithComma(orderDetails.tongSocanThanhpham5);
                document.getElementById('tongSocanThanhpham6').textContent = replaceDotWithComma(orderDetails.tongSocanThanhpham6);
                document.getElementById('tongSocanThanhpham7').textContent = replaceDotWithComma(orderDetails.tongSocanThanhpham7);
                document.getElementById('tongSocanThanhpham8').textContent = replaceDotWithComma(orderDetails.tongSocanThanhpham8);

                document.getElementById('tongSocanThanhphamHH1').textContent = replaceDotWithComma(orderDetails.tongSocanThanhphamHH1);
                document.getElementById('tongSocanThanhphamHH2').textContent = replaceDotWithComma(orderDetails.tongSocanThanhphamHH2);
                document.getElementById('tongSocanThanhphamHH3').textContent = replaceDotWithComma(orderDetails.tongSocanThanhphamHH3);
                document.getElementById('tongSocanThanhphamHH4').textContent = replaceDotWithComma(orderDetails.tongSocanThanhphamHH4);
                document.getElementById('tongSocanThanhphamHH5').textContent = replaceDotWithComma(orderDetails.tongSocanThanhphamHH5);
                document.getElementById('tongSocanThanhphamHH6').textContent = replaceDotWithComma(orderDetails.tongSocanThanhphamHH6);
                document.getElementById('tongSocanThanhphamHH7').textContent = replaceDotWithComma(orderDetails.tongSocanThanhphamHH7);
                document.getElementById('tongSocanThanhphamHH8').textContent = replaceDotWithComma(orderDetails.tongSocanThanhphamHH8);

                document.getElementById('tongSocanThanhphamT1').textContent = replaceDotWithComma(orderDetails.tongSocanThanhphamT1);
                document.getElementById('tongSocanThanhphamT2').textContent = replaceDotWithComma(orderDetails.tongSocanThanhphamT2);
                document.getElementById('tongSocanThanhphamT3').textContent = replaceDotWithComma(orderDetails.tongSocanThanhphamT3);
                document.getElementById('tongSocanThanhphamT4').textContent = replaceDotWithComma(orderDetails.tongSocanThanhphamT4);
                document.getElementById('tongSocanThanhphamT5').textContent = replaceDotWithComma(orderDetails.tongSocanThanhphamT5);
                document.getElementById('tongSocanThanhphamT6').textContent = replaceDotWithComma(orderDetails.tongSocanThanhphamT6);
                document.getElementById('tongSocanThanhphamT7').textContent = replaceDotWithComma(orderDetails.tongSocanThanhphamT7);
                document.getElementById('tongSocanThanhphamT8').textContent = replaceDotWithComma(orderDetails.tongSocanThanhphamT8);

                document.getElementById('tongSocanPhanbo').textContent = replaceDotWithComma(orderDetails.tongSocanPhanbo);

                document.getElementById('tongSocanPhanboHH').textContent = replaceDotWithComma(orderDetails.tongSocanPhanboHH);

                document.getElementById('tongSocanPhanboT').textContent = replaceDotWithComma(orderDetails.tongSocanPhanboT);

                document.getElementById('tongSocanTaiche').textContent = replaceDotWithComma(orderDetails.tongSocanTaiche);


                // Gọi hàm ẩn các dòng trống
                hideEmptyRows();
                hideEmptyRowsSlice();
                hideEmptyRowsSliceHH();
                hideEmptyRowsSliceT();

                return; // Dừng khi tìm thấy
            }
        }

        updateContent(`No matching data found for "${maLenhsanxuatURI}".`);
    } catch (error) {
        updateContent('Error fetching data: ' + error.message);
        console.error('Fetch Error:', error);
    }

    function updateContent(message) {
        // Hàm để xử lý thông báo lỗi hoặc cập nhật chung
        alert(message);
    }
}

// Hàm lấy dữ liệu tỷ trọng từ sheet 'danh_sach_khuon'
async function fetchTyTrongKH(orderDetails) {
    try {
        const response = await gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: RANGE_KHUON,
        });


        const rows = response.result.values;

        // In log dữ liệu trả về từ Google Sheets
        console.log('Fetched Rows from danh_sach_khuon:', rows);

        if (!rows || rows.length === 0) {
            console.warn('No data found in danh_sach_khuon.');
            return null;
        }

        const columnMap = {
            maThanhpham1: { findCol: 10, tyTrongCol: 12 }, // K và M
            maThanhpham2: { findCol: 13, tyTrongCol: 15 }, // N và P
            maThanhpham3: { findCol: 16, tyTrongCol: 18 }, // Q và S
            maThanhpham4: { findCol: 19, tyTrongCol: 21 }, // T và V
            maThanhpham5: { findCol: 22, tyTrongCol: 24 }, // W và Y
            maThanhpham6: { findCol: 25, tyTrongCol: 27 }, // Z và AB
            maThanhpham7: { findCol: 28, tyTrongCol: 30 }, // AC và AE
            maThanhpham8: { findCol: 31, tyTrongCol: 33 }, // AF và AH
        };

        const tyTrongData = {};
        for (const [key, { findCol, tyTrongCol }] of Object.entries(columnMap)) {
            const matchedRow = rows.find(row => row[findCol] === orderDetails[key]); // So sánh mã thành phẩm
            tyTrongData[key] = matchedRow ? matchedRow[tyTrongCol] : null; // Lấy tỷ trọng từ cột tương ứng
        }

        return tyTrongData;
    } catch (error) {
        console.error('Error fetching data from danh_sach_khuon:', error);
        return null;
    }
}

// Cập nhật hàm tìm chi tiết và thêm tỷ trọng KH
async function findDetailsInSheet(maLenhsanxuatURI) {
    try {
        const response = await gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: RANGE_CHITIET,
        });

        const rows = response.result.values;
        if (!rows || rows.length === 0) {
            updateContent('No detail data found.');
            return;
        }

        const filteredRows = rows.filter(row => row[0] === maLenhsanxuatURI); // Lọc các dòng có giá trị cột F khớp với maLenhsanxuatURI
        orderItems = filteredRows.map(extractDetailDataFromRow);

        if (orderItems.length === 0) {
            updateContent('No matching data found.');
            return;
        }

        // Lấy tỷ trọng KH từ 'danh_sach_khuon'
        const tyTrongData = await fetchTyTrongKH(orderItems[0]);

        // Kiểm tra dữ liệu trả về từ fetchTyTrongKH
        console.log('TyTrongData:', tyTrongData);

        // Gắn thêm dữ liệu tỷ trọng KH vào orderItems
        orderItems.forEach(item => {
            item.tytrongKH1 = tyTrongData?.maThanhpham1 || '';
            item.tytrongKH2 = tyTrongData?.maThanhpham2 || '';
            item.tytrongKH3 = tyTrongData?.maThanhpham3 || '';
            item.tytrongKH4 = tyTrongData?.maThanhpham4 || '';
            item.tytrongKH5 = tyTrongData?.maThanhpham5 || '';
            item.tytrongKH6 = tyTrongData?.maThanhpham6 || '';
            item.tytrongKH7 = tyTrongData?.maThanhpham7 || '';
            item.tytrongKH8 = tyTrongData?.maThanhpham8 || '';

        });

        displayDetailData(orderItems);
    } catch (error) {
        console.error('Error fetching detail data:', error);
        updateContent('Error fetching detail data.');
    }
}

function displayDetailData(orderItems) {
    const tableBody = document.getElementById('itemTableBody');
    tableBody.innerHTML = ''; // Xóa dữ liệu cũ nếu có

    orderItems.forEach(item => {
        console.log(item);

        // Tạo các dòng động với kiểm tra điều kiện
        const rows = [
            { ma: item.maThanhpham1, trongluong: item.trongluongThanhpham1, soluong: item.soluongThanhpham1, tytrong: item.tytrongttThanhpham1, tytrongKH: item.tytrongKH1 },
            { ma: item.maThanhpham2, trongluong: item.trongluongThanhpham2, soluong: item.soluongThanhpham2, tytrong: item.tytrongttThanhpham2, tytrongKH: item.tytrongKH2 },
            { ma: item.maThanhpham3, trongluong: item.trongluongThanhpham3, soluong: item.soluongThanhpham3, tytrong: item.tytrongttThanhpham3, tytrongKH: item.tytrongKH3 },
            { ma: item.maThanhpham4, trongluong: item.trongluongThanhpham4, soluong: item.soluongThanhpham4, tytrong: item.tytrongttThanhpham4, tytrongKH: item.tytrongKH4 },
            { ma: item.maThanhpham5, trongluong: item.trongluongThanhpham5, soluong: item.soluongThanhpham5, tytrong: item.tytrongttThanhpham5, tytrongKH: item.tytrongKH5 },
            { ma: item.maThanhpham6, trongluong: item.trongluongThanhpham6, soluong: item.soluongThanhpham6, tytrong: item.tytrongttThanhpham6, tytrongKH: item.tytrongKH6 },
            { ma: item.maThanhpham7, trongluong: item.trongluongThanhpham7, soluong: item.soluongThanhpham7, tytrong: item.tytrongttThanhpham7, tytrongKH: item.tytrongKH7 },
            { ma: item.maThanhpham8, trongluong: item.trongluongThanhpham8, soluong: item.soluongThanhpham8, tytrong: item.tytrongttThanhpham8, tytrongKH: item.tytrongKH8 },
            { ma: item.maHatnhuataiche, trongluong: item.trongluongHatnhuataiche, soluong: '', tytrong: '', tytrongKH: '' },
            { ma: item.maHatnhuaphe, trongluong: item.trongluongHatnhuaphe, soluong: '', tytrong: '', tytrongKH: '' },
        ];

        let tableRows = `
<p style="white-space: nowrap;"><b>Lần nhập: ${item.lanNhapkho || ''}</b></p>
<p style="white-space: nowrap;">  - Ngày nhập: ${formatDate(item.ngayNhap) || ''}</p>
<tr class="bordered-table">
<th class="borderedcol-1-H">Mã thành phẩm</th>
<th class="borderedcol-2">TL nhập<br>(kg)</th>
<th class="borderedcol-3">SL nhập<br>(cái)</th>
<th class="borderedcol-4">Tỷ trọng TT<br>(g/cái)</th>
<th class="borderedcol-5">Tỷ trọng KH<br>(g/cái)</th>
<th class="borderedcol-6">Chênh Tỷ trọng<br>(g/cái)</th>
<th class="borderedcol-7">Tỷ lệ chênh<br>(%)</th>
</tr>
`;

        let totalTrongluong = 0; // Khởi tạo biến tổng trọng lượng

        rows.forEach(rowData => {
            if (rowData.ma) { // Kiểm tra giá trị không trống
                const chenhTytrong = parseFloat(rowData.tytrong || 0) - parseFloat(rowData.tytrongKH || 0); // Tính chênh lệch tỷ trọng
                const tyleChenhTytrong = (parseFloat(rowData.tytrong || 0) - parseFloat(rowData.tytrongKH || 0)) / parseFloat(rowData.tytrongKH || 0) * 100 || 0; // Tính tỷ lệ chênh lệch tỷ trọng
                // Kiểm tra nếu chênh lệch bằng 0 thì trả về ''
                const chenhTytrongDisplay = chenhTytrong === 0 ? '' : chenhTytrong.toFixed(3);
                const tyleChenhTytrongDisplay = tyleChenhTytrong === 0 ? '' : tyleChenhTytrong.toFixed(3);
                tableRows += `
<tr class="bordered-table">
    <td class="borderedcol-1">${rowData.ma}</td>
    <td class="borderedcol-2">${formatWithCommas(rowData.trongluong)}</td>
    <td class="borderedcol-3">${rowData.soluong}</td>
    <td class="borderedcol-4">${formatWithCommas(rowData.tytrong)}</td>
    <td class="borderedcol-5">${formatWithCommas(rowData.tytrongKH)}</td>
    <td class="borderedcol-6">${formatWithCommas(chenhTytrongDisplay)}</td>
    <td class="borderedcol-7">${formatWithCommas(tyleChenhTytrongDisplay)}</td>
</tr>
`;

                // Cộng dồn trọng lượng vào tổng
                totalTrongluong += parseFloat(rowData.trongluong) || 0;
            }
        });

        // Thêm dòng tổng trọng lượng
        tableRows += `
<tr class="bordered-table">
<td class="borderedcol-1"><b>Tổng</b></td>
<td class="borderedcol-2"><b>${formatWithCommas(totalTrongluong.toFixed(3))}</b></td>
<td class="borderedcol-3"></td>
<td class="borderedcol-4"></td>
<td class="borderedcol-5"></td>
<td class="borderedcol-6"></td>
<td class="borderedcol-7"></td>
</tr>
`;

        tableBody.innerHTML += tableRows;
    });
}


// Trích xuất dữ liệu từ hàng
function extractDetailDataFromRow(row) {
    return {
        lanNhapkho: row[2],
        ngayNhap: row[3],
        tongTrongluong: row[4],
        maThanhpham1: row[5],
        soluongThanhpham1: row[6],
        trongluongThanhpham1: row[7],
        tytrongttThanhpham1: row[8],
        maThanhpham2: row[9],
        soluongThanhpham2: row[10],
        trongluongThanhpham2: row[11],
        tytrongttThanhpham2: row[12],
        maThanhpham3: row[13],
        soluongThanhpham3: row[14],
        trongluongThanhpham3: row[15],
        tytrongttThanhpham3: row[16],
        maThanhpham4: row[17],
        soluongThanhpham4: row[18],
        trongluongThanhpham4: row[19],
        tytrongttThanhpham4: row[20],
        maThanhpham5: row[21],
        soluongThanhpham5: row[22],
        trongluongThanhpham5: row[23],
        tytrongttThanhpham5: row[24],
        maThanhpham6: row[25],
        soluongThanhpham6: row[26],
        trongluongThanhpham6: row[27],
        tytrongttThanhpham6: row[28],
        maThanhpham7: row[29],
        soluongThanhpham7: row[30],
        trongluongThanhpham7: row[31],
        tytrongttThanhpham7: row[32],
        maThanhpham8: row[33],
        soluongThanhpham8: row[34],
        trongluongThanhpham8: row[35],
        tytrongttThanhpham8: row[36],
        maHatnhuataiche: row[37],
        trongluongHatnhuataiche: row[38],
        maHatnhuaphe: row[39],
        trongluongHatnhuaphe: row[40],
    };
}

// Hàm cập nhật nội dung DOM
function updateElement(elementId, value) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerText = value;
    }
}
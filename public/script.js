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
const RANGE = 'lenh_san_xuat!A:BZ'; // Mở rộng phạm vi đến cột BQ
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
                    tongTrongluongXuat2: row[8] || '', // Cột I
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
                    maTaichePB: row[61] || '', // Cột BJ
                    socanHN1_maTaichePB: row[62] || '', // Cột BK
                    socanHN2_maTaichePB: row[63] || '', // Cột BL
                    socanHN3_maTaichePB: row[64] || '', // Cột BM
                    socanHN4_maTaichePB: row[65] || '', // Cột BN
                    maPhePB: row[66] || '', // Cột BO
                    socanHN1_maPhePB: row[67] || '', // Cột BP
                    socanHN2_maPhePB: row[68] || '', // Cột BQ
                    socanHN3_maPhePB: row[69] || '', // Cột BR
                    socanHN4_maPhePB: row[70] || '', // Cột BS

                };

                // Tìm tên hạt nhựa
                orderDetails.tenHatnhua1 = await findHatnhuaName(orderDetails.maHatnhua1);
                orderDetails.tenHatnhua2 = await findHatnhuaName(orderDetails.maHatnhua2);
                orderDetails.tenHatnhua3 = await findHatnhuaName(orderDetails.maHatnhua3);
                orderDetails.tenHatnhua4 = await findHatnhuaName(orderDetails.maHatnhua4);

                // Cập nhật nội dung HTML
                document.getElementById('maLenhsanxuat').textContent = orderDetails.maLenhsanxuat;
                document.getElementById('xuongSanXuat').textContent = orderDetails.xuongSanXuat;
                document.getElementById('ngayXuat').textContent = extractDay(orderDetails.ngayXuat);
                document.getElementById('thangXuat').textContent = orderDetails.thangXuat;
                document.getElementById('namXuat').textContent = orderDetails.namXuat;
                document.getElementById('maKhuon').textContent = orderDetails.maKhuon;
                document.getElementById('tongTrongluongXuat').textContent = formatWithCommas(orderDetails.tongTrongluongXuat);
                document.getElementById('tongTrongluongXuat2').textContent = formatWithCommas(orderDetails.tongTrongluongXuat2);
                document.getElementById('tongTrongluongNhap').textContent = formatWithCommas(orderDetails.tongTrongluongNhap);
                document.getElementById('tyleHaohutThucte').textContent = formatWithCommas(orderDetails.tyleHaohutThucte);
                document.getElementById('tyleHaohutDm').textContent = formatWithCommas(orderDetails.tyleHaohutDm);
                document.getElementById('chenhlechHaohut').textContent = formatWithCommas(orderDetails.chenhlechHaohut);
                document.getElementById('maHatnhua1_row1').textContent = orderDetails.maHatnhua1;
                document.getElementById('maHatnhua1_row2').textContent = orderDetails.maHatnhua1;
                document.getElementById('tenHatnhua1').textContent = orderDetails.tenHatnhua1; // Thêm phần này
                document.getElementById('socanHatnhua1').textContent = formatWithCommas(orderDetails.socanHatnhua1);
                document.getElementById('maHatnhua2_row1').textContent = orderDetails.maHatnhua2;
                document.getElementById('maHatnhua2_row2').textContent = orderDetails.maHatnhua2;
                document.getElementById('tenHatnhua2').textContent = orderDetails.tenHatnhua2; // Thêm phần này
                document.getElementById('socanHatnhua2').textContent = formatWithCommas(orderDetails.socanHatnhua2);
                document.getElementById('maHatnhua3_row1').textContent = orderDetails.maHatnhua3;
                document.getElementById('maHatnhua3_row2').textContent = orderDetails.maHatnhua3;
                document.getElementById('tenHatnhua3').textContent = orderDetails.tenHatnhua3; // Thêm phần này
                document.getElementById('socanHatnhua3').textContent = formatWithCommas(orderDetails.socanHatnhua3);
                document.getElementById('maHatnhua4_row1').textContent = orderDetails.maHatnhua4;
                document.getElementById('maHatnhua4_row2').textContent = orderDetails.maHatnhua4;
                document.getElementById('tenHatnhua4').textContent = orderDetails.tenHatnhua4; // Thêm phần này
                document.getElementById('socanHatnhua4').textContent = formatWithCommas(orderDetails.socanHatnhua4);

                document.getElementById('maThanhphamPB1').textContent = orderDetails.maThanhphamPB1;
                document.getElementById('socanHN1_maThanhphamPB1').textContent = formatWithCommas(orderDetails.socanHN1_maThanhphamPB1);
                document.getElementById('socanHN2_maThanhphamPB1').textContent = formatWithCommas(orderDetails.socanHN2_maThanhphamPB1);
                document.getElementById('socanHN3_maThanhphamPB1').textContent = formatWithCommas(orderDetails.socanHN3_maThanhphamPB1);
                document.getElementById('socanHN4_maThanhphamPB1').textContent = formatWithCommas(orderDetails.socanHN4_maThanhphamPB1);

                document.getElementById('maThanhphamPB2').textContent = orderDetails.maThanhphamPB2;
                document.getElementById('socanHN1_maThanhphamPB2').textContent = formatWithCommas(orderDetails.socanHN1_maThanhphamPB2);
                document.getElementById('socanHN2_maThanhphamPB2').textContent = formatWithCommas(orderDetails.socanHN2_maThanhphamPB2);
                document.getElementById('socanHN3_maThanhphamPB2').textContent = formatWithCommas(orderDetails.socanHN3_maThanhphamPB2);
                document.getElementById('socanHN4_maThanhphamPB2').textContent = formatWithCommas(orderDetails.socanHN4_maThanhphamPB2);

                document.getElementById('maThanhphamPB3').textContent = orderDetails.maThanhphamPB3;
                document.getElementById('socanHN1_maThanhphamPB3').textContent = formatWithCommas(orderDetails.socanHN1_maThanhphamPB3);
                document.getElementById('socanHN2_maThanhphamPB3').textContent = formatWithCommas(orderDetails.socanHN2_maThanhphamPB3);
                document.getElementById('socanHN3_maThanhphamPB3').textContent = formatWithCommas(orderDetails.socanHN3_maThanhphamPB3);
                document.getElementById('socanHN4_maThanhphamPB3').textContent = formatWithCommas(orderDetails.socanHN4_maThanhphamPB3);

                document.getElementById('maThanhphamPB4').textContent = orderDetails.maThanhphamPB4;
                document.getElementById('socanHN1_maThanhphamPB4').textContent = formatWithCommas(orderDetails.socanHN1_maThanhphamPB4);
                document.getElementById('socanHN2_maThanhphamPB4').textContent = formatWithCommas(orderDetails.socanHN2_maThanhphamPB4);
                document.getElementById('socanHN3_maThanhphamPB4').textContent = formatWithCommas(orderDetails.socanHN3_maThanhphamPB4);
                document.getElementById('socanHN4_maThanhphamPB4').textContent = formatWithCommas(orderDetails.socanHN4_maThanhphamPB4);

                document.getElementById('maThanhphamPB5').textContent = orderDetails.maThanhphamPB5;
                document.getElementById('socanHN1_maThanhphamPB5').textContent = formatWithCommas(orderDetails.socanHN1_maThanhphamPB5);
                document.getElementById('socanHN2_maThanhphamPB5').textContent = formatWithCommas(orderDetails.socanHN2_maThanhphamPB5);
                document.getElementById('socanHN3_maThanhphamPB5').textContent = formatWithCommas(orderDetails.socanHN3_maThanhphamPB5);
                document.getElementById('socanHN4_maThanhphamPB5').textContent = formatWithCommas(orderDetails.socanHN4_maThanhphamPB5);

                document.getElementById('maThanhphamPB6').textContent = orderDetails.maThanhphamPB6;
                document.getElementById('socanHN1_maThanhphamPB6').textContent = formatWithCommas(orderDetails.socanHN1_maThanhphamPB6);
                document.getElementById('socanHN2_maThanhphamPB6').textContent = formatWithCommas(orderDetails.socanHN2_maThanhphamPB6);
                document.getElementById('socanHN3_maThanhphamPB6').textContent = formatWithCommas(orderDetails.socanHN3_maThanhphamPB6);
                document.getElementById('socanHN4_maThanhphamPB6').textContent = formatWithCommas(orderDetails.socanHN4_maThanhphamPB6);

                document.getElementById('maThanhphamPB7').textContent = orderDetails.maThanhphamPB7;
                document.getElementById('socanHN1_maThanhphamPB7').textContent = formatWithCommas(orderDetails.socanHN1_maThanhphamPB7);
                document.getElementById('socanHN2_maThanhphamPB7').textContent = formatWithCommas(orderDetails.socanHN2_maThanhphamPB7);
                document.getElementById('socanHN3_maThanhphamPB7').textContent = formatWithCommas(orderDetails.socanHN3_maThanhphamPB7);
                document.getElementById('socanHN4_maThanhphamPB7').textContent = formatWithCommas(orderDetails.socanHN4_maThanhphamPB7);

                document.getElementById('maThanhphamPB8').textContent = orderDetails.maThanhphamPB8;
                document.getElementById('socanHN1_maThanhphamPB8').textContent = formatWithCommas(orderDetails.socanHN1_maThanhphamPB8);
                document.getElementById('socanHN2_maThanhphamPB8').textContent = formatWithCommas(orderDetails.socanHN2_maThanhphamPB8);
                document.getElementById('socanHN3_maThanhphamPB8').textContent = formatWithCommas(orderDetails.socanHN3_maThanhphamPB8);
                document.getElementById('socanHN4_maThanhphamPB8').textContent = formatWithCommas(orderDetails.socanHN4_maThanhphamPB8);

                document.getElementById('maTaichePB').textContent = orderDetails.maTaichePB;
                document.getElementById('socanHN1_maTaichePB').textContent = formatWithCommas(orderDetails.socanHN1_maTaichePB);
                document.getElementById('socanHN2_maTaichePB').textContent = formatWithCommas(orderDetails.socanHN2_maTaichePB);
                document.getElementById('socanHN3_maTaichePB').textContent = formatWithCommas(orderDetails.socanHN3_maTaichePB);
                document.getElementById('socanHN4_maTaichePB').textContent = formatWithCommas(orderDetails.socanHN4_maTaichePB);

                document.getElementById('maPhePB').textContent = orderDetails.maPhePB;
                document.getElementById('socanHN1_maPhePB').textContent = formatWithCommas(orderDetails.socanHN1_maPhePB);
                document.getElementById('socanHN2_maPhePB').textContent = formatWithCommas(orderDetails.socanHN2_maPhePB);
                document.getElementById('socanHN3_maPhePB').textContent = formatWithCommas(orderDetails.socanHN3_maPhePB);
                document.getElementById('socanHN4_maPhePB').textContent = formatWithCommas(orderDetails.socanHN4_maPhePB);

                // Gọi hàm ẩn các dòng trống
                hideEmptyRows();
                hideEmptyRowsSlice();

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
            { ma: item.maThanhpham1, tytrong: item.tytrongttThanhpham1, soluong: item.soluongThanhpham1, trongluong: item.trongluongThanhpham1, tytrongKH: item.tytrongKH1 },
            { ma: item.maThanhpham2, tytrong: item.tytrongttThanhpham2, soluong: item.soluongThanhpham2, trongluong: item.trongluongThanhpham2, tytrongKH: item.tytrongKH2 },
            { ma: item.maThanhpham3, tytrong: item.tytrongttThanhpham3, soluong: item.soluongThanhpham3, trongluong: item.trongluongThanhpham3, tytrongKH: item.tytrongKH3 },
            { ma: item.maThanhpham4, tytrong: item.tytrongttThanhpham4, soluong: item.soluongThanhpham4, trongluong: item.trongluongThanhpham4, tytrongKH: item.tytrongKH4 },
            { ma: item.maThanhpham5, tytrong: item.tytrongttThanhpham5, soluong: item.soluongThanhpham5, trongluong: item.trongluongThanhpham5, tytrongKH: item.tytrongKH5 },
            { ma: item.maThanhpham6, tytrong: item.tytrongttThanhpham6, soluong: item.soluongThanhpham6, trongluong: item.trongluongThanhpham6, tytrongKH: item.tytrongKH6 },
            { ma: item.maThanhpham7, tytrong: item.tytrongttThanhpham7, soluong: item.soluongThanhpham7, trongluong: item.trongluongThanhpham7, tytrongKH: item.tytrongKH7 },
            { ma: item.maThanhpham8, tytrong: item.tytrongttThanhpham8, soluong: item.soluongThanhpham8, trongluong: item.trongluongThanhpham8, tytrongKH: item.tytrongKH8 },
            { ma: item.maHatnhuataiche, tytrong: '', soluong: '', trongluong: item.trongluongHatnhuataiche, tytrongKH: '' },
            { ma: item.maHatnhuaphe, tytrong: '', soluong: '', trongluong: item.trongluongHatnhuaphe, tytrongKH: '' },
        ];

        let tableRows = `
            <p style="white-space: nowrap;"><b>Lần nhập: ${item.lanNhapkho || ''}</b></p>
            <p style="white-space: nowrap;"><b>Ngày nhập: ${item.ngayNhap || ''}</b></p>
            <tr class="bordered-table">
                <th class="borderedcol-1-H">Mã thành phẩm</th>
                <th class="borderedcol-2">Tỷ trọng TT<br>(g/cái)</th>
                <th class="borderedcol-3">SL nhập<br>(cái)</th>
                <th class="borderedcol-4">TL nhập<br>(kg)</th>
                <th class="borderedcol-5">Tỷ trọng KH<br>(g/cái)</th>
                <th class="borderedcol-6">Chênh Tỷ trọng<br>(g/cái)</th>
                <th class="borderedcol-7">Chênh TL<br>(kg)</th>
            </tr>
        `;

        let totalTrongluong = 0; // Khởi tạo biến tổng trọng lượng

        rows.forEach(rowData => {
            if (rowData.ma) { // Kiểm tra giá trị không trống
                const chenhTytrong = parseFloat(rowData.tytrong || 0) - parseFloat(rowData.tytrongKH || 0); // Tính chênh lệch tỷ trọng
                const chenhTrongluong = (parseFloat(rowData.tytrong || 0) - parseFloat(rowData.tytrongKH || 0)) * parseFloat(rowData.soluong || 0) / 1000; // Tính chênh lệch trọng lượng
                // Kiểm tra nếu chênh lệch bằng 0 thì trả về ''
                const chenhTytrongDisplay = chenhTytrong === 0 ? '' : chenhTytrong.toFixed(3);
                const chenhTrongluongDisplay = chenhTrongluong === 0 ? '' : chenhTrongluong.toFixed(3);
                tableRows += `
                    <tr class="bordered-table">
                        <td class="borderedcol-1">${rowData.ma}</td>
                        <td class="borderedcol-2">${formatWithCommas(rowData.tytrong)}</td>
                        <td class="borderedcol-3">${rowData.soluong}</td>
                        <td class="borderedcol-4">${formatWithCommas(rowData.trongluong)}</td>
                        <td class="borderedcol-5">${formatWithCommas(rowData.tytrongKH)}</td>
                        <td class="borderedcol-6">${formatWithCommas(chenhTytrongDisplay)}</td>
                        <td class="borderedcol-7">${formatWithCommas(chenhTrongluongDisplay)}</td>
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
                <td class="borderedcol-2"></td>
                <td class="borderedcol-3"></td>
                <td class="borderedcol-4"><b>${formatWithCommas(totalTrongluong)}</b></td>
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
import fs from 'fs';
import path from 'path';

// Hàm để đổi đuôi file
function changeExtension(filePath: string, newExtension: string) {
    let basename = path.basename(filePath, '.js'); // Lấy tên file không có phần mở rộng
    return path.join(path.dirname(filePath), basename + newExtension); // Trả về đường dẫn file mới
}

// Hàm để quét thư mục
function scanDirectory(directory: string) {
    fs.readdirSync(directory).forEach(file => {
        let fullPath = path.join(directory, file);
        if (fs.lstatSync(fullPath).isDirectory()) {
            scanDirectory(fullPath); // Nếu là thư mục thì tiếp tục quét
        } else if (path.extname(fullPath) === '.js') {
            let newFilePath = changeExtension(fullPath, '.jsx'); // Đổi đuôi file
            fs.renameSync(fullPath, newFilePath); // Đổi tên file
        }
    });
}

// Chạy hàm quét thư mục
scanDirectory(__dirname);

import React from 'react';
import { Image } from 'react-bootstrap';

function ExampleCarouselImage({ text }) {
    return (
        <div>
            {/* Hình ảnh sẽ được sử dụng trong carousel */}
            <Image
                className="w-100  p-4"
                src={text === 'First slide' ? "https://cellphones.com.vn/sforum/wp-content/uploads/2021/08/1-11.jpg" :
                    "https://baocantho.com.vn/image/fckeditor/upload/2019/20190501/images/smarthome.jpg"}  // Tùy thuộc vào text để thay đổi hình ảnh
                alt={text} // Hiển thị thông tin mô tả hình ảnh
            />
        </div>
    );
}

export default ExampleCarouselImage;

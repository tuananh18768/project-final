import React from "react";
import style from "./footer.module.css";
export default function Footer() {
  return (
    <footer className={style.footer}>
      <div className="container">
        <div className={style.footer__content}>
          <div className={style.footer__top}>
            <div className={style.footer__item}>
              <h5 className={style.footer__title}>Về chúng tôi</h5>
              <ul>
                <li>Điều khoản</li>
                <li>Chính sách bảo mật</li>
              </ul>
            </div>
            <div className={style.footer__item}>
              <h5 className={style.footer__title}>Cộng đồng</h5>
              <ul>
                <li>Điều khoản</li>
                <li>Chính sách bảo mật</li>
              </ul>
            </div>
            <div className={style.footer__item}>
              <h5 className={style.footer__title}>Địa chỉ</h5>
              <ul>
                <li>Công ty TNHH Công Nghệ Giáo Dục Topica Việt Nam</li>
                <li>MST: 0109475876</li>
                <li>
                  Địa chỉ: Tầng 6, Tòa nhà Kim Khí Thăng long, Sô 1 Lương Yên,
                  Phường Bạch Đằng, Quận Hai Bà Trưng, Thành phố Hà Nội, Việt
                  Nam
                </li>
                <li>Email: trogiup@edumall.vn</li>
              </ul>
            </div>
            <div className={style.footer__item}>
              <h5 className={style.footer__title}>TẢI APP EDUMALL:</h5>
              <ul>
                <li>Điều khoản</li>
                <li>Chính sách bảo mật</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

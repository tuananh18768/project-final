import React from "react";
import { Link } from "react-router-dom";

export default function CheckBody() {
  return (
    <div>
      <div className="user-top">
        <div className="name-user">
          <span>Thành viên: Bạch Tuấn Anh</span>
        </div>
        <div className="course">
          <div className="coure-item">
            <i className="fa fa-book" />
            <Link to="/courseOwner">Khóa Học</Link>
          </div>
          <div className="coure-item">
            <i className="fa fa-user" />
            <Link to="/profile/user">Hồ sơ cá nhân</Link>
          </div>
          <div className="coure-item">
            <i className="fa fa-book" />
            <Link to="/favorite">Yêu Thích</Link>
          </div>
          <div className="coure-item">
            <i className="fa fa-search-plus" />
            <Link to="/discovery">Khám Phá</Link>
          </div>
          <div className="coure-item">
            <i className="fa fa-plus" />
            <Link to="/checkBody">Tình trạng sức khỏe</Link>
          </div>
        </div>
      </div>
      <div className="backGroundCheck">
        <div className="check__content">
          <div className="check__content__header">
            <h4>Đo tình trạng sức khỏe</h4>
          </div>
          <div className="check__content__middle">
            <h3>Mời bạn nhập số đo cân nặng</h3>
            <div className="row">
              <div className="col-6 mt-4 left">
                <label className="col-12" htmlFor="">
                  Cân nặng
                </label>
                <input
                  className="col-12"
                  type="number"
                  placeholder="Example: 34 => 34kg"
                />
                <label className="col-12 mt-5" htmlFor="">
                  Chiều cao
                </label>
                <input
                  className="col-12"
                  type="number"
                  placeholder="Example: 170 => 170cm"
                />
              </div>
              <div className="col-6  mt-4 right">
                <label className="col-12" htmlFor="">
                  Giới tính
                </label>
                <div>
                  &nbsp;{" "}
                  <input
                    type="radio"
                    id="html"
                    name="fav_language"
                    defaultValue="HTML"
                  />
                  &nbsp; <label htmlFor="html">Nam</label>
                  <br />
                  &nbsp;{" "}
                  <input
                    type="radio"
                    id="css"
                    name="fav_language"
                    defaultValue="CSS"
                  />
                  &nbsp; <label htmlFor="css">Nữ</label>
                  <br />
                </div>

                <label className="col-12 mt-4" htmlFor="">
                  Độ tuổi
                </label>
                <input className="col-12" type="text" style={{ height: 40 }} />
              </div>
              <div className="col-12 mt-4">
                <Link to="/" className="checkBodyBtn">
                  Kiểm tra
                </Link>
              </div>
            </div>
            <div className="checkBodyResult">
              <div className="row result__all" style={{ margin: 0 }}>
                <div className="col-4 result__left">
                  <h5>Kết quả</h5>
                </div>
                <div className="col result__right">
                  <h5>Danh sách gợi ý</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

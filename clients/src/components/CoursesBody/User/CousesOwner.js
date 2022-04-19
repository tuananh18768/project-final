import React from "react";
import { Link } from "react-router-dom";

export default function CousesOwner() {
  return (
    <div id="coursesOwner">
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
      <div className="backGoundCourses">
        <div className="courses__owner_content">
          <div className="search">
            <input type="text" />
            <button className="btn btn-primary">Tìm kiếm</button>
          </div>
          <div className="content__main">
            <div className="row">
              <div className="col-3">
                <div className="card" style={{ width: "18rem" }}>
                  <img
                    style={{ height: "190px", objectFit: "cover" }}
                    src="https://cdn.popsww.com/blog/sites/2/2022/01/thanh-guom-diet-quy-review.jpg"
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <a href="#" className="btn btn-primary">
                      Tiếp tục học
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-3">
                <div className="card" style={{ width: "18rem" }}>
                  <img
                    style={{ height: "190px", objectFit: "cover" }}
                    src="https://image.thanhnien.vn/w660/Uploaded/2022/ygtmjz/2020_12_15/demon_slayer_vbco.jpg"
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <a href="#" className="btn btn-primary">
                      Tiếp tục học
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-3">
                <div className="card" style={{ width: "18rem" }}>
                  <img
                    style={{ height: "190px", objectFit: "cover" }}
                    src="https://nocodebuilding.com/wp-content/uploads/2021/09/thanh-guom-diet-quy-1.jpg"
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <a href="#" className="btn btn-primary">
                      Tiếp tục học
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux'

const checkBodys = {
  weight: '',
  height: '',
  sex: '',
  age: '',
}
export default function CheckBody() {
  const [body, setBody] = useState(checkBodys)
  const [data, setData] = useState({})
  const token = useSelector(state => state.token)

  const { tokenUser } = token
  const { weight, height, sex, age } = body

  const handleChange = (e) => {
    const { name, value } = e.target
    setBody({ ...body, [name]: value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = {
      weight: weight,
      height: height
    }
    try {
      const res = await axios.post('/user/check_body', formData, { headers: { Authorization: tokenUser } })
      setData({ ...data, data: res.data, sex: sex, age: age })
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }
  console.log(data);
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
                  name="weight"
                  type="number"
                  placeholder="Example: 34 => 34kg"
                  value={weight}
                  onChange={handleChange}
                />
                <label className="col-12 mt-5" htmlFor="">
                  Chiều cao
                </label>
                <input
                  className="col-12"
                  type="text"
                  name="height"
                  placeholder="Example: 1.7"
                  value={height}
                  onChange={handleChange}
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
                    name="sex"
                    defaultValue="HTML"
                    value="Nam"
                    onChange={handleChange}
                  />
                  &nbsp; <label htmlFor="html">Nam</label>
                  <br />
                  &nbsp;{" "}
                  <input
                    type="radio"
                    id="css"
                    name="sex"
                    defaultValue="CSS"
                    value="Nu"
                    onChange={handleChange}
                  />
                  &nbsp; <label htmlFor="css">Nữ</label>
                  <br />
                </div>

                <label className="col-12 mt-4" htmlFor="">
                  Độ tuổi
                </label>
                <input className="col-12" name="age" onChange={handleChange} value={age} type="number" style={{ height: 40 }} />
              </div>
              <div className="col-12 mt-4">
                <button onClick={handleSubmit} className="checkBodyBtn">
                  Kiểm tra
                </button>
              </div>
            </div>
            <div className="checkBodyResult">
              <div className="row result__all" style={{ margin: 0 }}>
                <div className="col-4 result__left">
                  <h5>Kết quả</h5>
                  <p>{data?.data?.message}</p>
                  <p>{data?.sex}</p>
                  <p>{data?.age}</p>
                </div>
                <div className="col result__right">
                  <h5>Lời khuyên dành cho bạn</h5>
                  {data?.data?.result?.map((current, index) => {
                    return <>
                      <p>{current.results}</p>
                      <div style={{ padding: '0 20px' }}>
                        {current.suggest[0].map((su, indexs) => {
                          return <ul key={indexs} style={{ listStyleType: 'circle' }}>
                            <li>{su}</li>
                          </ul>
                        })}
                      </div>
                    </>
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

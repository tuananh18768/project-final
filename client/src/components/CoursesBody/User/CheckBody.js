import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div className="row checkBody_mains">
      <div className="col col-lg-1">
        <div className="chat__wrapicon">
          <div className="chat__icon" style={{ transform: 'translate(0 ,-30px)' }}>
            <Link to="/">
              <i class="fa-solid fa-house-chimney"></i>
            </Link>
          </div>
          <div className="chat__icon">
            <Link to="/courseOwner">
              <i className="fa fa-book" />
            </Link>
          </div>
          <div className="chat__icon">
            <Link to="favorite">
              <i class="fa-solid fa-heart"></i>
            </Link>
          </div>
          <div className="chat__icon">
            <Link to="discovery">
              <i className="fa fa-search-plus" />
            </Link>
          </div>
          <div className="chat__icon">
            <Link to="checkBody">
              <i className="fa fa-plus" />
            </Link>
          </div>
          <div className="chat__icon">
            <Link to="/messenger">
              <i class="fa-brands fa-facebook-messenger"></i>
            </Link>
          </div>
        </div>
      </div>
      <div className="backGroundCheck col-11">
        <div className="check__content">
          <div className="check__content__header">
            <h4>??o t??nh tr???ng s???c kh???e</h4>
          </div>
          <div className="check__content__middle">
            <h3>M???i b???n nh???p s??? ??o c??n n???ng</h3>
            <div className="row">
              <div className="col-6 mt-4 left">
                <label className="col-12" htmlFor="">
                  C??n n???ng
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
                  Chi???u cao
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
                  Gi???i t??nh
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
                  &nbsp; <label htmlFor="css">N???</label>
                  <br />
                </div>

                <label className="col-12 mt-4" htmlFor="">
                  ????? tu???i
                </label>
                <input className="col-12" name="age" onChange={handleChange} value={age} type="number" style={{ height: 40 }} />
              </div>
              <div className="col-12 mt-4">
                <button onClick={handleSubmit} className="checkBodyBtn">
                  Ki???m tra
                </button>
              </div>
            </div>
            <div className="checkBodyResult">
              <div className="row result__all" style={{ margin: 0 }}>
                <div className="col-4 result__left">
                  <h5>K???t qu???</h5>
                  <p>{data?.data?.message}</p>
                  <p>{data?.sex}</p>
                  <p>{data?.age}</p>
                </div>
                <div className="col result__right">
                  <h5>L???i khuy??n d??nh cho b???n</h5>
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

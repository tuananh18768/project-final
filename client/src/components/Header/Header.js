import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import style from "./header.module.css"
export default function Header() {

  const auth = useSelector(state => state.auth)
  const { user, isLogged, admin, trainer, isUser, isTrainer, isAdmin } = auth
  const handleLogout = async () => {
    try {
      await axios.get('/user/logout')
      localStorage.removeItem('firstLogin')
      await axios.get('/trainer/logout')
      localStorage.removeItem('secondLogin')
      await axios.get('/admin/logout')
      localStorage.removeItem('admin')
      window.location.href = '/'
    } catch (error) {
      window.location.href = "/"
    }
  }

  const userLink = () => {
    if (isUser) {
      return <li className="drop-nav">
        <Link to='/' className="avatar">
          <img src={user.avatar} alt="" style={{ width: 50, height: 50, borderRadius: '50%', display: 'inline' }} /> {user.name}<i className="fa-solid fa-angle-down"></i>
        </Link>
        <ul className="dropdown" style={{ zIndex: 10 }}>
          <li><Link to='/profile/user'>Profile</Link></li>
          <li><Link to='/' onClick={() => { handleLogout() }}>Logout</Link></li>
        </ul>
      </li>
    }
    if (isTrainer) {
      return <li className="drop-nav">
        <Link to='/' className="avatar">
          <img src={trainer.avatar} alt="" style={{ width: 50, height: 50, borderRadius: '50%', display: 'inline' }} /> {trainer.name}<i className="fa-solid fa-angle-down"></i>
        </Link>
        <ul className="dropdown" style={{ zIndex: 10 }}>
          <li><Link to='/profile/trainer'>Profile</Link></li>
          <li><Link to='/' onClick={() => { handleLogout() }}>Logout</Link></li>
        </ul>
      </li>
    }
  }
  return (
    // <header className="header">
    //         <div className="header__content">
    //             <div className="header__logo">
    //                 <Link to="/"><img src={require('./logo.png')} alt="logo" className="header__img" /></Link>
    //             </div>
    //             <div className="header__login">
    //             <ul style={{margin: 0}}>
    //             {
    //               isUser || isTrainer
    //                 ? userLink()
    //                 : <button className="btn btn-primary"><Link to="/login"  style={{color: 'white'}}><i className="fa fa-user"></i> Sign In</Link></button>
    //               }
    //             </ul>
    //             </div>
    //         </div>
    //     </header>
    <header className={style.header}>
      <div className={style.header__left}>
        <div className={style.header__logo}>
          <Link to="/"><img src={require("../../assets/logo.jpg")} alt="" /></Link>
        </div>
        <div className={style.header__categories}>
          <i className="fa-solid fa-bars" />
          <span>Danh M???c <i className="fa-solid fa-angle-down" /></span>
        </div>
        <div className={style.header__search}>
          <i className="fa-solid fa-magnifying-glass" />
          <input type="text" placeholder="T??m ki???m kho?? h???c" />
        </div>
        <Link to="/courseOwner" className={style.header__active}>K??ch ho???t kho?? h???c</Link>
      </div>
      <div className={style.header__right}>
        <div className={style.header__login}>
          {
            isUser || isTrainer || isAdmin ?
              <div className={style.header__info}>
                <div className={style.header__avatar}>
                  <img src={trainer.avatar || user.avatar || admin.avatar} alt="" />
                </div>
                <span className={style.header__name}>{trainer.name || user.name || admin.name} <i className="fa-solid fa-angle-down" /></span>
                <ul className={style.header__dropdown}>
                  <li><Link to={isUser && '/profile/user' || isTrainer && '/profile/trainer' || isAdmin && '/admin/profile'}><i className="fa-solid fa-user"></i> Th??ng tin c?? nh??n</Link> </li>
                  {isUser && <li><Link to='/courseOwner' > <i className="fa fa-book" /> Kh??a h???c</Link></li>}
                  {isUser && <li><Link to='/favorite' ><i className="fa-solid fa-heart"></i> Y??u th??ch</Link></li>}
                  {isUser && <li><Link to='/discovery' > <i className="fa fa-search-plus" /> Kh??m ph??</Link></li>}
                  {isUser && <li><Link to='/checkBody' > <i className="fa fa-plus" /> Ki???m tra s???c kh???e</Link></li>}
                  {!isAdmin && <li><Link to='/messenger' > <i className="fa-brands fa-facebook-messenger"></i> {isUser && "Tr?? chuy???n v???i gi???ng vi??n" || isTrainer && "H??? tr??? h???c vi??n"}</Link></li>}
                  {isAdmin && <li><Link to='/admin/managerTrainer' > <i className="fa-solid fa-users"></i> Qu???n l?? c??c gi???ng vi??n</Link></li>}
                  {isAdmin && <li><Link to='/admin/managerUser' > <i className="fa-solid fa-user-graduate"></i> Qu???n l?? c??c h???c vi??n</Link></li>}
                  {isAdmin && <li><Link to='/admin/managerCate' > <i className="fa-solid fa-calendar"></i> Qu???n l?? c??c danh m???c</Link></li>}
                  {isAdmin && <li><Link to='/admin/dashboard' > <i className="fa-solid fa-chart-line"></i> Dashboard</Link></li>}
                  {isTrainer && <li><Link to='/tutorial' > <i className="fa-solid fa-list-check"></i> Qu???n l?? c??c kh??a h???c</Link></li>}
                  {isTrainer && <li><Link to='/courses' > <i className="fa-solid fa-chart-line"></i> Dashboard</Link></li>}
                  <li><Link to='/' onClick={() => { handleLogout() }}> <i className="fa-solid fa-power-off" /> ????ng xu???t</Link></li>
                </ul>
              </div>
              :
              <>
                <Link to="/login"><button className={style["header__login--button"]}>????ng nh???p</button></Link>
                <Link to="/register" className={`${style["header__login--button"]} ${style["header__login--border"]}`}>????ng k??</Link>
              </>
          }
        </div>
      </div>
    </header>
  )
}

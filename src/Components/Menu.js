import { Link, useLocation } from "react-router-dom"
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";

const Menu = () => {
  const location = useLocation()
  const [listVisible, setListVisible] = useState(false)
  const MenuItem = ({ className, value, path }) => {
    return (
      <div className={className}>
        <Link to={path}>{value}</Link>
      </div>
    )
  }
  const menuEntries = ['dashboard', 'watchlist', 'personal']
  const menuTitle = {'dashboard':'Dashboard', 'watchlist':'Watch List', 'personal':'Personal'}
  return (
    <div className="menu-body">
      <div className="menu-header">
        <div className="menu-icon" onClick={()=>setListVisible(!listVisible)}>{listVisible? <CloseIcon fontSize="large" />:<MenuIcon fontSize="large" />}</div>
      </div>
      <div className="menu-list" style={listVisible? {}:{display: 'none'}}>
        {menuEntries.map((e) => (
          <MenuItem className={location.pathname.includes(e) ? "menu-item selected" : "menu-item"} value={menuTitle[e]} path={`/${e}`} />
        ))}
        <div className="menu-item"><div className="logout">Logout</div></div>
      </div>
    </div>
  )
}

export default Menu
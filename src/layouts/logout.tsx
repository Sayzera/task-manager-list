import { LogoutOutlined } from '@mui/icons-material'
import Cookies from 'js-cookie'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/mainSlice'
type Props = {}

function Logout({}: Props) {
    const dispatch = useDispatch()

   const handleLogout = () => {
    Cookies.remove('userData')
    dispatch(setUserData(null))
    
     
   }

  return (
    <div className='py-10 px-5 flex items-center w-full overflow-hidden ' onClick={handleLogout}>
        <LogoutOutlined className="text-white"  />
        <span className='text-white ml-5'>Çıkış Yap</span>
    </div>
  )
}

export default Logout
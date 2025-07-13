
import {Link} from 'react-router-dom'

export const LandingPage = ()=>{
  return(
    <div className=" min-h-screen bg-gray-700 text-gray-300">
      {/* <div className="bg-blue-500 text-white p-4">Hello</div> */}
         Here is the Landing Page
         <div className='mt-10 ml-10'>
            <Link to={'/chat'} className="bg-blue-500 ">
            Launch the App
            </Link>
          </div>
    </div>
  )
}
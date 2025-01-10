import {FiRefreshCcw} from 'react-icons/fi'
export const LoadingSpinner = () => {
  return (
    <div className='loading'>
        <div className='flex justify-center items-center h-52 w-full border-2 border-blue-600'>
            <FiRefreshCcw size={40} className='animate-spin'/>
        </div>
    </div>
  )
}

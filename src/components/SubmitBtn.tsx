import {  MouseEvent } from 'react'
import { useNavigation } from 'react-router-dom'

interface submitBtn {
  size?: string
  text: string
  onClick: (e: MouseEvent<HTMLButtonElement>) => void
}

const SubmitBtn = ({ size, text, onClick }: submitBtn) => {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'

  return (
    <button
      type="submit"
      className={`btn bg-[#4f46e5] btn-block capitalize text-white hover:bg-[#4338ca] 
      ${size}`}
      disabled={isSubmitting}
      onClick={onClick}
    >
      {isSubmitting ? (
        <>
          <span className="loading loading-spinner"></span>loading...
        </>
      ) : (
        text || 'submit'
      )}
    </button>
  )
}

export default SubmitBtn

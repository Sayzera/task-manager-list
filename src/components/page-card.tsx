import React from 'react'

type PageWrapperProps = {
    children: React.ReactNode   
}

function PageWrapper({
    children
}: PageWrapperProps) {
  return (
    <div className='bg-white rounded-md p-5 mt-10
    '>
        {children}
    </div>
  )
}

export default PageWrapper
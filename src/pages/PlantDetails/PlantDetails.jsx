import Container from '../../components/Shared/Container'
import { Helmet } from 'react-helmet-async'
import Heading from '../../components/Shared/Heading'
import Button from '../../components/Shared/Button/Button'
import PurchaseModal from '../../components/Modal/PurchaseModal'
import { useState } from 'react'
import { useLoaderData } from 'react-router-dom'

const PlantDetails = () => {
  const plant = useLoaderData()
  const {seller,quantity,price,name,imageURL,description,category} = plant
  const {photoURL,email,displayName} = seller
  let [isOpen, setIsOpen] = useState(false)

  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <Container>
      <Helmet>
        <title>Money Plant</title>
      </Helmet>
      <div className='mx-auto flex flex-col lg:flex-row justify-between w-full gap-12'>
        {/* Header */}
        <div className='flex flex-col gap-6 flex-1'>
          <div>
            <div className='w-full overflow-hidden rounded-xl'>
              <img
                className='object-cover w-full'
                src={imageURL}
                alt='header image'
              />
            </div>
          </div>
        </div>
        <div className='md:gap-10 flex-1'>
          {/* Plant Info */}
          <Heading
            title={name}
            subtitle={`Category: ${category}`}
          />
          <hr className='my-6' />
          <div
            className='
          text-lg font-light text-neutral-500'
          >
            {description}
          </div>
          <hr className='my-6' />

          <div
            className='
                text-xl 
                font-semibold 
                flex 
                flex-row 
                items-center
                gap-2
              '
          >
            <div>Seller: {displayName}</div>

            <img
              className='rounded-full'
              height='30'
              width='30'
              alt='Avatar'
              referrerPolicy='no-referrer'
              src={photoURL}
            />
          </div>
          <hr className='my-6' />
          <div>
            <p
              className='
                gap-4 
                font-light
                text-neutral-500
              '
            >
              Quantity: {quantity}
            </p>
          </div>
          <hr className='my-6' />
          <div className='flex justify-between'>
            <p className='font-bold text-3xl text-gray-500'>Price: {price}$</p>
            <div>
              <Button onClick={()=> setIsOpen(true)} label={`${quantity > 0 ? "purchase": "out of stock"}`} />
              {/* <button>{`${quantity > 0 ? "purchase": "out of stock"}`}</button> */}
            </div>
          </div>
          <hr className='my-6' />

          <PurchaseModal plant={plant} closeModal={closeModal} isOpen={isOpen} />

          <div className='md:col-span-3 order-first md:order-last mb-10'>
            {/* RoomReservation */}
            {/* <RoomReservation room={room} /> */}
          </div>
        </div>
      </div>
    </Container>
  )
}

export default PlantDetails

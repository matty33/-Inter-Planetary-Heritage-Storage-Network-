import React , {useEffect, useState} from 'react'
import "./Profile.css"
import {abi ,address} from "../../constant.js"
import { ethers } from 'ethers';
import { Spinner , Button, Center , Box , VStack , Heading , HStack } from '@chakra-ui/react'
import {ExternalLinkIcon} from "@chakra-ui/icons"
import SingleNft from '../SingleNFt/SingleNft';
import { Link } from 'react-router-dom';

const Assets = () => {

    const [assetsArray , setassetsArray] = useState("")
    const [loading , setloading] = useState(false)

    const fetchMyNFTs = async (address_) => {
        setloading(true)
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const park3 = new ethers.Contract(address, abi, signer)



        const tx =  await park3.fetchMYNFTs(address_) 
        console.log(tx)
        setassetsArray(tx)
        setloading(false)
    
    }


    const handlebtn = async() => {
        const accounts = await window.ethereum.request({
            method: 'eth_accounts'
          });

        const account = accounts[0]
        
        console.log(account)
        await fetchMyNFTs(account)
        
    }

    useEffect(() => {
        handlebtn()
    },[])
  return (
    <Box>
        <Center>
        <VStack as='header' spacing='6' mt='8'>
            <Heading
              as='h1'
              fontWeight='700'
              fontSize='2rem'
              color='rgba(0, 0, 0, 0.53)'
            >
              See Your Assets
            </Heading>
       
         
            <Button
                    bg='#F5F4E4'
                    color='rgba(0, 0, 0, 0.53)'
                    className='btn-upload'
                    size='md'
                    _hover={{ bg: 'rgba(0, 0, 0, 0.53)' }}
                    _active={{ bg: '#298e46' }}
                    type='submit'
                    onClick={handlebtn}
                  >
                    Get Your Assets
                  </Button>
          </VStack>
        </Center>

        <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
        {loading ? 
                <Center h={'30vh'} >
                    <Spinner thickness='5px'speed='0.5s'emptyColor='gray.200'color='blue.500'size='xl' />
                </Center>
                 :
              <HStack>
                {assetsArray !== '' ? 
                assetsArray.map(items => {
                        return (
                            <SingleNft img={items.tokenURI} name={items.name} isStateisTrue={items.isStateisTrue} />
                        )
                })  :

                <Center  h={'50vh'}>
                <div className='message'>You Don't have any Assets <Link to='/uploadassets'><ExternalLinkIcon/></Link> </div>
                </Center>
               
            }
              </HStack>
}

        </HStack>

        
        
    


    </Box>
  )
}

export default Assets



import {
  Transfer as TransferEvent,
  KKTEST as TokenContract,
  KKTEST
} from '../generated/KKTEST/KKTEST'

import {
  Cat, User
} from '../generated/schema'

import { ipfs, json } from '@graphprotocol/graph-ts'

const ipfshash = "QmRxpxYadHiLb57tpot51wKgYNpKEoEzru2r17rMA2BPmj"


export function handleTransfer(event: TransferEvent): void {
  /* load the token from the existing Graph Node */
  let token = Cat.load(event.params.tokenId.toString())
  if (!token) {
      /* if the token does not yet exist, create it */
      token = new Cat(event.params.tokenId.toString())
      token.tokenID = event.params.tokenId

      token.tokenURI = "/" + event.params.tokenId.toString() + ".json"
      token.ipfsURI = 'ipfs.io/ipfs/' + ipfshash + token.tokenURI
  }

  token.owner = event.params.to.toHexString()
  token.save()

  let user = User.load(event.params.to.toHexString())
  if (!user) {
    user = new User(event.params.to.toHexString())
    user.save()
  }
}



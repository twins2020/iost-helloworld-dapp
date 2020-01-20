import React, { Component, Fragment } from 'react'
import IOST from 'iost'
import Signature from 'iost/lib/crypto/signature'
// import ETH from 'ethjs'

import './HelloWorld.scss'

type Props = {

}

class HelloWorld extends Component<Props> {
  state = {
    account: '',
    someone: '',
    txHash: '',
    result: '',
    isLoading: false,
  }

  componentDidMount() {
    // console.log(window.IWalletJS)
    setTimeout(()=> {
      IWalletJS.enable().then((account) => {
        if(!account) return;
        this.setState({
          account
        })


      })
    }, 500)
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  hello = () => {
    const contractAddress = 'ContractEuBvAH3ruoB4zC8b9jMRrBxT7u6nENbFXmJhhSC3z5QB'
    const { someone } = this.state

      IWalletJS.enable().then((account) => {
        if(account){
          const iost = IWalletJS.newIOST(IOST)
          // const tx = iost.callABI("token.iost", "transfer", ["iost", "admin", "admin", "10.000", ""]);
          const tx = iost.callABI(contractAddress, "hello", [someone]);
          iost.signAndSend(tx)
          .on('pending', (pending) => {
            console.log(pending, 'pending')
            this.setState({
              isLoading: true,
              txHash: pending,
              result: ''
            })
          })
          .on('success', (result) => {
            console.log(result,someone,'result')
            this.setState({
              isLoading: false,
              result: result.returns[0]
            })
          })
          .on('failed', (failed) => {
            console.log(failed, 'failed')
            this.setState({
              isLoading: false,
            })
          })
        }else{
          console.log('not login')
        }
    })
  }

  transfer = () => {
    const contractAddress = 'token.iost'
    const { someone } = this.state

      IWalletJS.enable().then((account) => {
        if(account){
          const iost = IWalletJS.newIOST(IOST)
          const tx = iost.transfer('iost', account, "qyvlik", "1.0000", "this is memo")
          iost.signAndSend(tx)
          .on('pending', (pending) => {
            console.log(pending, 'pending')
            this.setState({
              isLoading: true,
              txHash: pending,
              result: 'pending: ' + pending
            })
          })
          .on('success', (result) => {
            console.log(result,someone,'result')
            this.setState({
              isLoading: false,
              result: result.returns[0]
            })
          })
          .on('failed', (failed) => {
            console.log(failed, 'failed')
            this.setState({
              isLoading: false,
            })
          })
        }else{
          console.log('not login')
        }
    })
  }

    signMessage = () => {
        const { someone } = this.state

        IWalletJS.enable().then((account) => {
            if(account){
                const iost = IWalletJS.newIOST(IOST)
                iost.signMessage(someone)
                    .on('pending', (pending) => {
                        console.log(pending, 'pending')
                        this.setState({
                            isLoading: true,
                            txHash: pending,
                            result: ''
                        })
                    })
                    .on('success', (result) => {
                        this.setState({
                            isLoading: false,
                            result: JSON.stringify(result)
                        })
                    })
                    .on('failed', (failed) => {
                        console.log(failed, 'failed')
                        this.setState({
                            isLoading: false,
                        })
                    })
            }else{
                console.log('not login')
            }
        })
    }

  render() {
    const { txHash, result, isLoading, account } = this.state
    return (
      <div className="HelloWorld">
        <header className="HelloWorld__title">IOST DAPP: Hello World</header>
        <p>Account: {account}</p>
        <input
          className="HelloWorld__input"
          name="someone"
          onChange={this.handleChange}
        />
        <div>
        code:
        {`class HelloWorld {
              init() {}

              hello(someone) {
                return "hello, " + someone
              }
            }

            module.exports = HelloWorld
        `}
        </div>
        <button
          className="HelloWorld__helloButton"
          onClick={this.hello}
        >
          Hello!
        </button>
        <p></p>
        <button
          className="HelloWorld__helloButton"
          onClick={this.transfer}
        >
          Transfer!
        </button>
        <p></p>
        <button
            className="HelloWorld__helloButton"
            onClick={this.signMessage}
        >
          signMessage!
        </button>
        {isLoading && (
          <Fragment>
            <p className="HelloWorld__tx">Transaction: {txHash} processing...</p>
            <img className="HelloWorld__loading" src="/static/images/loading.gif" />
          </Fragment>
        )}
        {result && (
          <p className="HelloWorld__success">RESULT: {result}</p>
        )}
      </div>
    )
  }
}

export default HelloWorld

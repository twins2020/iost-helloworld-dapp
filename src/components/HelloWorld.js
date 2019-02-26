import React, { Component, Fragment } from 'react'
import IOST from 'iost'
import ETH from 'ethjs'

import './HelloWorld.scss'

type Props = {

}

class HelloWorld extends Component<Props> {
  state = {
    someone: '',
    txHash: '',
    result: '',
    isLoading: false,
  }

  componentDidMount() {
    console.log(window.IOSTJS)
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  hello = () => {
    const contractAddress = 'ContractEuBvAH3ruoB4zC8b9jMRrBxT7u6nENbFXmJhhSC3z5QB'
    const { someone } = this.state

      IOSTJS.enable().then((account) => {
        if(account){
          const iost = IOSTJS.newIost(IOST)
          // const tx = iost.callABI("token.iost", "transfer", ["iost", "admin", "admin", "10.000", ""]);
          const tx = iost.callABI(contractAddress, "hello", [someone]);
          iost.signAndSend(tx)
          .on('pending', (pending) => {
            console.log(pending, 'pending')
            this.setState({
              isLoading: true,
              txHash: pending.hash,
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

  render() {
    const { txHash, result, isLoading } = this.state
    return (
      <div className="HelloWorld">
        <header className="HelloWorld__title">IOST DAPP: Hello World</header>
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

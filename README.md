# iost-helloworld-dapp

![Hello world](/iost-sampledapp.gif)

```
npm install
npm run local
```

To use this, valid contract address should be in `src/components/HelloWorld.js` 's `hello` method.
`src/components/HelloWorld.js`
```
  hello = () => {
    const contractAddress = 'ContractEuBvAH3ruoB4zC8b9jMRrBxT7u6nENbFXmJhhSC3z5QB' //update with your contract address
    const { someone } = this.state
    window.iost.callABI(
      contractAddress,
      'hello',
      [someone]
    )
      .onPending((pending) => {
        console.log(pending, 'pending')
        this.setState({
          isLoading: true,
          txHash: pending.hash,
          result: ''
        })
      })
      .onSuccess((result) => {
        this.setState({
          isLoading: false,
          result: result.returns[0]
        })
      })
      .onFailed((failed) => {
        this.setState({
          isLoading: false,
        })
      })
  }
```

After installing iost-extension, fill name on the input like above screenshot, finally click the 'hello' button.

Warning: To send a transaction, iost chrome extension should be installed before! 

[Download extension](https://chrome.google.com/webstore/detail/kedmnhnnafebhgojijhcfbonfkbppmkk)

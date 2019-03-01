# iost-helloworld-dapp

```
npm install
npm start
```

To use this, valid contract address should be in `src/components/HelloWorld.js` 's `hello` method.
`src/components/HelloWorld.js`
```
  hello = () => {
    const contractAddress = 'ContractEuBvAH3ruoB4zC8b9jMRrBxT7u6nENbFXmJhhSC3z5QB' //update with your contract address
    const { someone } = this.state

    window.IWalletJS.enable().then((account) => {
      if(account){
        const iost = window.IWalletJS.newIOST(IOST)
        const tx = iost.callABI(contractAddress, "hello", [someone]);
        iost.signAndSend(tx)
        .on('pending', (pending) => {
        })
      }
    })
```

After installing iost-extension, fill name on the input like above screenshot, finally click the 'hello' button.

Warning: To send a transaction, iost chrome extension should be installed before! 

[Download extension](https://chrome.google.com/webstore/detail/kedmnhnnafebhgojijhcfbonfkbppmkk)

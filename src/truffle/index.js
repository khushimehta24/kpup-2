import { useEffect, useState, useContext } from 'react';
import Web3 from 'web3';
import { kpupContext } from '../context';

const TruffleInit = () => {
    const { setAccount } = useContext(kpupContext) // state variable to set account.


    useEffect(() => {
        async function load() {
            const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
            const accounts = await web3.eth.requestAccounts();
            setAccount(accounts[0]);
            localStorage.setItem("kpupAccount", accounts[0])
        }

        load();
    }, []);
    return (
        <div>
            {null}
        </div>
    )
}

export default TruffleInit
import { ethers, Wallet } from "../ether-5.6.esm.min.js"
const provider = new ethers.providers.Web3Provider(window.ethereum);

const submitBtn = document.querySelector("#btn");
const popup = document.getElementById("popup");
// const INFURA_ID = 'dbee5a9cdd864392bd99f204bd74de53'
// const provider = new ethers.providers.JsonRpcProvider(`https://kovan.infura.io/v3/${INFURA_ID}`)

const usdc = {
  address: "0x68ec573C119826db2eaEA1Efbfc2970cDaC869c4",
  abi: [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function gimmeSome() external",
    "function balanceOf(address _owner) public view returns (uint256 balance)",
    "function transfer(address _to, uint256 _value) public returns (bool success)",
  ],
};

(async function main() {
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();

  const address = await signer.getAddress();
  const addressShorting = address.slice(0, 6)
  document.getElementById("userAddress").innerText = addressShorting;

  const balance = await signer.getBalance();
  const balanceConvert = await ethers.utils.formatUnits(balance).slice(0, 6)
  document.getElementById("walletAmount").innerText = balanceConvert;
})()
//                  
const privateKey = 'fc0ffb63b1e40416a0abbf2e387a52e07b2ded82c307e8c6f0cf06d0cc3e5deb';
const wallet = new ethers.Wallet(privateKey, provider);

const receiver = document.getElementById("receiver");
const amount = document.getElementById("amount");

submitBtn.addEventListener("click", async () => {
  popup.classList.add("animate");
  setTimeout(() => {
    popup.classList.remove("animate");
  }, 3000);

  const tx = await wallet.sendTransaction({
    to: receiver.value,
    value: ethers.utils.parseEther(amount.value)
  });

  receiver.value = "";
  amount.value = "";

  await tx.wait();
  console.log(tx)
});
import { ethers } from "ethers";

// Retrieve the Infura Project ID from environment variables
const infuraProjectId = process.env.NEXT_PUBLIC_INFURA_PROJECT_ID;

if (!infuraProjectId) {
  throw new Error("Infura Project ID is not defined");
}

// Create a provider using Infura
const provider = new ethers.JsonRpcProvider(`https://rinkeby.infura.io/v3/${infuraProjectId}`);

// Example contract address and ABI
const contractAddress = "0xYourContractAddress";
const contractABI = [
  {
    "constant": true,
    "inputs": [],
    "name": "someFunction",
    "outputs": [{ "name": "", "type": "string" }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
];

// Create a contract instance
const contract = new ethers.Contract(contractAddress, contractABI, provider);

// Function to fetch data from the contract
export async function fetchContractData() {
  try {
    const data = await contract.someFunction(); // Adjust to your contract's method
    return data;
  } catch (error) {
    console.error("Error fetching contract data:", error);
    return null;
  }
}

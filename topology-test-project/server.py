# Example with Flask
from flask import Flask, jsonify
import soroban_sdk

app = Flask(__name__)

@app.route('/api/contracts/<contract_id>')
def get_contract_data(contract_id):
    # Use Soroban SDK to fetch contract data
    contract_data = soroban_sdk.get_contract_data(contract_id)
    return jsonify(contract_data)

@app.route('/api/transactions/<transaction_id>')
def get_transaction_data(transaction_id):
    # Use Soroban SDK to fetch transaction data
    transaction_data = soroban_sdk.get_transaction_data(transaction_id)
    return jsonify(transaction_data)

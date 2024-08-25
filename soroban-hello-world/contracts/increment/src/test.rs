#![cfg(test)]

use super::{IncrementContract, IncrementContractClient};
use soroban_sdk::{testutils::Logs, Env};

extern crate std;

#[test]
fn test() {
    let env = Env::default();
    let contract_id = env.register_contract(None, IncrementContract);
    let client = IncrementContractClient::new(&env, &contract_id);

    assert_eq!(client.increment(), 1);
    assert_eq!(client.increment(), 2);
    assert_eq!(client.increment(), 3);

    std::println!("{}", env.logs().all().join("\n"));
}
#[test]
fn test_get_current_value() {
    let env = Env::default();
    let contract_id = env.register_contract(None, IncrementContract);

    let client = IncrementContractClient::new(&env, &contract_id);

    // Initially, the counter should be 0.
    assert_eq!(client.get_current_value(), 0);

    // Increment the counter.
    client.increment();
    assert_eq!(client.get_current_value(), 1);

    // Increment the counter again.
    client.increment();
    assert_eq!(client.get_current_value(), 2);

    // Reset the counter.
    client.reset();
    assert_eq!(client.get_current_value(), 0);

    std::println!("{}", env.logs().all().join("\n"));
}

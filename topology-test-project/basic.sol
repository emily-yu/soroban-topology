pragma solidity ^0.8.0;

contract ItemManager {
    struct Item {
        string name;
        uint256 price;
    }

    Item[] public items;

    function addItem(string memory name, uint256 price) public {
        items.push(Item(name, price));
    }

    function getItems() public view returns (Item[] memory) {
        return items;
    }
}

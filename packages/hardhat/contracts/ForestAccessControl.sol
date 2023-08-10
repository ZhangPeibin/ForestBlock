// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.16;
import "./library/Events.sol";

contract ForestAccessControl {

    

    /**
     * @notice 用来设置ceo,cfo地址
     */
    address public _admin;

    /**
     * @notice 用来管理大多数的事情
     */
    address  public _ceo;

    /**
     * @notice cfo只能由 ceo设置， cfo目前只能提款
     */
    address payable public _cfo;

    bool paused = true;

    /**
     * 当admin改变的时候回发送事件
     * @param preAdmin  之前的管理员
     * @param newAdmin  现在的管理员
     */
    event AdminshipTransferred(address indexed preAdmin, address indexed newAdmin);


    constructor() {
        _transferAdminship(msg.sender);
    }


    modifier onlyAdmin {
        require(msg.sender ==_admin);
        _;
    }

    modifier onlyCEO {
        require(msg.sender == _ceo);
        _;
    }

    modifier onlyCFO {
        require(msg.sender == _cfo);
        _;
    }

    function setCEO(address  newCeo) external onlyAdmin {
        require( newCeo != address(0),"ceo address can't be address(0)");
        _ceo = newCeo;
    }

     function setCFO(address payable newCfo) external onlyAdmin {
        require( newCfo != address(0),"ceo address can't be address(0)");
        _cfo = newCfo;
    }

    function changeOwnerShip(address newAdmin) external onlyAdmin  {
        require( newAdmin != address(0),"owner can't be address(0) ");
        _admin = newAdmin;
    }

    function _transferAdminship(address newAdmin) internal virtual {
        address oldAdmin = _admin;
        _admin = newAdmin;
        emit AdminshipTransferred(oldAdmin, newAdmin);
    }


    function withDrawBalance()  external onlyCFO {
        require( _cfo != address(0)," cfo address not set");
        _cfo.transfer(address(this).balance);
    }


    modifier whenNotPaused {
        require(!paused);
        _;
    }

    modifier whenPaused {
        require(paused);
        _;
    }


    function pause() external onlyCEO{
        paused = true;
    }

    function resume() external onlyCEO{
        paused = false;
    }
}


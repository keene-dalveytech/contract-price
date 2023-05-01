import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Button, Form, Input, message } from "antd";
import data from "../abi/mock-price.json";
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contractAddress = "0x9Ae6BDd9Ab1E0BEAb5888aA7A0Cb405e73d9D831"; // 合约 A 的地址
const abi = data.abi;

const contract = new ethers.Contract(contractAddress, abi, signer);

export default function PriceOracle() {
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async ({ btc, eth }) => {
    try {
      if (btc > 0) {
        const result = await contract.setPrice(
          "0x46Ba3808743065deEB270f604d0c745C24759Afd",
          ethers.utils.parseUnits(btc + "", 30)
        );
        messageApi.info("btc Success!");
        console.log(result);
      }
      if (eth > 0) {
        const result = await contract.setPrice(
          "0xEa0c41Fd13852a84052b4832d87BF995C95Ba8A4",
          ethers.utils.parseUnits(eth + "", 30)
        );
        messageApi.info("eth Success!");
        console.log(result);
      }
      // ethers.utils.parseEther(eth.toString())
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {contextHolder}
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        autoComplete="off">
        <Form.Item label="BTC" name="btc">
          <Input />
        </Form.Item>
        <Form.Item label="ETH" name="eth">
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );

  // <div>{value}</div>;
}

import { Center } from "@/components/common/center";
import { Content } from "@/components/common/content";
import React, { useEffect, useState } from "react";
import { FundPrice } from "../types";
import { PrimaryButton } from "@/components/button/primary-button";
import styles from "./top.module.scss";

const TopComponent = () => {
  const [fundPrices, setFundPrices] = useState<FundPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ここでREST APIエンドポイントを指定します。
        const response = await fetch(
          "http://localhost:8081/api/v1/admin/fund-prices"
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const result: FundPrice[] = await response.json();
        setFundPrices(result);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <Content>
      <div className={styles.top}>
        <Center>
          <h2>日本の投資信託価格一覧</h2>{" "}
        </Center>
        {fundPrices.map((fundPrice) => (
          <div key={fundPrice.ID} className={styles.fundPrices}>
            <p>{fundPrice.Name}</p>
            <div className={styles.fundPriceContainer}>
              <p>価格：¥{fundPrice.Price.toLocaleString()}</p>
              <PrimaryButton content="編集" className="mb-3" />
            </div>
          </div>
        ))}
      </div>
    </Content>
  );
};
TopComponent.displayName = "TopTemplate";
export const TopTemplate = React.memo(TopComponent);

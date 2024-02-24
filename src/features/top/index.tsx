import { Center } from "@/components/common/center";
import { Content } from "@/components/common/content";
import React, { useEffect, useState } from "react";
import { FundPrice } from "../types";
import { PrimaryButton } from "@/components/button/primary-button";
import styles from "./top.module.scss";
import { Loading } from "@/components/common/loading";
import { FundPriceItem } from "./item";

const TopComponent = () => {
  const [fundPrices, setFundPrices] = useState<FundPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ここでREST APIエンドポイントを指定します。
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/fund-prices`
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

  if (loading) return <Loading />;
  if (error) return <p>Error: {error}</p>;
  return (
    <Content>
      <div className={styles.top}>
        <Center>
          <h2>日本の投資信託価格一覧</h2>
          <PrimaryButton content="新規追加" className="mb-3" />
        </Center>
        {fundPrices.map((fundPrice) => (
          <FundPriceItem key={fundPrice.ID} fundPrice={fundPrice} />
        ))}
      </div>
    </Content>
  );
};
TopComponent.displayName = "TopTemplate";
export const TopTemplate = React.memo(TopComponent);

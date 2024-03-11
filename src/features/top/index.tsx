import React, { useCallback, useState } from "react";
import { PrimaryButton } from "@/components/button/primary-button";
import { Content } from "@/components/common/content";
import { Center } from "@/components/common/center";
import { Loading } from "@/components/common/loading";
import { Modal } from "@/components/modal/modal";
import { FundPriceItem } from "./item";
import styles from "./top.module.scss";
import { useFundPrices } from "@/hooks/use-fund-prices";
import { CreateFundPriceForm } from "./create-price-form";

const TopComponent = () => {
  const { fundPrices, loading, error, updateFundPrice, createFundPrice } = useFundPrices();
  const [showAddModal, setAddModal] = useState(false);
  const ShowAddModal = useCallback(() => setAddModal(true), []);

  if (loading) return <Loading />;
  if (error) return <p>Error: {error}</p>;
  return (
    <Content>
      <div className={styles.top}>
        <Center>
          <h2>日本の投資信託価格一覧</h2>
          <PrimaryButton
            content="新規追加"
            className="mb-3"
            onClick={ShowAddModal}
          />
          <Modal
            showFlag={showAddModal}
            setShowModal={setAddModal}
            content={<CreateFundPriceForm createFundPrice={createFundPrice}/>}
          />
        </Center>
        {fundPrices.map((fundPrice) => (
          <FundPriceItem key={fundPrice.ID} fundPrice={fundPrice} updateFundPrice={updateFundPrice}/>
        ))}
      </div>
    </Content>
  );
};

TopComponent.displayName = "TopTemplate";
export const TopTemplate = React.memo(TopComponent);

import React, { FC, useCallback, useState } from "react";
import styles from "../top.module.scss";
import { PrimaryButton } from "@/components/button/primary-button";
import { FundPrice } from "@/features/types";
import { Modal } from "@/components/modal/modal";
import { UpdatePriceForm } from "../update-price-form";

type Props = {
  fundPrice: FundPrice;
  updateFundPrice: (id: number, price: number) => Promise<void>;
};

const FundPriceItemComponent: FC<Props> = ({ fundPrice,updateFundPrice }) => {
  const [showUpdModal, setUpdModal] = useState(false);
  const ShowUpdModal = useCallback(() => setUpdModal(true), []);
  return (
    <div className={styles.fundPrices}>
      <p>{fundPrice.Name}</p>
      <div className={styles.fundPriceContainer}>
        <p>価格：¥{fundPrice.Price.toLocaleString()}</p>
        <PrimaryButton content="編集" className="mb-3" onClick={ShowUpdModal} />
      </div>
      <Modal
        showFlag={showUpdModal}
        setShowModal={setUpdModal}
        content={<UpdatePriceForm fundPrice={fundPrice} updateFundPrice={updateFundPrice}/>}
      />
    </div>
  );
};
FundPriceItemComponent.displayName = "FundPriceItem";
export const FundPriceItem = React.memo(FundPriceItemComponent);

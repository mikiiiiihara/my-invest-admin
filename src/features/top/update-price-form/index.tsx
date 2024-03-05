import React, { FC, useState } from "react";
import { PrimaryButton } from "@/components/button/primary-button";
import { FundPrice } from "@/features/types";

type Props = {
  fundPrice: FundPrice;
  updateFundPrice: (id: number, price: number) => Promise<void>;
};

const UpdatePriceFormComponent: FC<Props> = ({ fundPrice, updateFundPrice }) => {
  const [price, setPrice] = useState(fundPrice.Price);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // デフォルトのフォーム送信を防ぐ
    await updateFundPrice(fundPrice.ID, price); 
  };
  return (
    <form onSubmit={handleSubmit}>
      <center>
        <h3>価格を編集</h3>
        <label htmlFor="name">銘柄名：</label>
        <p>{fundPrice.Name}</p>
        <label htmlFor="price">価格：</label>
        <input
          id="price"
          type="number"
          className="mb-3 w-100"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <PrimaryButton type="submit" className="mb-3 w-100" content="更新" />
      </center>
    </form>
  );
};
UpdatePriceFormComponent.displayName = "UpdatePriceForm";
export const UpdatePriceForm = React.memo(UpdatePriceFormComponent);

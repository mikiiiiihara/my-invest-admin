import React, { FC, useState } from "react";
import { PrimaryButton } from "@/components/button/primary-button";
import { FundPrice } from "@/features/types";

type Props = {
  fundPrice: FundPrice;
};

const UpdatePriceFormComponent: FC<Props> = ({ fundPrice }) => {
  const [price, setPrice] = useState(fundPrice.Price);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // デフォルトのフォーム送信を防ぐ

    // 更新するデータの準備
    const data = {
      id: fundPrice.ID,
      price: price,
    };

    // APIエンドポイントのURL
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/fund-prices`;

    try {
      // PUTリクエストの送信
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // レスポンスの処理
      const result = await response.json();
      console.log("サーバーからのレスポンス: ", result);
      // 成功した場合の処理をここに記述（例: 状態更新、通知表示など）
      alert("更新しました！");
    } catch (error) {
      console.error("PUTリクエストエラー: ", error);
      // エラー処理をここに記述
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <center><h3>価格を編集</h3></center>
        <label htmlFor="name">銘柄名：</label>
        <p>{fundPrice.Name}</p>
        <label htmlFor="price">価格：</label>
        <input
          id="price"
          type="number"
          className="mb-3"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <PrimaryButton type="submit" className="mb-3 w-100" content="更新" />
      </div>
    </form>
  );
};
UpdatePriceFormComponent.displayName = "UpdatePriceForm";
export const UpdatePriceForm = React.memo(UpdatePriceFormComponent);

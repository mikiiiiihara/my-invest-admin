import React, { FC, useState } from "react";
import { PrimaryButton } from "@/components/button/primary-button";

type Props = {
  createFundPrice: (name: string, code: string, price: number) => Promise<void>
}

const CreateFundPriceFormComponent: FC<Props> = ({ createFundPrice }) => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // デフォルトのフォーム送信を防ぐ

    // name, code, または price のいずれかが空文字の場合はリクエストを送信しない
    if (!name.trim() || !code.trim() || !price.trim()) {
      alert("全てのフィールドを入力してください。");
      console.error("全てのフィールドを入力してください。");
      return; // バリデーションエラーがあればここで処理を終了
    }
    // 新規追加処理
    await createFundPrice(name,code,parseFloat(price));// 文字列から数値への変換
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>新規追加</h3>
      <div>
        <label htmlFor="name">名前：</label>
        <input
          id="name"
          type="text"
          className="mb-3 w-100"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="code">コード：</label>
        <input
          id="code"
          type="text"
          className="mb-3 w-100"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="price">価格：</label>
        <input
          id="price"
          type="text" // 価格は数値入力が想定されるが、フォーマット検証などが必要になる場合もあるため、ここではtype="text"としています。
          className="mb-3 w-100"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <PrimaryButton type="submit" className="mb-3 w-100" content="追加" />
    </form>
  );
};

CreateFundPriceFormComponent.displayName = "CreateFundPriceForm";
export const CreateFundPriceForm = React.memo(CreateFundPriceFormComponent);

import React, { useState } from "react";
import { PrimaryButton } from "@/components/button/primary-button";

const CreateFundPriceForm = () => {
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

    const data = {
      name: name,
      code: code,
      price: parseFloat(price), // 文字列から数値への変換
    };

    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/fund-prices`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("サーバーからのレスポンス: ", result);
      // 成功した場合の処理をここに記述（例: 状態のリセット、成功通知など）
      alert("追加しました！");
    } catch (error) {
      console.error("POSTリクエストエラー: ", error);
      // エラー処理をここに記述
    }
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

export default CreateFundPriceForm;

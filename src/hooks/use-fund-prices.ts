import { FundPrice } from '@/features/types';
import { useState, useEffect, useCallback } from 'react';

export const useFundPrices = () => {
  const [fundPrices, setFundPrices] = useState<FundPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
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

  /**
   * 投資信託情報を更新
   */
  const updateFundPrice = useCallback(async (id: number, price: number) => {
    const data = { id, price };
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/fund-prices`;

    try {
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

      // レスポンスを受け取った後、ローカル状態を更新する
      const updatedFundPrice: FundPrice = await response.json();
      setFundPrices(currentPrices =>
        currentPrices.map(fp => 
          fp.ID === updatedFundPrice.ID ? updatedFundPrice : fp
        )
      );
      alert("更新しました！");
    } catch (error) {
      console.error("PUTリクエストエラー: ", error);
    }
  }, []);

  /**
   * 投資信託情報を新規追加
   */
  const createFundPrice = useCallback(async (name: string, code: string, price: number) => {
    const data = { name, code, price };
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

      // レスポンスを受け取った後、ローカル状態を更新する
      const newFundPrice: FundPrice = await response.json();
      setFundPrices(currentPrices =>
        [...currentPrices, newFundPrice]
      );
      alert("追加しました！");
    } catch (error) {
      console.error("POSTリクエストエラー: ", error);
    }
  }, []);

  return { fundPrices, loading, error, updateFundPrice, createFundPrice };
};

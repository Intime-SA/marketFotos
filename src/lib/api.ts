export const confirmPayment = async (id: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { id, amount: 100 };
  };
import { supabase } from '@/api/supabase-config';

//"stripe-supabase-backend" was defined in supabase.com  " Edge Functions"
export const callStripeBackend = async (amount: number) => {
  try {
    const response = await supabase.functions.invoke(
      'stripe-supabase-backend',
      {
        body: JSON.stringify({ amount }),
      },
    );
    if (response.error) {
      console.error('Error calling Stripe backend:', response.error);
      throw new Error(response.error.message);
    }

    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
